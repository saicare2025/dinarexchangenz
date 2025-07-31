'use client';

import { useState } from 'react';
import {
  InformationCircleIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="font-semibold text-gray-800">{question}</span>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="text-gray-600 pb-4">{answer}</div>
      </div>
    </div>
  );
};

export default function FaqSection() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {/* General Questions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
            <InformationCircleIcon className="w-6 h-6" />
            General Questions
          </h3>
          <AccordionItem
            question="What is the Iraqi Dinar (IQD)?"
            answer="The Iraqi Dinar is the official currency of Iraq. Many investors purchase IQD anticipating potential appreciation due to Iraq's economic recovery and oil reserves."
          />
          <AccordionItem
            question="Is Dinar Exchange a registered business?"
            answer="Yes! We are a fully registered currency exchange service operating in New Zealand and Australia, providing authentic dinars with certificates of authenticity."
          />
        </div>

        {/* Pricing & Payment */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
            <CurrencyDollarIcon className="w-6 h-6" />
            Pricing & Payment
          </h3>
          <AccordionItem
            question="What exchange rates do you offer?"
            answer="Our rates are competitive and updated regularly. Check our live rates page or contact us for current pricing."
          />
          <AccordionItem
            question="What payment methods do you accept?"
            answer="We only accept bank transfers for security and compliance reasons. Cash payments are not available."
          />
        </div>

        {/* Order & Delivery */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
            <TruckIcon className="w-6 h-6" />
            Order & Delivery
          </h3>
          <AccordionItem
            question="How do I place an order?"
            answer={
              <ol className="list-decimal list-inside space-y-1">
                <li>Select your desired IQD amount</li>
                <li>Complete the order form with your details</li>
                <li>Make a bank transfer</li>
                <li>Receive tracking details once shipped</li>
              </ol>
            }
          />
          <AccordionItem
            question="How long does delivery take?"
            answer="Orders are dispatched within 1–2 business days via secure registered mail, with delivery typically in 3–5 business days."
          />
        </div>

        {/* Authenticity & Security */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
            <ShieldCheckIcon className="w-6 h-6" />
            Authenticity & Security
          </h3>
          <AccordionItem
            question="How do I know the dinars are real?"
            answer="Every order includes a Certificate of Authenticity. Our notes are sourced directly from Iraq's Central Bank."
          />
          <AccordionItem
            question="Can I sell my dinars back to you?"
            answer="Currently, we only facilitate purchases. For selling, we recommend checking with local currency dealers."
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Still have questions? Contact us at{' '}
          <a
            href="mailto:dinars@dinarexchange.com.au"
            className="text-orange-600 hover:underline"
          >
            dinars@dinarexchange.com.au
          </a>{' '}
          or call{' '}
          <a href="tel:0417460236" className="text-orange-600 hover:underline">
            0417 460 236
          </a>
        </p>
      </div>
    </div>
  );
}
