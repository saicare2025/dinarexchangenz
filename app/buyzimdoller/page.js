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

const bankDetails = {
  accountName: "John Doe",
  accountNumber: "123456789",
  bsb: "062-000",
  bankName: "Dummy Bank Australia",
};

const westernUnionDetails = {
  recipientName: "Jane Smith",
  city: "Sydney",
  country: "Australia",
};

const initialFormData = {
  fullName: "",
  email: "",
  mobile: "",
  country: "",
  address: "",
  city: "",
  state: "",
  postcode: "",
  currency: "",
  quantity: 0,
  idFile: null,
  acceptTerms: false,
  paymentMethod: "",
  paymentReceipt: null,
  skipReceipt: false,
  comments: "",
};

export default function BuyDinar() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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
      currency
    );
  }, [formData]);

  // FIXED: Updated isStep3Valid to properly validate payment methods
  const isStep3Valid = useMemo(() => {
    const { paymentMethod, paymentReceipt, skipReceipt } = formData;

    // Must have a payment method selected
    if (!paymentMethod) {
      return false;
    }

    // For bank transfer or western union, must have receipt uploaded OR skip receipt checked
    if (
      paymentMethod === "bank_transfer" ||
      paymentMethod === "western_union"
    ) {
      return paymentReceipt || skipReceipt;
    }

    // For any other payment methods (future implementations)
    return false;
  }, [formData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isStep3Valid) return;

    // Here you would normally send data to your backend API
    // For demo, just show success popup:
    setShowSuccessPopup(true);
  };
  const closePopup = () => setShowSuccessPopup(false);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-orange-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Buy Zimbabwe Dollar
            </h1>

            <div className="max-w-5xl mx-auto">
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 text-left mb-4">
                <p className="font-medium text-gray-800">
                  <span className="text-orange-600 font-bold">Important:</span>{" "}
                  All pricing is listed in AUD. Please calculate the exchange
                  rate before you make the payment.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-10 lg:gap-20 mb-4 relative">
            <div
              className={`flex flex-col items-center ${
                step >= 1 ? "text-orange-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 1
                    ? "bg-orange-100 border-2 border-orange-500"
                    : "bg-gray-100"
                }`}
              >
                <DocumentTextIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">Order Details</span>
            </div>

            <div
              className={`flex flex-col items-center ${
                step >= 2 ? "text-orange-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 2
                    ? "bg-orange-100 border-2 border-orange-500"
                    : "bg-gray-100"
                }`}
              >
                <IdentificationIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">ID Verification</span>
            </div>

            <div
              className={`flex flex-col items-center ${
                step >= 3 ? "text-orange-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 3
                    ? "bg-orange-100 border-2 border-orange-500"
                    : "bg-gray-100"
                }`}
              >
                <CreditCardIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">Payment</span>
            </div>

            <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
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
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Step 1: Order Details
                  </h2>

                  <div className="mb-3">
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
                    {/* First row: Full Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
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
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Second row: Mobile + Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
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
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        >
                          <option value="">Select a country</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                    </div>

                    {/* Address */}
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
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>

                    {/* Third row: City + State + Postcode */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
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
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
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
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={nextStep}
                      disabled={!isStep1Valid}
                      className={`flex items-center gap-2 text-white text-sm font-medium py-2 px-5 rounded-md transition-colors ${
                        !isStep1Valid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-orange-600 hover:bg-orange-700"
                      }`}
                    >
                      Continue to ID Verification
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
                      <label className="ml-3 inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors cursor-pointer">
                        <input
                          type="file"
                          name="idFile"
                          accept="image/*"
                          capture="environment"
                          onChange={handleChange}
                          className="hidden"
                        />
                        Take Photo
                      </label>

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
                <>
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Step 3: Payment Information
                    </h2>

                    <p className="text-gray-600 mb-6">
                      Please choose your payment method:
                    </p>

                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="paymentMethod"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Select your Payment Option *
                        </label>
                        <select
                          id="paymentMethod"
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="">-- Choose --</option>
                          <option value="bank_transfer">Bank Transfer</option>
                          <option value="western_union">
                            Western Union Money Transfer
                          </option>
                        </select>
                      </div>

                      {/* Conditional Payment Details */}
                      {formData.paymentMethod === "bank_transfer" &&
                        bankDetails && (
                          <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                            <h3 className="text-md font-semibold mb-2 text-gray-800">
                              Bank Transfer Details
                            </h3>
                            <p>
                              <strong>Account Name:</strong>{" "}
                              {bankDetails.accountName}
                            </p>
                            <p>
                              <strong>Account Number:</strong>{" "}
                              {bankDetails.accountNumber}
                            </p>
                            <p>
                              <strong>BSB:</strong> {bankDetails.bsb}
                            </p>
                            <p>
                              <strong>Bank Name:</strong> {bankDetails.bankName}
                            </p>
                          </div>
                        )}

                      {formData.paymentMethod === "western_union" &&
                        westernUnionDetails && (
                          <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                            <h3 className="text-md font-semibold mb-2 text-gray-800">
                              Western Union Details
                            </h3>
                            <p>
                              <strong>Recipient Name:</strong>{" "}
                              {westernUnionDetails.recipientName}
                            </p>
                            <p>
                              <strong>City:</strong> {westernUnionDetails.city}
                            </p>
                            <p>
                              <strong>Country:</strong>{" "}
                              {westernUnionDetails.country}
                            </p>
                          </div>
                        )}

                      {/* Receipt Upload */}
                      <div>
                        <label
                          htmlFor="paymentReceipt"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Upload Payment Receipt *
                        </label>
                        <input
                          type="file"
                          id="paymentReceipt"
                          name="paymentReceipt"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleChange}
                          disabled={formData.skipReceipt}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {formData.paymentReceipt && !formData.skipReceipt && (
                          <p className="text-green-600 text-sm mt-2">
                            {formData.paymentReceipt.name} uploaded successfully
                          </p>
                        )}

                        <div className="mt-2 flex items-center">
                          <input
                            type="checkbox"
                            id="skipReceipt"
                            name="skipReceipt"
                            checked={formData.skipReceipt}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <label
                            htmlFor="skipReceipt"
                            className="text-sm text-gray-600"
                          >
                            Not now
                          </label>
                        </div>
                      </div>

                      {/* Optional Comments */}
                      <div>
                        <label
                          htmlFor="comments"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Comments (Optional)
                        </label>
                        <textarea
                          id="comments"
                          name="comments"
                          rows={3}
                          value={formData.comments}
                          onChange={handleChange}
                          placeholder="Write any additional notes or instructions here..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={prevStep}
                        type="button"
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
                  </form>

                  {/* Success Popup */}
                  {showSuccessPopup && (
                    <div
                      className="fixed inset-0 flex items-center justify-center bg-orange/20 bg-opacity-30 z-50"
                      style={{ backdropFilter: "blur(8px)" }}
                    >
                      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
                        <h3 className="text-xl font-bold mb-4">
                          Order Placed Successfully!
                        </h3>
                        <p className="mb-6">Thank you for your order.</p>
                        <button
                          onClick={closePopup}
                          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Order Summary */}
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Currency:</span>
                    <span className="font-medium ml-12">
                      {formData.currency || "Not selected"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit Price:</span>
                    <span className="font-medium">
                      ${getCurrencyValue.toFixed(2)} AUD
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">$49.99 AUD</span>
                  </div>

                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-orange-600">
                      ${(getCurrencyValue + 49.99).toFixed(2)} AUD
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-600">
                    <strong>Note:</strong> Your order will be processed within
                    24–48 hours after payment verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
