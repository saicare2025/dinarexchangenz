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
import MainLayout from "../MainLayout";
import { useRouter } from "next/navigation";

/** ========================
 *  Constants & Utilities
 *  ===================== */
const CURRENCY_OPTIONS = [
  { label: "10 Billion Zimbabwe Dollars - $250 AUD", value: 250 },
  { label: "20 Billion Zimbabwe Dollars - $500 AUD", value: 500 },
  { label: "30 Billion Zimbabwe Dollars - $750 AUD", value: 750 },
  { label: "40 Billion Zimbabwe Dollars - $1000 AUD", value: 1000 },
  { label: "50 Billion Zimbabwe Dollars - $1250 AUD", value: 1250 },
  { label: "60 Billion Zimbabwe Dollars - $1500 AUD", value: 1500 },
  { label: "80 Billion Zimbabwe Dollars - $2000 AUD", value: 2000 },
  { label: "100 Billion Zimbabwe Dollars - $2500 AUD", value: 2500 },
  { label: "10 Trillion Zimbabwe Dollars - $2600 AUD", value: 2600 },
];

const BANK_DETAILS = {
  accountName: "Oz Trading Group Pty Ltd",
  bankName: "National Australia Bank Limited",
  bsb: "083004",
  accountNumber: "739384751",
  swiftCode: "NATAAU3303M",
  bankAddress: "Ground Level 330 Collins St, Melbourne, VIC 3000",
};

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

// Parse IQD numeric amount from label, e.g. "1,000,000 IQD - $2,800 AUD" -> 1000000
function getIqdAmountFromLabel(label) {
  if (!label) return 0;
  const match = label.match(/^([\d,]+)\s*IQD/i);
  return match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
}

// AU-only mobile validation: "04xxxxxxxx" or "+614xxxxxxxx"
function validateAUMobile(raw) {
  if (typeof raw !== "string") return false;

  // Remove spaces and dashes, keep digits and leading +
  let number = raw
    .trim()
    .replace(/[\s-]/g, "")
    .replace(/[^\d+]/g, "");

  // If no + and not starting with 0, assume local format (prepend 0)
  if (!number.startsWith("+") && !number.startsWith("0")) {
    number = "0" + number;
  }

  // AU: +61 or 0, followed by 4...
  const AU = /^(?:\+61|0)4\d{7,9}$/;

  // NZ: +64 or 0, followed by 2...
  const NZ = /^(?:\+64|0)2\d{6,9}$/;

  return AU.test(number) || NZ.test(number);
}

/** ========================
 *  Page Component
 *  ===================== */
export default function BuyDinar() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const shippingFee = 49.99;

  const selectedCurrency = useMemo(
    () =>
      CURRENCY_OPTIONS.find(
        (opt) => opt.label === formData.orderDetails.currency
      )?.value || 0,
    [formData.orderDetails.currency]
  );

  const totalAmount = selectedCurrency + shippingFee;

  // Qualify for free 20M ZWL if >= 1,000,000 IQD
  const qualifiesForZim = useMemo(() => {
    const amountIqd = getIqdAmountFromLabel(formData.orderDetails.currency);
    return amountIqd >= 1_000_000;
  }, [formData.orderDetails.currency]);

  // Step 1 validation (AU mobile only)
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
          qualifiesForZimBonus: qualifiesForZim,
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
        bonus: qualifiesForZim
          ? {
              type: "ZWL",
              amount: 20_000_000,
              label: "Free 20,000,000 Zimbabwe Dollars",
              reason: "Orders of 1,000,000 IQD or more",
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
    <MainLayout>
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
                currencyOptions={CURRENCY_OPTIONS}
                qualifiesForZim={qualifiesForZim}
                validateMobile={validateAUMobile}
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
                bankDetails={BANK_DETAILS}
              />
            )}
          </div>

          <div className="lg:w-1/3">
            <OrderSummary
              currency={formData.orderDetails.currency}
              unitPrice={selectedCurrency}
              shippingFee={shippingFee}
              totalAmount={totalAmount}
              qualifiesForZim={qualifiesForZim}
            />
          </div>
        </div>

        <SuccessModal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      </div>
    </MainLayout>
  );
}

/** ========================
 *  Subcomponents
 *  ===================== */
function Stepper({ currentStep, steps }) {
  return (
    <div className="flex justify-center gap-10 lg:gap-20 mb-4 relative">
      {steps.map((step) => {
        const isCompleted = step.id <= currentStep;
        return (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              isCompleted ? "text-[#008080]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                isCompleted
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-gray-100"
              }`}
            >
              <step.icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">{step.title}</span>
          </div>
        );
      })}
      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
        <div
          className="h-full bg-orange transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

function OrderDetails({
  formData,
  onChange,
  isValid,
  onNext,
  currencyOptions,
  qualifiesForZim,
  validateMobile,
}) {
  const mobileError =
    formData.personalInfo.mobile &&
    !validateMobile(formData.personalInfo.mobile)
      ? "Please enter a valid Australian mobile number (04xxxxxxxx or +614xxxxxxxx)"
      : "";

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        Step 1: Order Details
      </h2>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Currency Amount *
        </label>
        <select
          value={formData.orderDetails.currency}
          onChange={(e) => onChange("orderDetails", "currency", e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange focus:border-orange"
          required
        >
          <option value="">Select an amount</option>
          {currencyOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Full Name *"
            value={formData.personalInfo.fullName}
            onChange={(value) => onChange("personalInfo", "fullName", value)}
          />
          <InputField
            label="Email Address *"
            type="email"
            value={formData.personalInfo.email}
            onChange={(value) => onChange("personalInfo", "email", value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Mobile Number *"
            value={formData.personalInfo.mobile}
            onChange={(value) => onChange("personalInfo", "mobile", value)}
            error={mobileError}
          />
          <SelectField
            label="Country *"
            value={formData.personalInfo.country}
            options={["", "New Zealand", "Australia"]}
            onChange={(value) => onChange("personalInfo", "country", value)}
          />
        </div>

        <InputField
          label="Street Address *"
          value={formData.personalInfo.address}
          onChange={(value) => onChange("personalInfo", "address", value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="City *"
            value={formData.personalInfo.city}
            onChange={(value) => onChange("personalInfo", "city", value)}
          />
          <InputField
            label="State *"
            value={formData.personalInfo.state}
            onChange={(value) => onChange("personalInfo", "state", value)}
          />
          <InputField
            label="Postcode *"
            value={formData.personalInfo.postcode}
            onChange={(value) => onChange("personalInfo", "postcode", value)}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={onNext}
          disabled={!isValid}
          icon={<ArrowRightIcon className="w-4 h-4" />}
        >
          Continue to ID Verification
        </Button>
      </div>
    </div>
  );
}

function IDVerification({
  formData,
  onChange,
  onFileChange,
  isValid,
  onBack,
  onNext,
}) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Step 2: Photo ID Upload
      </h2>
      <p className="text-gray-600 mb-6">
        To complete your order, please upload a valid photo ID for verification
        purposes.
      </p>

      <div className="space-y-6">
        <FileUpload
          label="Upload ID Document *"
          description="Accepted: Driver's License, Passport + Utility Bill"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(file) => onFileChange("verification", "idFile", file)}
          file={formData.verification.idFile}
        />

        <InputField
          label="ID Number *"
          value={formData.verification.idNumber}
          onChange={(value) => onChange("verification", "idNumber", value)}
        />

        <InputField
          label="ID Expiry Date *"
          type="date"
          value={formData.verification.idExpiry}
          onChange={(value) => onChange("verification", "idExpiry", value)}
        />

        <Checkbox
          label="I accept the Terms and Conditions and Privacy Policy. I understand that ID verification is required for delivery."
          checked={formData.verification.acceptTerms}
          onChange={(checked) =>
            onChange("verification", "acceptTerms", checked)
          }
        />
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          onClick={onBack}
          variant="secondary"
          icon={<ArrowLeftIcon className="w-4 h-4" />}
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid}
          icon={<ArrowRightIcon className="w-4 h-4" />}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}

function PaymentInfo({
  formData,
  onChange,
  onFileChange,
  onBack,
  onSubmit,
  isSubmitting,
  bankDetails,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="bg-orange-100 text-orange rounded-full w-10 h-10 flex items-center justify-center">
            3
          </span>
          Payment Information
        </h2>
        <p className="text-gray-600">Complete your secure transaction</p>
      </div>

      <div className="space-y-8">
        <Alert
          icon={<ExclamationCircleIcon className="h-5 w-5" />}
          title="Important Payment Instruction"
          message={
            <>
              <span className="font-bold">When making your payment:</span> You{" "}
              <span className="underline">must</span> include your{" "}
              <span className="font-semibold bg-orange-200 px-1 rounded">
                &quot;Full Name&quot;
              </span>{" "}
              as the payment reference.
            </>
          }
          type="warning"
        />

        <BankDetails details={bankDetails} />

        <FileUpload
          label="Upload Payment Receipt *"
          description="JPG, PNG, PDF up to 5MB"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(file) => onFileChange("payment", "receipt", file)}
          file={formData.payment.receipt}
          disabled={formData.payment.skipReceipt}
        />

        <Checkbox
          label="I'll upload the receipt later"
          checked={formData.payment.skipReceipt}
          onChange={(checked) => onChange("payment", "skipReceipt", checked)}
        />
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between">
        <Button
          onClick={onBack}
          type="button"
          variant="secondary"
          icon={<ArrowLeftIcon className="w-4 h-4" />}
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={
            isSubmitting ||
            (!formData.payment.receipt && !formData.payment.skipReceipt)
          }
          isLoading={isSubmitting}
          icon={<ArrowRightIcon className="w-4 h-4" />}
        >
          {isSubmitting ? "Processing..." : "Complete Order"}
        </Button>
      </div>
    </form>
  );
}

function OrderSummary({
  currency,
  unitPrice,
  shippingFee,
  totalAmount,
  qualifiesForZim,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
      <div className="space-y-3">
        <SummaryRow label="Currency:" value={currency || "Not selected"} />
        <SummaryRow
          label="Unit Price:"
          value={`$${unitPrice.toFixed(2)} AUD`}
        />
        {qualifiesForZim && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <span className="text-sm font-medium text-green-700">
              🎁 Bonus: 20,000,000 ZWL (FREE)
            </span>
          </div>
        )}
        <SummaryRow
          label="Shipping:"
          value={`$${shippingFee.toFixed(2)} AUD`}
        />
        <hr className="my-3" />
        <SummaryRow
          label={<span className="font-bold">Total:</span>}
          value={
            <span className="text-orange font-bold">
              ${totalAmount.toFixed(2)} AUD
            </span>
          }
        />
      </div>
      <div className="mt-6 p-4 bg-orange-50 rounded-lg">
        <p className="text-sm text-orange">
          <strong>Note:</strong> Your order will be processed within 24–48
          hours.
        </p>
      </div>
    </div>
  );
}

/** ========================
 *  UI Primitives
 *  ===================== */
function InputField({
  label,
  type = "text",
  value,
  onChange,
  error,
  ...props
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-orange focus:border-orange ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function SelectField({ label, value, options, onChange, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange focus:border-orange"
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option || "Select an option"}
          </option>
        ))}
      </select>
    </div>
  );
}

function FileUpload({
  label,
  description,
  accept,
  onChange,
  file,
  disabled = false,
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
        {file && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Uploaded
          </span>
        )}
      </div>

      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg ${
          disabled ? "opacity-50" : ""
        }`}
      >
        <div className="space-y-1 text-center">
          <div className="flex text-sm text-gray-600">
            <label
              className={`relative cursor-pointer rounded-md font-medium text-orange hover:text-orange focus-within:outline-none ${
                disabled ? "cursor-not-allowed" : ""
              }`}
            >
              <span>Upload a file</span>
              <input
                type="file"
                accept={accept}
                onChange={(e) => onChange(e.target.files?.[0])}
                disabled={disabled}
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">{description}</p>
          {file && (
            <p className="text-sm text-green-600 mt-2">
              {file.name} ({Math.round(file.size / 1024)} KB)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Checkbox({ label, checked, onChange, ...props }) {
  return (
    <div className="flex items-start">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 mr-2"
        {...props}
      />
      <label className="text-sm text-gray-600">{label}</label>
    </div>
  );
}

function Button({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  icon,
  variant = "primary",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center gap-2 text-sm font-medium py-2 px-5 rounded-md transition-colors";
  const variantClasses = {
    primary: `text-white ${
      disabled || isLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-orange hover:bg-orange"
    }`,
    secondary: `text-gray-600 hover:text-gray-800 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin">🌀</span>
      ) : (
        icon && React.cloneElement(icon, { className: "w-4 h-4" })
      )}
      {children}
    </button>
  );
}

function Alert({ icon, title, message, type = "info" }) {
  const containerClasses = {
    info: "bg-blue-50 border-blue-500",
    warning: "bg-orange-50 border-orange",
    error: "bg-red-50 border-red-500",
    success: "bg-green-50 border-green-500",
  };
  const textClasses = {
    info: "text-blue-800",
    warning: "text-orange",
    error: "text-red-800",
    success: "text-green-800",
  };

  return (
    <div
      className={`border-l-4 ${containerClasses[type]} ${textClasses[type]} py-1 rounded-r-lg`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {React.cloneElement(icon, {
            className: `h-5 w-5 ${textClasses[type]}`,
          })}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="mt-2 text-sm">
            {typeof message === "string" ? <p>{message}</p> : message}
          </div>
        </div>
      </div>
    </div>
  );
}

function BankDetails({ details }) {
  return (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
      <h3 className="text-md font-semibold mb-2 text-gray-800 flex items-center gap-2">
        <BanknotesIcon className="h-5 w-5 text-orange" />
        Bank Transfer Details
      </h3>
      {Object.entries(details).map(([key, value]) => (
        <p key={key} className="text-sm">
          <strong>
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (c) => c.toUpperCase())}
            :
          </strong>{" "}
          {value}
        </p>
      ))}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function SuccessModal({ isOpen }) {
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      router.push("/thank-you");
    }, 1000);
    return () => clearTimeout(t);
  }, [isOpen, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <CheckCircleIcon className="w-12 h-12 mx-auto text-green-500 mb-4" />
        <h3 className="text-xl font-bold mb-4">Order Placed Successfully!</h3>
        <p className="mb-6">
          Thank you for your order. Your order will be processed within 24–48
          hours.
        </p>
        <p className="text-gray-500 text-sm">Redirecting...</p>
      </div>
    </div>
  );
}
