import React from "react";
import { ArrowRightIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import InputField from "./ui/InputField";
import SelectField from "./ui/SelectField";
import Button from "./ui/Button";
import Alert from "./ui/Alert";

export default function OrderDetails({
  formData,
  onChange,
  isValid,
  onNext,
  currencyOptions,
  qualifiesForBonus,
  validateMobile,
  bonusConfig,
}) {
  const mobileError =
    formData.personalInfo.mobile &&
    !validateMobile(formData.personalInfo.mobile)
      ? "Please enter a valid Australian mobile number (04xxxxxxxx or +614xxxxxxxx)"
      : "";

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-3">Step 1: Order Details</h2>

      {bonusConfig && (
        <div className="mb-3">
          <Alert
            icon={<ExclamationCircleIcon className="h-5 w-5" />}
            title="Special Offer"
            message={
              <>
                Buy <strong>{bonusConfig.minAmount.toLocaleString()} IQD</strong> or more and get{" "}
                <strong>{bonusConfig.bonusLabel}</strong> <em>FREE</em>!
                {qualifiesForBonus && (
                  <span className="ml-2 inline-block text-green-700 font-semibold">
                    ✅ Applied to your order
                  </span>
                )}
              </>
            }
            type="warning"
          />
        </div>
      )}

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

        <div className="grid grid-cols-3 gap-4">
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
        <Button onClick={onNext} disabled={!isValid} icon={<ArrowRightIcon className="w-4 h-4" />}>
          Continue to ID Verification
        </Button>
      </div>
    </div>
  );
}
