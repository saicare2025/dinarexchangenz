import React, { useEffect, useState, useCallback } from "react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import InputField from "./ui/InputField";
import FileUpload from "./ui/FileUpload";
import Checkbox from "./ui/Checkbox";
import Button from "./ui/Button";

export default function IDVerification({
  formData,
  onChange,
  onFileChange,
  isValid,
  onBack,
  onNext,
}) {
  const { skipIdUpload, isOldVerifiedUser } = formData.verification;
  const [infoOpen, setInfoOpen] = useState(false);

  const handleIdOptionChange = (option) => {
    onChange("verification", "skipIdUpload", false);
    onChange("verification", "isOldVerifiedUser", false);

    if (option === "skip") onChange("verification", "skipIdUpload", true);
    if (option === "oldUser") onChange("verification", "isOldVerifiedUser", true);

    if (option === "skip" || option === "oldUser") {
      onFileChange("verification", "idFile", null);
      onChange("verification", "idNumber", "");
      onChange("verification", "idExpiry", "");
    }
  };

  const openInfo = useCallback(() => setInfoOpen(true), []);
  const closeInfo = useCallback(() => setInfoOpen(false), []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setInfoOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 2: ID Verification</h2>
      <p className="text-gray-600 mb-6">
        Please choose your ID verification method to complete your order.
      </p>

      <div className="space-y-6">
        {/* Verification Options with clickable info trigger */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">Verification Options</h3>

            {/* Click/Touch to open info (works on mobile), still accessible on desktop */}
            <button
              type="button"
              onClick={openInfo}
              aria-haspopup="dialog"
              aria-expanded={infoOpen}
              aria-controls="idv-info-dialog"
              className="inline-flex items-center justify-center rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <QuestionMarkCircleIcon className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <span className="sr-only">Why we require ID</span>
            </button>
          </div>

          {/* Upload ID Option */}
          <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
            <input
              type="radio"
              id="uploadId"
              name="idOption"
              checked={!skipIdUpload && !isOldVerifiedUser}
              onChange={() => handleIdOptionChange("upload")}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <label htmlFor="uploadId" className="block text-sm font-medium text-gray-700 mb-2">
                Upload ID Document (New Users)
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Upload a valid photo ID for verification purposes.
              </p>

              {!skipIdUpload && !isOldVerifiedUser && (
                <div className="space-y-4 mt-4">
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
                </div>
              )}
            </div>
          </div>

          {/* Skip Option */}
          <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
            <input
              type="radio"
              id="skipId"
              name="idOption"
              checked={skipIdUpload}
              onChange={() => handleIdOptionChange("skip")}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <label htmlFor="skipId" className="block text-sm font-medium text-gray-700">
                Skip ID Upload
              </label>
              <p className="text-sm text-gray-600">Proceed without uploading an ID document.</p>
            </div>
          </div>

          {/* Old Verified User */}
          <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
            <input
              type="radio"
              id="oldUser"
              name="idOption"
              checked={isOldVerifiedUser}
              onChange={() => handleIdOptionChange("oldUser")}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <label htmlFor="oldUser" className="block text-sm font-medium text-gray-700">
                Old User (Already Verified)
              </label>
              <p className="text-sm text-gray-600">
                I am a returning customer who has already completed ID verification.
              </p>
            </div>
          </div>
        </div>

        <Checkbox
          label="I accept the Terms and Conditions and Privacy Policy. I understand that ID verification is required for delivery."
          checked={formData.verification.acceptTerms}
          onChange={(checked) => onChange("verification", "acceptTerms", checked)}
        />
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={onBack} variant="secondary" icon={<ArrowLeftIcon className="w-4 h-4" />}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid} icon={<ArrowRightIcon className="w-4 h-4" />}>
          Continue to Payment
        </Button>
      </div>

      {/* Centered Modal / Tooltip (mobile & desktop) */}
      {infoOpen && (
        <div
          id="idv-info-dialog"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={closeInfo}
            className="absolute inset-0 bg-black/40"
          />

          {/* Dialog panel */}
          <div className="relative mx-4 w-full max-w-lg rounded-xl shadow-xl bg-blue-100 text-blue-900">
            <div className="p-5 sm:p-6">
              <h4 className="text-base sm:text-lg font-semibold mb-3 text-center">
                Why we require your ID
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-center">
                We require your Identification Documents as Oz Trading Group Pty Ltd is enrolled in the AML/CTF
                program with AUSTRAC, Australia&apos;s anti-money laundering and counter-terrorism financing regulator
                and specialist financial intelligence unit. It is a mandatory requirement to identify customers before
                we sell currency.
                <br />
                For info please visit{" "}
                <a
                  href="https://www.austrac.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-700 font-medium"
                >
                  www.austrac.gov.au
                </a>
                .
              </p>

              <div className="mt-5 flex justify-center">
                <Button onClick={closeInfo}>Close</Button>
              </div>
            </div>

            {/* Corner close (X) */}
            <button
              type="button"
              onClick={closeInfo}
              className="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close dialog"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
