import React, { useEffect, useState, useCallback } from "react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
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
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const openPrivacy = useCallback(() => setPrivacyOpen(true), []);
  const closePrivacy = useCallback(() => setPrivacyOpen(false), []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setPrivacyOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

      <div className="space-y-4">
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
        {/* Privacy Statement trigger row */}
        <div className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 border border-gray-200 p-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Dinar Exchange Privacy Statement
            </p>
            <p className="text-xs text-gray-600">
              Tap the question mark to read our privacy statement.
            </p>
          </div>
          <button
            type="button"
            onClick={openPrivacy}
            aria-haspopup="dialog"
            aria-expanded={privacyOpen}
            aria-controls="privacy-dialog"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="View Privacy Statement"
          >
            <QuestionMarkCircleIcon className="w-5 h-5" aria-hidden="true" />
            <span className="hidden sm:inline text-sm">View</span>
          </button>
        </div>
         <Checkbox
           label="I agree to the Terms & Conditions and Privacy Statement *"
           checked={agreedToTerms}
           onChange={setAgreedToTerms}
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
             (!formData.payment.receipt && !formData.payment.skipReceipt) ||
+            !agreedToTerms
          }
          isLoading={isSubmitting}
          icon={<ArrowRightIcon className="w-4 h-4" />}
        >
          {isSubmitting ? "Processing..." : "Complete Order"}
        </Button>
      </div>

      {/* Centered Privacy Modal (mobile & desktop) */}
      {privacyOpen && (
        <div
          id="privacy-dialog"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={closePrivacy}
            className="absolute inset-0 bg-black/40"
          />

          {/* Panel */}
          <div className="relative mx-4 w-full max-w-3xl rounded-xl shadow-xl bg-blue-100 text-blue-900">
            <div className="p-5 sm:p-6">
              <h4 className="text-base sm:text-lg font-semibold mb-3 text-center">
                Dinar Exchange Privacy Statement
              </h4>

              {/* Scrollable content */}
              <div className="max-h-[70vh] overflow-y-auto pr-1 sm:pr-2 text-xs sm:text-sm leading-relaxed space-y-3">
      <p>
        This online privacy statement describes how Dinar Exchange collects and uses your personal information (&quot;Information&quot;) that we obtain when you visit and/or use our Web site. The currency exchange services offered on this Web site are provided by Oz Trading Group Pty Ltd ACN 158 981 787 trading as Dinar Exchange. As a reporting entity Dinar Exchange is bound by the National Privacy Principles under the Privacy Act 1988 (Commonwealth).
      </p>

      <h5 className="font-semibold">WHAT DO WE COLLECT</h5>
      <p>
        Dinar Exchange collects Information about you from a variety of sources including those listed below. By exchanging currency through Dinar Exchange you are consenting to the collection, transfer and storage of this Information by computers or other transfer or storage devices in Australia, including the transfer and retention of your data outside of the Australia to other countries. We currently do not transfer your information to any other country and we do not use any cloud computing service to back up our data.
      </p>

      <ul className="list-disc pl-5 space-y-1">
        <li>
          We collect Information you supply when: (a) you ask us for currency exchange; (b) you submit Information on applications or other forms to us; or (c) you otherwise submit personal information to us;
        </li>
        <li>
          We collect personal information about your transactions with us;
        </li>
        <li>
          We collect personal information about you from a variety of third party sources such as our business customers, government agencies and consumer reporting agencies and other suppliers of public information, in order to verify any of the information you provide in order to effect your transactions;
        </li>
        <li>
          We collect and retain your bank card details for use in future transactions; and
        </li>
        <li>
          We also collect Information on your online activity as described in the paragraph below titled &quot;INTERNET TECHNOLOGY.&quot;
        </li>
      </ul>

      <h5 className="font-semibold">INTERNET TECHNOLOGY</h5>
      <p>
        We do use internet technologies like cookies and web beacons for a variety of purposes, including, but not limited to, those identified below.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>To assist us in providing services to you;</li>
        <li>
          To allow you to change web pages during your visit without having to re-enter your password;
        </li>
        <li>
          To store your preferences and other information and to track activity on our website;
        </li>
        <li>
          To better understand the effectiveness of our promotional campaigns; and
        </li>
        <li>
          To determine whether you&apos;ve acted on our promotional messages.
        </li>
      </ul>
      <p>
        A &quot;cookie&quot; is a text file placed on your computer&apos;s hard drive by a web site. Your web browser uses it to guide you to sites based on your interest. &quot;Web beacons&quot; are transparent electronic images placed in the web code that collect non-personal data while visiting a Web site. You are able to disable cookies and web beacons by changing your browser preferences. Please understand that this will limit the performance of Dinar Exchange&apos;s Web site. Your browser usually has documentation on how to disable cookies and Web beacons.
      </p>

      <h5 className="font-semibold">INFORMATION WE DISCLOSE</h5>
      <p>
        Subject to your consent or as otherwise permitted by law, we may disclose the Information we collect as described below.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          Legal, regulatory, security, processing and Australian and foreign government requirements, applicable to us or our Affiliates or service providers; and
        </li>
        <li>As permitted or required by law.</li>
      </ul>

      <h5 className="font-semibold">CREDIT AGENCY INFORMATION</h5>
      <p>
        We use an electronic verification service that polls credit reporting agencies for the headline information (not your credit status or credit application history) as part of our electronic verification process. By headline information we mean name, date of birth, current and previous addresses. No credit information is accessed. Your express consent is required for this process. Otherwise you can send us original certified copies by mail of your identification documentation.
      </p>

      <h5 className="font-semibold">CONFIDENTIALITY AND SECURITY</h5>
      <p>
        We endeavour to maintain physical, electrical and procedural safeguards to guard your Information. Despite our efforts third parties may unlawfully intercept or access transmissions sent to us or may wrongly instruct you to disclose personal information to them while posing as Dinar Exchange. Some disclosures are not subject to your consent. These include, among others, disclosures necessary to effect, administer or enforce a transaction you request; disclosures as permitted or required by law; for public safety; to prevent fraud; or in connection with other illegal activities.
      </p>
      <p>
        Dinar Exchange maintains your choice and transaction history based on our record retention policies. If you do not perform another transaction within the retention time period, your Information, as well as your choice will be removed.
      </p>

      <h5 className="font-semibold">ACCURACY OF INFORMATION</h5>
      <p>
        You may request (by contacting us in the manner set out below) details of the personal information we hold and request us to correct or erase any erroneous or out-of-date information. We reserve the right to independently verify claims made. To protect your privacy, we also will take reasonable steps to verify your identity before providing details or corrections.
      </p>

      <h5 className="font-semibold">EXTERNAL WEB SITES</h5>
      <p>
        Dinar Exchange&apos;s web site may be linked to or from third party Web sites. Dinar Exchange is not responsible for the content or privacy practices employed by web sites that are linked to or from our web site.
      </p>

      <h5 className="font-semibold">CHANGES</h5>
      <p>
        Dinar Exchange reserves the right to modify this Privacy Statement. Updated Privacy Statements will be posted at this Web site when amendments occur. We urge you to review this Privacy Statement when you visit to obtain the most current statement. You may change your choices at any time. We will be changing this statement in 2014 to conform with the requirements of the new Australian Privacy Principles which commence on 12 March 2014. We accept questions on this policy by email and by telephone.
      </p>
    </div>

              <div className="mt-5 flex justify-center">
                <Button onClick={closePrivacy} type="button">
                  Close
                </Button>
              </div>
            </div>

            {/* Corner close (X) */}
            <button
              type="button"
              onClick={closePrivacy}
              className="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close dialog"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
