import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import InputField from "./ui/InputField";
import FileUpload from "./ui/FileUpload";
import Checkbox from "./ui/Checkbox";
import Button from "./ui/Button";

export default function IDVerification({ formData, onChange, onFileChange, isValid, onBack, onNext }) {
  const { skipIdUpload, isOldVerifiedUser } = formData.verification;
  
  // Handle radio button changes
  const handleIdOptionChange = (option) => {
    // Reset all options first
    onChange("verification", "skipIdUpload", false);
    onChange("verification", "isOldVerifiedUser", false);
    
    // Set the selected option
    if (option === 'skip') {
      onChange("verification", "skipIdUpload", true);
    } else if (option === 'oldUser') {
      onChange("verification", "isOldVerifiedUser", true);
    }
    
    // Clear ID fields when skipping or using old user option
    if (option === 'skip' || option === 'oldUser') {
      onFileChange("verification", "idFile", null);
      onChange("verification", "idNumber", "");
      onChange("verification", "idExpiry", "");
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 2: ID Verification</h2>
      <p className="text-gray-600 mb-6">
        Please choose your ID verification method to complete your order.
      </p>

      <div className="space-y-6">
        {/* ID Verification Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Verification Options</h3>
          
          {/* Upload ID Option */}
          <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
            <input
              type="radio"
              id="uploadId"
              name="idOption"
              checked={!skipIdUpload && !isOldVerifiedUser}
              onChange={() => handleIdOptionChange('upload')}
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
          <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
            <input
              type="radio"
              id="skipId"
              name="idOption"
              checked={skipIdUpload}
              onChange={() => handleIdOptionChange('skip')}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <label htmlFor="skipId" className="block text-sm font-medium text-gray-700">
                Skip ID Upload
              </label>
              <p className="text-sm text-gray-600">
                Proceed without uploading an ID document.
              </p>
            </div>
          </div>

          {/* Old Verified User Option */}
          <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
            <input
              type="radio"
              id="oldUser"
              name="idOption"
              checked={isOldVerifiedUser}
              onChange={() => handleIdOptionChange('oldUser')}
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
    </div>
  );
}
