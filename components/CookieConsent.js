"use client";

import { useState, useEffect } from 'react';
import { XMarkIcon, CheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setShowConsent(true), 1000);
    } else {
      setConsentGiven(consent === 'accepted');
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setConsentGiven(true);
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setConsentGiven(false);
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-t-lg shadow-xl border border-gray-200 p-4 sm:p-6 max-w-4xl mx-auto overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">We value your privacy</h3>
            <p className="text-sm text-gray-600">
              We use cookies to improve your experience, serve personalized content, and analyze traffic. By clicking
              "Accept All", you agree to our use of cookies.
            </p>

            {showDetails && (
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span><strong>Necessary:</strong> Required for site functionality.</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span><strong>Analytics:</strong> Help us understand user behavior.</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span><strong>Preferences:</strong> Remember your settings for future visits.</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-500 inline-flex items-center"
            >
              {showDetails ? 'Hide details' : 'Show details'}
              <ArrowPathIcon className={`w-4 h-4 ml-1 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <button
            onClick={() => setShowConsent(false)}
            className="self-start text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition"
          >
            Accept All
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-white text-gray-700 text-sm rounded-md border border-gray-300 hover:bg-gray-50 transition"
          >
            Reject All
          </button>
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-white text-gray-700 text-sm rounded-md border border-gray-300 hover:bg-gray-50 transition"
          >
            Customize
          </button>
        </div>
      </div>
    </div>
  );
                }
