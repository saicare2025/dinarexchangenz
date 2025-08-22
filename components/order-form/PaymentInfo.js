import React from "react";
import { ArrowRightIcon, ArrowLeftIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import FileUpload from "./ui/FileUpload";
import Checkbox from "./ui/Checkbox";
import Button from "./ui/Button";
import Alert from "./ui/Alert";
import BankDetails from "./ui/BankDetails";

export default function PaymentInfo({
  formData,
  onChange,
  onFileChange,
  onBack,
  onSubmit,
  isSubmitting,
  bankDetails,
}) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100">
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
              <span className="font-semibold bg-orange-200 px-1 rounded">&quot;Full Name&quot;</span>{" "}
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
        <Button onClick={onBack} type="button" variant="secondary" icon={<ArrowLeftIcon className="w-4 h-4" />}>
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
