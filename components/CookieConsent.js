"use client";

import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => setShowConsent(true), 1000); // Show after 1 second delay
    } else {
      setConsentGiven(consent === "accepted");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setConsentGiven(true);
    setShowConsent(false);
    // Initialize analytics cookies here if needed
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setConsentGiven(false);
    setShowConsent(false);
    // Remove any existing analytics cookies here if needed
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4 sm:pb-6">
      <div className="mx-auto max-w-xl rounded-t-lg border border-gray-200 bg-white shadow-xl">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 mr-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">We value your privacy</h3>
              <p className="text-sm text-gray-600">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                By clicking &quot;Accept All&quot;, you consent to our use of cookies.
              </p>

              {showDetails && (
                <div className="mt-4 text-sm text-gray-600 space-y-2">
                  <div className="flex items-start">
                    <CheckIcon className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>
                      <strong>Necessary cookies:</strong> Essential for the website to function properly.
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>
                      <strong>Analytics cookies:</strong> Help us understand how visitors interact with our website.
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>
                      <strong>Preference cookies:</strong> Remember your preferences for future visits.
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-500"
              >
                {showDetails ? "Hide details" : "Show details"}
                <ArrowPathIcon
                  className={`w-4 h-4 ml-1 inline transition-transform duration-200 ${
                    showDetails ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <button
              onClick={() => setShowConsent(false)}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleReject}
              className="flex-1 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Reject All
            </button>
            <button
              onClick={() => {
                // Add custom settings logic if needed
              }}
              className="flex-1 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
