"use client";
import MainLayout from "../MainLayout";
import OrderForm from "../../components/order-form/OrderForm";
import { IRAQI_DINAR_CONFIG } from "../../config/currencyConfigs";
import { Link } from "lucide-react";
import { useState } from "react";

export default function BuyDinarPage() {
  const [showMore, setShowMore] = useState(false);
  return (
    <MainLayout>
      <section className="py-8 px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl py-4 md:text-4xl lg:text-5xl text-center font-bold text-gray-900 mb-3 md:mb-4">
          Buy Iraqi Dinar
          <span className="text-orange"> in New Zealand</span>
        </h1>

        {/* Short description with Read More */}
        <div className="max-w-3xl mx-auto text-center text-gray-700 text-base md:text-lg leading-relaxed">
          <p>
            <strong>Trusted Source for Iraqi Dinar Since 2010</strong>
          </p>

          {showMore ? (
            <div className="mt-3">
              <p>
                At Dinar Exchange, we provide New Zealand customers with a
                secure and reliable way to buy Iraqi Dinar (IQD) online. Whether
                you’re purchasing for investment, collecting, or holding
                physical currency, our team ensures every order is handled with
                transparency, compliance, and care.
              </p>
              <p className="mt-2">
                We have proudly served thousands of customers across Australia
                and now offer the same trusted service to New Zealand residents.
              </p>
            </div>
          ) : null}

          {/* Read More / Read Less button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-3 text-orange font-medium hover:underline focus:outline-none"
          >
            {showMore ? "Read Less ▲" : "Read More ▼"}
          </button>
        </div>

        {/* Order Form */}
        <div>
          <OrderForm
            currencyOptions={IRAQI_DINAR_CONFIG.currencyOptions}
            bankDetails={IRAQI_DINAR_CONFIG.bankDetails}
            shippingFee={IRAQI_DINAR_CONFIG.shippingFee}
            bonusConfig={IRAQI_DINAR_CONFIG.bonusConfig}
            pageTitle="Buy Iraqi Dinar Online"
          />
        </div>

        {/* Additional Information Sections */}
        <div className="mt-12 space-y-10">
          {/* Why Buy Iraqi Dinar From Us */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              Why Buy Iraqi Dinar From Us?
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                ✅ <strong>100% Authentic Notes</strong> – All Dinar is genuine
                and verified with Iraqi Central Bank security features
                (watermark, color-shifting ink, embedded thread).
              </li>
              <li>
                ✅ <strong>Safe Payment</strong> – We accept only New Zealand
                bank transfers, ensuring secure and traceable transactions.
              </li>
              <li>
                ✅ <strong>Tracked Delivery</strong> – Orders are shipped with
                full tracking, typically delivered within 7–9 business days.
              </li>
              <li>
                ✅ <strong>Trusted Reputation</strong> – Over a decade of
                experience dealing in Dinar, serving thousands of satisfied
                clients.
              </li>
            </ul>
          </section>

          {/* Available Denominations */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              Available Iraqi Dinar Denominations
            </h2>
            <p className="text-gray-700 mb-4">
              We currently stock the most widely circulated Iraqi Dinar
              banknotes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>25,000 IQD notes</li>
              <li>50,000 IQD notes</li>
            </ul>
            <p className="text-gray-700 mt-4">
              These denominations are accepted globally among collectors and
              investors, and they contain the latest anti-counterfeiting
              features.
            </p>
          </section>

          {/* How to Buy Iraqi Dinar in New Zealand */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              How to Buy Iraqi Dinar in New Zealand
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
              {/* Step 1 */}
              <div className="flex h-full items-start justify-center rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div
                    aria-hidden
                    className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-orange text-white font-semibold shrink-0"
                  >
                    1
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Place Your Order
                  </h3>
                  <p className="text-gray-700 text-center mt-1">
                    Select the amount of Dinar you wish to purchase through our
                    secure order form.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex h-full items-start justify-center rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div
                    aria-hidden
                    className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-orange text-white font-semibold shrink-0"
                  >
                    2
                  </div>
                  <h3 className="font-semibold text-gray-900">Make Payment</h3>
                  <p className="text-gray-700 text-center mt-1">
                    Complete your order using NZ bank transfer. Once funds are
                    cleared, your order will be processed.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex h-full items-start justify-center rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div
                    aria-hidden
                    className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-orange text-white font-semibold shrink-0"
                  >
                    3
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Shipping &amp; Delivery
                  </h3>
                  <p className="text-gray-700 text-center mt-1">
                    Your package will be dispatched securely within 1–2 business
                    days of payment confirmation. Delivery usually takes 7–9
                    business days nationwide.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping & Delivery Information */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              Shipping & Delivery Information
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                🚚 <strong>Delivery Time:</strong> 7–9 business days (tracked
                courier)
              </li>
              <li>
                📦 <strong>Packaging:</strong> Discreet, tamper-proof envelopes
                for security
              </li>
              <li>
                🔒 <strong>Tracking:</strong> Customers receive a tracking
                number as soon as their order is shipped
              </li>
            </ul>
          </section>

          {/* Compliance & Security */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              Compliance & Security
            </h2>
            <p className="text-gray-700">
              We follow strict Anti-Money Laundering (AML) and compliance
              procedures to ensure all transactions are safe and legal. For
              larger orders, we may request proof of identity (driver’s licence
              or passport) before dispatch.
            </p>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              FAQs – Buying Iraqi Dinar in NZ
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold">
                  Q: Is it legal to buy Iraqi Dinar in New Zealand?
                </p>
                <p>
                  A: Yes. Buying and selling physical foreign currency is legal
                  in New Zealand when done through legitimate channels.
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  Q: How do I know the notes are real?
                </p>
                <p>
                  A: All notes come directly from trusted suppliers and include
                  official Iraqi Central Bank security features.
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  Q: What payment methods are available?
                </p>
                <p>
                  A: We only accept bank transfers from NZ bank accounts for
                  security and compliance.
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  Q: Can I sell my Iraqi Dinar later?
                </p>
                <p>
                  A: Yes, Dinar Exchange offers a buy-back service. Simply email
                  us with details of your notes, and we’ll provide a rate and
                  instructions.
                </p>
              </div>
            </div>
          </section>

          {/* Why New Zealand Customers Trust Dinar Exchange */}
          <section className="bg-white rounded-lg shadow-md p-6 text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              Why New Zealand Customers Trust Dinar Exchange
            </h2>
            <p className="mb-4">
              For over 14 years, Dinar Exchange has helped customers across
              Australasia buy and sell foreign banknotes safely. Our reputation
              is built on transparency, secure transactions, and exceptional
              customer support.
            </p>
            <p className="mb-4">
              When you order with us, you can rest assured that your investment
              in Iraqi Dinar is protected with full compliance and guaranteed
              authenticity.
            </p>
          </section>
        </div>
      </section>
    </MainLayout>
  );
}
