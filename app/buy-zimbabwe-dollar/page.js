"use client";
import MainLayout from "../MainLayout";
import OrderForm from "../../components/order-form/OrderForm";
import { ZIMBABWE_DOLLAR_CONFIG } from "../../config/currencyConfigs";
import { useState } from "react";

export default function BuyDinarPage() {
  const [showMore, setShowMore] = useState(false);
  return (
    <MainLayout>
      <section className="py-8 max-w-5xl mx-auto">
        <h1 className="text-3xl py-4 md:text-4xl lg:text-5xl text-center font-bold text-gray-900 mb-3 md:mb-4">
          Buy Zimbabwe Dollars
          <span className="text-orange"> in New Zealand</span>
        </h1>

        {/* Short description with Read More */}
        <div className="max-w-3xl mx-auto text-center text-gray-700 text-base md:text-lg leading-relaxed">
          <p>
            <strong>Your Reliable Source for Zimbabwe Banknotes</strong>
          </p>

          {showMore ? (
            <div className="mt-3">
              <p>
                Dinar Exchange is New Zealand’s trusted provider of Zimbabwe
                Dollar (ZIM) banknotes. These notes, once used as the national
                currency of Zimbabwe, are now highly sought-after as collectible
                currency. Many New Zealanders purchase ZIM notes as part of a
                collection, while others view them as a speculative purchase due
                to discussions around potential future value.
              </p>
              <p className="mt-2">
                With over 14 years of experience in the currency trade, we make
                it simple and secure to buy Zimbabwe Dollars online in New
                Zealand.
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
            currencyOptions={ZIMBABWE_DOLLAR_CONFIG.currencyOptions}
            bankDetails={ZIMBABWE_DOLLAR_CONFIG.bankDetails}
            shippingFee={ZIMBABWE_DOLLAR_CONFIG.shippingFee}
            bonusConfig={ZIMBABWE_DOLLAR_CONFIG.bonusConfig}
            pageTitle="Buy Zimbabwe Dollars Online"
          />
        </div>

        <div className="mt-12 space-y-10">
          {/* Why Buy Zimbabwe Dollar Notes */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              Why Buy Zimbabwe Dollar Notes?
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                ✅ <strong>Collectible Value</strong> – Zimbabwe’s
                hyperinflation-era notes (such as the 100 Trillion ZIM) are
                world-famous and a staple in currency collections.
              </li>
              <li>
                ✅ <strong>Conversation Piece</strong> – The ZIM is recognised
                globally as one of the most unique currencies ever printed.
              </li>
              <li>
                ✅ <strong>Speculative Interest</strong> – Many people hold ZIM
                notes in case of future currency changes or redenominations.
              </li>
              <li>
                ✅ <strong>Affordable Entry Point</strong> – Compared to other
                currencies, ZIM notes allow collectors to own a piece of history
                at an accessible price.
              </li>
            </ul>
          </section>

          {/* Available Zimbabwe Dollar Denominations */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              Available Zimbabwe Dollar Denominations
            </h2>
            <p className="text-gray-700 mb-4">
              We stock a range of high-denomination ZIM notes, depending on
              availability:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>100 Trillion Zimbabwe Dollar Note</li>
              <li>50 Trillion Zimbabwe Dollar Note</li>
              <li>10 Trillion Zimbabwe Dollar Note</li>
            </ul>
            <p className="text-gray-700 mt-4">
              All notes are verified as authentic and include the original
              security features printed by the Reserve Bank of Zimbabwe.
            </p>
          </section>

          {/* How to Buy Zimbabwe Dollars in New Zealand */}
          <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2 text-center sm:text-left">
              How to Buy Zimbabwe Dollars in New Zealand
            </h2>

            {/* Responsive grid: 1 column on mobile, 3 columns on md+ */}
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
                    Choose your preferred denomination and quantity on our
                    secure order page.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex h-full items-start rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col justify-center items-center gap-4">
                <div
                  aria-hidden
                  className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-orange text-white font-semibold shrink-0"
                >
                  2
                </div>
                  <h3 className="font-semibold text-gray-900">Make Payment</h3>
                  <p className="text-gray-700 text-center mt-1">
                    Complete your purchase with a New Zealand bank transfer. We
                    currently do not accept card, PayPal, or crypto payments for
                    compliance reasons.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex h-full items-start rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col justify-center items-center gap-4">
                <div
                  aria-hidden
                  className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-orange text-white font-semibold shrink-0"
                >
                  3
                </div>
                  <h3 className="font-semibold text-gray-900">Delivery</h3>
                  <p className="text-gray-700 text-center mt-1">
                    Your notes will be shipped discreetly within 1–2 business
                    days after payment clears. Delivery usually takes 7–9
                    business days across New Zealand and comes with full
                    tracking.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping & Delivery Information */}
          <section className="bg-white rounded-lg shadow-md p-2 lg:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              Shipping &amp; Delivery Information
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                🚚 <strong>Delivery Time:</strong> 7–9 business days (tracked
                courier)
              </li>
              <li>
                📦 <strong>Packaging:</strong> Discreet and tamper-proof for
                security
              </li>
              <li>
                🔒 <strong>Tracking:</strong> You’ll receive a tracking link
                once dispatched
              </li>
            </ul>
          </section>

          {/* Authenticity Guarantee */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              Authenticity Guarantee
            </h2>
            <p className="text-gray-700">
              Every Zimbabwe Dollar note we supply is 100% genuine. Our ZIM
              notes are sourced through trusted suppliers and checked for
              authenticity before dispatch. We do not deal in replicas or
              copies.
            </p>
          </section>

          {/* FAQs – Zimbabwe Dollar Notes in NZ */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              FAQs – Zimbabwe Dollar Notes in NZ
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold">
                  Q: Are Zimbabwe Dollars legal tender today?
                </p>
                <p>
                  A: No. Zimbabwe Dollars were demonetised in 2009 and replaced
                  by a multi-currency system. Today, they are sold as
                  collectible notes only.
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  Q: Can I use ZIM notes as real currency in New Zealand?
                </p>
                <p>
                  A: No. ZIM notes are not accepted as payment in New Zealand or
                  anywhere else. They are sold for collectible and speculative
                  purposes only.
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  Q: Why do people buy Zimbabwe Dollars?
                </p>
                <p>
                  A: Most buyers are collectors, while some hold notes as a
                  “what if” speculative purchase in case of future
                  redenominations.
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  Q: Are the Zimbabwe Dollars you sell real?
                </p>
                <p>
                  A: Yes. All notes are original and verified as authentic. They
                  contain the official printing and security marks issued by the
                  Reserve Bank of Zimbabwe.
                </p>
              </div>
              <div>
                <p className="font-semibold">Q: How long does shipping take?</p>
                <p>
                  A: Orders are typically delivered within 7–9 business days
                  after payment is confirmed.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Dinar Exchange? */}
          <section className="bg-white rounded-lg shadow-md p-6 text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange pb-2">
              Why Choose Dinar Exchange?
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>14+ years of experience in foreign currency</li>
              <li>Thousands of satisfied customers across Australasia</li>
              <li>Secure ordering and reliable delivery</li>
              <li>Transparency and compliance in every transaction</li>
            </ul>
          </section>
        </div>
      </section>
    </MainLayout>
  );
}
