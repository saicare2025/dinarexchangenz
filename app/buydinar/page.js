"use client";

import React, { useState, useMemo, useCallback } from "react";
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

// Constants
const CURRENCY_OPTIONS = [
  { label: "25,000 IQD - $186 AUD", value: 186 },
  { label: "50,000 IQD - $281 AUD", value: 281 },
  { label: "75,000 IQD - $325 AUD", value: 325 },
  { label: "100,000 IQD - $381 AUD", value: 381 },
  { label: "200,000 IQD - $656 AUD", value: 656 },
  { label: "1,000,000 IQD - $2,800 AUD", value: 2800 },
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

export default function BuyDinar() {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Derived values
  const shippingFee = 49.99;
  const selectedCurrency = useMemo(() => (
    CURRENCY_OPTIONS.find(opt => opt.label === formData.orderDetails.currency)?.value || 0
  ), [formData.orderDetails.currency]);

  const totalAmount = selectedCurrency + shippingFee;

  // Form validation
  const isStep1Valid = useMemo(() => {
    const { personalInfo, orderDetails } = formData;
    return (
      personalInfo.fullName &&
      personalInfo.email &&
      personalInfo.mobile &&
      personalInfo.country &&
      personalInfo.address &&
      personalInfo.city &&
      personalInfo.state &&
      personalInfo.postcode &&
      orderDetails.currency
    );
  }, [formData]);

  const isStep2Valid = useMemo(() => (
    formData.verification.idFile && formData.verification.acceptTerms
  ), [formData.verification]);

  // Handlers
  const handleInputChange = useCallback((section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  }, []);

  const handleFileChange = useCallback(async (section, field, file) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      handleInputChange(section, field, file);
      handleInputChange(section, `${field}Url`, reader.result);
    };
    reader.readAsDataURL(file);
  }, [handleInputChange]);

  const nextStep = useCallback(() => setCurrentStep(prev => prev + 1), []);
  const prevStep = useCallback(() => setCurrentStep(prev => prev - 1), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would send the data to your backend here
      const orderData = {
        ...formData,
        totalAmount,
        orderDate: new Date().toISOString(),
      };

      console.log("Order Submission:", orderData); // Demo purposes
      setShowSuccess(true);
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {/* Stepper */}
        <Stepper currentStep={currentStep} steps={STEPS} />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form Section */}
          <div className="lg:w-2/3">
            {currentStep === 1 && (
              <OrderDetails
                formData={formData}
                onChange={handleInputChange}
                onFileChange={handleFileChange}
                isValid={isStep1Valid}
                onNext={nextStep}
                currencyOptions={CURRENCY_OPTIONS}
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
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <OrderSummary
              currency={formData.orderDetails.currency}
              unitPrice={selectedCurrency}
              shippingFee={shippingFee}
              totalAmount={totalAmount}
            />
          </div>
        </div>

        {/* Success Modal */}
        <SuccessModal 
          isOpen={showSuccess} 
          onClose={() => setShowSuccess(false)} 
        />
      </div>
    </MainLayout>
  );
}

// Component: Stepper
function Stepper({ currentStep, steps }) {
  return (
    <div className="flex justify-center gap-10 lg:gap-20 mb-4 relative">
      {steps.map((step) => {
        const isCompleted = step.id <= currentStep;
        return (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              isCompleted ? "text-orange-500" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                isCompleted
                  ? "bg-orange-100 border-2 border-orange-500"
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
          className="h-full bg-orange-500 transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

// Component: OrderDetails
function OrderDetails({ formData, onChange, onFileChange, isValid, onNext, currencyOptions }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-3">Step 1: Order Details</h2>
      
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Currency Amount *
        </label>
        <select
          value={formData.orderDetails.currency}
          onChange={(e) => onChange("orderDetails", "currency", e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
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
          />
          <SelectField
            label="Country *"
            value={formData.personalInfo.country}
            options={["", "Australia", "New Zealand"]}
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

// Component: IDVerification
function IDVerification({ formData, onChange, onFileChange, isValid, onBack, onNext }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 2: Photo ID Upload</h2>
      <p className="text-gray-600 mb-6">
        To complete your order, please upload a valid photo ID for verification purposes.
      </p>

      <div className="space-y-6">
        <FileUpload
          label="Upload ID Document"
          description="Accepted: Driver's License, Passport + Utility Bill"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(file) => onFileChange("verification", "idFile", file)}
          file={formData.verification.idFile}
        />

        <Checkbox
          label="I accept the Terms and Conditions and Privacy Policy. I understand that ID verification is required for delivery."
          checked={formData.verification.acceptTerms}
          onChange={(checked) => onChange("verification", "acceptTerms", checked)}
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

// Component: PaymentInfo
function PaymentInfo({ formData, onChange, onFileChange, onBack, onSubmit, isSubmitting, bankDetails }) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="bg-orange-100 text-orange-800 rounded-full w-10 h-10 flex items-center justify-center">
            3
          </span>
          Payment Information
        </h2>
        <p className="text-gray-600">Complete your secure transaction</p>
      </div>

      <div className="space-y-8">
        <Alert
          icon={<ExclamationCircleIcon className="h-5 w-5 text-orange" />}
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
          disabled={isSubmitting || (!formData.payment.receipt && !formData.payment.skipReceipt)}
          isLoading={isSubmitting}
          icon={<ArrowRightIcon className="w-4 h-4" />}
        >
          {isSubmitting ? "Processing..." : "Complete Order"}
        </Button>
      </div>
    </form>
  );
}

// Component: OrderSummary
function OrderSummary({ currency, unitPrice, shippingFee, totalAmount }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
      <div className="space-y-3">
        <SummaryRow label="Currency:" value={currency || "Not selected"} />
        <SummaryRow label="Unit Price:" value={`$${unitPrice.toFixed(2)} AUD`} />
        <SummaryRow label="Shipping:" value={`$${shippingFee.toFixed(2)} AUD`} />
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
          <strong>Note:</strong> Your order will be processed within 24–48 hours.
        </p>
      </div>
    </div>
  );
}

// UI Components
function InputField({ label, type = "text", value, onChange, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        {...props}
      />
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
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
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

function FileUpload({ label, description, accept, onChange, file, disabled = false }) {
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

      <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg ${disabled ? "opacity-50" : ""}`}>
        <div className="space-y-1 text-center">
          <div className="flex text-sm text-gray-600">
            <label className={`relative cursor-pointer rounded-md font-medium text-orange hover:text-orange-500 focus-within:outline-none ${disabled ? "cursor-not-allowed" : ""}`}>
              <span>Upload a file</span>
              <input
                type="file"
                accept={accept}
                onChange={(e) => onChange(e.target.files[0])}
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

function Button({ children, onClick, disabled = false, isLoading = false, icon, variant = "primary", ...props }) {
  const baseClasses = "inline-flex items-center gap-2 text-sm font-medium py-2 px-5 rounded-md transition-colors";
  
  const variantClasses = {
    primary: `text-white ${disabled || isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-orange hover:bg-orange"}`,
    secondary: `text-gray-600 hover:text-gray-800 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
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
  const typeClasses = {
    info: "bg-blue-50 border-blue-500 text-blue-800",
    warning: "bg-orange-50 border-orange-500 text-orange-800",
    error: "bg-red-50 border-red-500 text-red-800",
    success: "bg-green-50 border-green-500 text-green-800",
  };

  return (
    <div className={`border-l-4 ${typeClasses[type]} py-1 rounded-r-lg`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {React.cloneElement(icon, { className: `h-5 w-5 ${typeClasses[type].text}` })}
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

function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <CheckCircleIcon className="w-12 h-12 mx-auto text-green-500 mb-4" />
        <h3 className="text-xl font-bold mb-4">Order Placed Successfully!</h3>
        <p className="mb-6">
          Thank you for your order. For demonstration purposes, the order data has been logged to the console.
        </p>
        <Button onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
