"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  IdentificationIcon,
  DocumentTextIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import MainLayout from "../MainLayout";

const currencyOptions = [
  { label: "2,000,000 IQD - $5,600.00 AUD", value: 5600 },
  { label: "1,000,000 IQD - $2,800.00 AUD", value: 2800 },
  { label: "500,000 IQD - $1,400.00 AUD", value: 1400 },
];

const initialFormData = {
  fullName: "",
  email: "",
  mobile: "",
  country: "",
  address: "",
  city: "",
  state: "",
  postcode: "",
  currency: "", // Set to empty initially
  quantity: 0, // Set to 0 initially
  idFile: null,
  acceptTerms: false,
  cardNumber: "",
  expirationDate: "",
  cvv: "",
  cardholderName: "",
  saveCard: false,
};

export default function BuyDinar() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = useCallback((e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  }, []);

  const nextStep = useCallback(() => setStep((prev) => prev + 1), []);
  const prevStep = useCallback(() => setStep((prev) => prev - 1), []);

  const calculateTotal = useMemo(() => {
    const selectedCurrency = currencyOptions.find(
      (opt) => opt.label === formData.currency
    );
    const subtotal =
      (selectedCurrency ? selectedCurrency.value : 0) * formData.quantity;
    const shipping = 19.99;
    return (subtotal + shipping).toFixed(2);
  }, [formData.currency, formData.quantity]);

  const getCurrencyValue = useMemo(() => {
    const selectedCurrency = currencyOptions.find(
      (opt) => opt.label === formData.currency
    );
    return selectedCurrency ? selectedCurrency.value : 0;
  }, [formData.currency]);

  const isStep1Valid = useMemo(() => {
    const {
      fullName,
      email,
      mobile,
      country,
      address,
      city,
      state,
      postcode,
      currency,
      quantity,
    } = formData;
    return (
      fullName &&
      email &&
      mobile &&
      country &&
      address &&
      city &&
      state &&
      postcode &&
      currency &&
      quantity > 0
    );
  }, [formData]);

  const isStep3Valid = useMemo(() => {
    const { cardNumber, expirationDate, cvv, cardholderName } = formData;
    return cardNumber && expirationDate && cvv && cardholderName;
  }, [formData]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Buy Iraqi Dinar
            </h1>
            <p className="text-lg text-gray-600">
              Complete your order in 3 simple steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative">
            <div
              className={`flex flex-col items-center ${
                step >= 1 ? "text-orange-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  step >= 1
                    ? "bg-orange-100 border-2 border-orange-500"
                    : "bg-gray-100"
                }`}
              >
                <DocumentTextIcon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Order Details</span>
            </div>

            <div
              className={`flex flex-col items-center ${
                step >= 2 ? "text-orange-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  step >= 2
                    ? "bg-orange-100 border-2 border-orange-500"
                    : "bg-gray-100"
                }`}
              >
                <IdentificationIcon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">ID Verification</span>
            </div>

            <div
              className={`flex flex-col items-center ${
                step >= 3 ? "text-orange-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  step >= 3
                    ? "bg-orange-100 border-2 border-orange-500"
                    : "bg-gray-100"
                }`}
              >
                <CreditCardIcon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>

            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{
                  width: step === 1 ? "16%" : step === 2 ? "50%" : "84%",
                }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Form */}
            <div className="lg:w-2/3">
              {step === 1 && (
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Step 1: Order Details
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="mobile"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        required
                      >
                        <option value="">Select a country</option>
                        <option value="Australia">Australia</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          State *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="postcode"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Postcode *
                        </label>
                        <input
                          type="text"
                          id="postcode"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="currency"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Select Currency Amount *
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
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

                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={nextStep}
                      disabled={!isStep1Valid}
                      className={`flex items-center gap-2 text-white font-medium py-2.5 px-6 rounded-md transition-colors ${
                        !isStep1Valid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-orange-600 hover:bg-orange-700"
                      }`}
                    >
                      Continue to Payment Details{" "}
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Step 2: Photo ID Upload
                  </h2>
                  <p className="text-gray-600 mb-6">
                    To complete your order, please upload a valid photo ID for
                    verification purposes.
                  </p>

                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <IdentificationIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-gray-500 mb-2">
                        Accepted: Driver&apos;s License, Passport + Utility Bill
                      </p>
                      <p className="text-xs text-gray-400 mb-4">
                        File types: JPG, PNG, PDF (Max 10MB)
                      </p>

                      <label className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors cursor-pointer">
                        <input
                          type="file"
                          name="idFile"
                          onChange={handleChange}
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.pdf"
                        />
                        Choose File
                      </label>
                      <button
                        type="button"
                        className="ml-3 inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        Take Photo
                      </button>

                      {formData.idFile && (
                        <div className="mt-4 text-sm text-green-600">
                          {formData.idFile.name} uploaded successfully
                        </div>
                      )}
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        id="acceptTerms"
                        className="mt-1 mr-2"
                        required
                      />
                      <label
                        htmlFor="acceptTerms"
                        className="text-sm text-gray-600"
                      >
                        I accept the Terms and Conditions and Privacy Policy. I
                        understand that ID verification is required for
                        delivery.
                      </label>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={prevStep}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium py-2.5 px-6 rounded-md transition-colors"
                    >
                      <ArrowLeftIcon className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!formData.idFile || !formData.acceptTerms}
                      className={`flex items-center gap-2 text-white font-medium py-2.5 px-6 rounded-md transition-colors ${
                        !formData.idFile || !formData.acceptTerms
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-orange-600 hover:bg-orange-700"
                      }`}
                    >
                      Continue to Payment <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Step 3: Payment Information
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="expirationDate"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Expiration Date *
                        </label>
                        <input
                          type="text"
                          id="expirationDate"
                          name="expirationDate"
                          value={formData.expirationDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cardholderName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        id="cardholderName"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleChange}
                        placeholder="Full name as shown on card"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="saveCard"
                          name="saveCard"
                          checked={formData.saveCard}
                          onChange={handleChange}
                          className="mt-1 mr-2"
                        />
                        <label
                          htmlFor="saveCard"
                          className="text-sm text-gray-600"
                        >
                          Save this card for future purchases
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={prevStep}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium py-2.5 px-6 rounded-md transition-colors"
                    >
                      <ArrowLeftIcon className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={!isStep3Valid}
                      className={`flex items-center gap-2 text-white font-medium py-2.5 px-6 rounded-md transition-colors ${
                        !isStep3Valid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-orange-600 hover:bg-orange-700"
                      }`}
                    >
                      Complete Order <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h3>

                {/* Conditionally render order summary details based on step 1 validity */}
                {isStep1Valid && (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Currency:</span>
                      <span className="font-medium">
                        {formData.currency.split(" - ")[0]}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{formData.quantity}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">
                        ${(getCurrencyValue * formData.quantity).toFixed(2)} AUD
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">$19.99 AUD</span>
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex justify-between">
                      <span className="text-lg font-bold text-gray-800">
                        Total:
                      </span>
                      <span className="text-lg font-bold text-orange-600">
                        ${calculateTotal} AUD
                      </span>
                    </div>
                  </div>
                )}

                {!isStep1Valid && (
                  <p className="text-gray-500 text-center py-4">
                    Please fill in Step 1 details to see order summary.
                  </p>
                )}

                {/* Conditional messages based on step */}
                {step === 1 && (
                  <div className="mt-6 bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <h4 className="text-sm font-medium text-orange-800 mb-2">
                      Secure Checkout
                    </h4>
                    <p className="text-xs text-orange-700">
                      Your personal information is encrypted and secure. We
                      don&apos;t share your details with third parties.
                    </p>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">
                      ID Verification Required
                    </h4>
                    <p className="text-xs text-blue-700">
                      For security and compliance, we require photo ID
                      verification for all currency orders.
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="text-sm font-medium text-green-800 mb-2">
                      Secure Payment
                    </h4>
                    <p className="text-xs text-green-700">
                      All transactions are processed through our PCI-DSS
                      compliant payment gateway.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
