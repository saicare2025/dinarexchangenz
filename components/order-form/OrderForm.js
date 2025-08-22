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
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        handleInputChange(section, field, file);
        handleInputChange(section, `${field}Url`, reader.result);
      };
      reader.readAsDataURL(file);
    },
    [handleInputChange]
  );

  const nextStep = useCallback(() => setCurrentStep((p) => p + 1), []);
  const prevStep = useCallback(() => setCurrentStep((p) => p - 1), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let uploadedIdUrl = null;
      let uploadedReceiptUrl = null;

      // Upload ID
      if (formData.verification.idFile) {
        const idFile = formData.verification.idFile;
        const uploadResponse = await fetch(
          `/api/upload?filename=${encodeURIComponent(idFile.name)}`,
          { method: "POST", body: idFile }
        );
        const newBlob = await uploadResponse.json();
        uploadedIdUrl = newBlob.url;
      }

      // Upload receipt
      if (formData.payment.receipt) {
        const receiptFile = formData.payment.receipt;
        const uploadResponse = await fetch(
          `/api/upload?filename=${encodeURIComponent(receiptFile.name)}`,
          { method: "POST", body: receiptFile }
        );
        const newBlob = await uploadResponse.json();
        uploadedReceiptUrl = newBlob.url;
      }

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

      // Send to Base44 function
      const functionUrl =
        "https://app--dinar-exchange-a6eb3846.base44.app/api/apps/68a56ff1e426c5d0a6eb3846/functions/createOrder";

      const response = await fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorResult = await response.json().catch(() => ({}));
        throw new Error(errorResult.error || "Order submission failed");
      }

      const result = await response.json();
      console.log("Order created successfully:", result);

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
