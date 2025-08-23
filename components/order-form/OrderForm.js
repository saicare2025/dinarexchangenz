"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  IdentificationIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BanknotesIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

// Import sub-components
import Stepper from "./Stepper";
import OrderDetails from "./OrderDetails";
import IDVerification from "./IDVerification";
import PaymentInfo from "./PaymentInfo";
import OrderSummary from "./OrderSummary";
import SuccessModal from "./SuccessModal";

// Import utilities
import { validateAUMobile, getIqdAmountFromLabel } from "./utils";
import { uploadViaSignedUrl } from "@/lib/blobUpload";

const INITIAL_FORM_DATA = {
  personalInfo: {
    fullName: "",
    email: "",
    mobile: "",
    country: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
  },
  orderDetails: {
    currency: "",
    quantity: 1,
  },
  verification: {
    idFile: null,
    idFileUrl: "",
    idNumber: "",
    idExpiry: "", // yyyy-mm-dd
    acceptTerms: false,
  },
  payment: {
    method: "",
    receipt: null,
    receiptUrl: "",
    skipReceipt: false,
    comments: "",
  },
};

const STEPS = [
  { id: 1, title: "Order Details", icon: DocumentTextIcon },
  { id: 2, title: "ID Verification", icon: IdentificationIcon },
  { id: 3, title: "Payment", icon: CreditCardIcon },
];

export default function OrderForm({
  currencyOptions,
  bankDetails,
  shippingFee = 19.99,
  bonusConfig = null, // { minAmount, bonusAmount, bonusLabel, bonusReason }
  pageTitle = "Order Form",
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const selectedCurrency = useMemo(
    () =>
      currencyOptions.find(
        (opt) => opt.label === formData.orderDetails.currency
      )?.value || 0,
    [formData.orderDetails.currency, currencyOptions]
  );

  const totalAmount = selectedCurrency + shippingFee;

  // Check if qualifies for bonus
  const qualifiesForBonus = useMemo(() => {
    if (!bonusConfig) return false;
    const amount = getIqdAmountFromLabel(formData.orderDetails.currency);
    return amount >= bonusConfig.minAmount;
  }, [formData.orderDetails.currency, bonusConfig]);

  // Step 1 validation
  const isStep1Valid = useMemo(() => {
    const { personalInfo, orderDetails } = formData;
    return Boolean(
      personalInfo.fullName &&
        personalInfo.email &&
        personalInfo.mobile &&
        validateAUMobile(personalInfo.mobile) &&
        personalInfo.country &&
        personalInfo.address &&
        personalInfo.city &&
        personalInfo.state &&
        personalInfo.postcode &&
        orderDetails.currency
    );
  }, [formData]);

  // Step 2 validation
  const isStep2Valid = useMemo(() => {
    const { idFile, idNumber, idExpiry, acceptTerms } = formData.verification;
    return Boolean(idFile && idNumber && idExpiry && acceptTerms);
  }, [formData.verification]);

  // Handlers
  const handleInputChange = useCallback((section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }, []);

  const handleFileChange = useCallback(
    async (section, field, file) => {
      if (file) {
        // File is being added
        const reader = new FileReader();
        reader.onload = () => {
          handleInputChange(section, field, file);
          handleInputChange(section, `${field}Url`, reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // File is being removed (null passed)
        handleInputChange(section, field, null);
        handleInputChange(section, `${field}Url`, "");
      }
    },
    [handleInputChange]
  );

  const nextStep = useCallback(() => setCurrentStep((p) => p + 1), []);
  const prevStep = useCallback(() => setCurrentStep((p) => p - 1), []);

  async function handleBeforeCreateOrderUploads(formData, tempOrderId) {
    let uploadedIdUrl = null;
    let uploadedReceiptUrl = null;

    // Upload ID
    if (formData?.verification?.idFile) {
      try {
        uploadedIdUrl = await uploadViaSignedUrl(formData.verification.idFile, {
          preferredName: `photoId-${Date.now()}-${formData.verification.idFile.name}`,
        });
        console.log("ID upload successful:", uploadedIdUrl);
      } catch (uploadError) {
        console.error("ID upload error:", uploadError);
        throw new Error(`Failed to upload ID document: ${uploadError.message}`);
      }
    }

    // Upload receipt
    if (formData?.payment?.receipt) {
      try {
        uploadedReceiptUrl = await uploadViaSignedUrl(formData.payment.receipt, {
          preferredName: `receipt-${Date.now()}-${formData.payment.receipt.name}`,
        });
        console.log("Receipt upload successful:", uploadedReceiptUrl);
      } catch (uploadError) {
        console.error("Receipt upload error:", uploadError);
        throw new Error(`Failed to upload receipt: ${uploadError.message}`);
      }
    }

    return { uploadedIdUrl, uploadedReceiptUrl };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tempOrderId = `ORDER-${Date.now()}`;
      
      // Upload files using Vercel Blob
      const { uploadedIdUrl, uploadedReceiptUrl } = await handleBeforeCreateOrderUploads(formData, tempOrderId);

      // Prepare payload
      const orderData = {
        personalInfo: formData.personalInfo,
        orderDetails: {
          ...formData.orderDetails,
          qualifiesForBonus: qualifiesForBonus,
        },
        totalAmount,
        verification: {
          id_document_url: uploadedIdUrl,
          idNumber: formData.verification.idNumber,
          idExpiry: formData.verification.idExpiry,
        },
        payment: {
          receipt_url: uploadedReceiptUrl,
          skipReceipt: formData.payment.skipReceipt,
          comments: formData.payment.comments,
          method: formData.payment.method || "bank-transfer",
        },
        bonus: qualifiesForBonus && bonusConfig
          ? {
              type: bonusConfig.bonusType || "BONUS",
              amount: bonusConfig.bonusAmount,
              label: bonusConfig.bonusLabel,
              reason: bonusConfig.bonusReason,
            }
          : null,
      };

      console.log("Submitting order data:", orderData);

      // Create order in Supabase
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || result?.details || "Order submission failed");
      }

      console.log("Order created successfully:", result);

      // Send email notification
      try {
        const notificationData = {
          id: result.id || `ORDER-${Date.now()}`,
          personalInfo: formData.personalInfo,
          orderDetails: formData.orderDetails,
          payment: formData.payment,
          totalAmount: Number(totalAmount),
          createdAt: new Date().toISOString(),
          shippingCost: shippingFee
        };

        const notificationResponse = await fetch("/api/orders/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notificationData)
        });

        if (notificationResponse.ok) {
          console.log("Email notification sent successfully");
        } else {
          const errorData = await notificationResponse.json().catch(() => ({}));
          console.error("Email notification failed:", errorData.message || "Unknown error");
          // Don't show error to user since order was successful, just log it
        }
      } catch (emailError) {
        console.error("Email notification error:", emailError);
        // Don't show error to user since order was successful, just log it
      }

      setShowSuccess(true);
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
    } catch (error) {
      console.error("Submission error:", error);
      alert(`There was an error processing your order: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <Stepper currentStep={currentStep} steps={STEPS} />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {currentStep === 1 && (
            <OrderDetails
              formData={formData}
              onChange={handleInputChange}
              onFileChange={handleFileChange}
              isValid={isStep1Valid}
              onNext={nextStep}
              currencyOptions={currencyOptions}
              qualifiesForBonus={qualifiesForBonus}
              validateMobile={validateAUMobile}
              bonusConfig={bonusConfig}
            />
          )}

          {currentStep === 2 && (
            <IDVerification
              formData={formData}
              onChange={handleInputChange}
              onFileChange={handleFileChange}
              isValid={isStep2Valid}
              onBack={prevStep}
              onNext={nextStep}
            />
          )}

          {currentStep === 3 && (
            <PaymentInfo
              formData={formData}
              onChange={handleInputChange}
              onFileChange={handleFileChange}
              onBack={prevStep}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              bankDetails={bankDetails}
            />
          )}
        </div>

        <div className="lg:w-1/3">
          <OrderSummary
            currency={formData.orderDetails.currency}
            unitPrice={selectedCurrency}
            shippingFee={shippingFee}
            totalAmount={totalAmount}
            qualifiesForBonus={qualifiesForBonus}
            bonusConfig={bonusConfig}
          />
        </div>
      </div>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
