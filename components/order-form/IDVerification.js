import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import InputField from "./ui/InputField";
import FileUpload from "./ui/FileUpload";
import Checkbox from "./ui/Checkbox";
import Button from "./ui/Button";

export default function IDVerification({ formData, onChange, onFileChange, isValid, onBack, onNext }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 2: Photo ID Upload</h2>
      <p className="text-gray-600 mb-6">
        To complete your order, please upload a valid photo ID for verification purposes.
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
    </div>
  );
}
