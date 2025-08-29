"use client";

import MainLayout from "../MainLayout";
import FAQJsonLd from "./metadata";

export default function FAQPage() {
  // -------------------------------
  // FAQ CONTENT (exact text)
  // -------------------------------
  const buyingIQD = [
    {
      q: "How can I buy Iraqi Dinar in New Zealand?",
      a: "You can order directly through our website at DinarExchange.co.nz. Simply select the amount you want, complete the order form, and transfer payment via New Zealand bank transfer. Once payment is confirmed, we dispatch your Dinar with tracking.",
    },
    {
      q: "What denominations of Iraqi Dinar do you sell?",
      a: "We primarily stock 25,000 IQD and 50,000 IQD banknotes. These are the most common and widely accepted denominations. Availability may vary based on supply from Iraq’s central distribution.",
    },
    {
      q: "Are the Iraqi Dinar notes genuine?",
      a: "Yes. All our banknotes are 100% authentic, sourced through licensed suppliers. Every note comes with standard Iraqi Central Bank security features such as watermarks, security threads, and color-shifting ink.",
    },
    {
      q: "Can I buy Iraqi Dinar with cash in person?",
      a: "No, we currently only process orders online with NZ bank transfers. For security and compliance reasons, all transactions must go through the website.",
    },
    {
      q: "What is the minimum and maximum order amount?",
      a: "The minimum order is typically NZD $500 equivalent. The maximum depends on our available stock, but most customers purchase between NZD $500 – $10,000 equivalent.",
    },
  ];

  const sellingIQD = [
    {
      q: "Can I sell my Iraqi Dinar back to you?",
      a: "Yes. To sell, simply email us with the quantity, denomination, and clear photos of your notes. Our team will confirm the buy-back rate and provide shipping instructions.",
    },
    {
      q: "What denominations do you accept when buying back?",
      a: "We only accept 25,000 and 50,000 Iraqi Dinar notes at this time. Other denominations are not currently eligible for buy-back.",
    },
    {
      q: "How long does it take to get paid after selling my Dinar?",
      a: "Once we receive and verify your notes, payment is made to your nominated NZ bank account within 3–5 business days.",
    },
  ];

  const zimFAQs = [
    {
      q: "Can I buy Zimbabwe Dollar notes in New Zealand?",
      a: "Yes, we sell collectible Zimbabwe banknotes (commonly called ZIM notes). These are popular for collectors and investors interested in potential currency revaluation.",
    },
    {
      q: "What ZIM denominations are available?",
      a: "We usually stock high-denomination notes, such as 100 Trillion ZIM, 50 Trillion ZIM, and 10 Trillion ZIM notes, depending on supply.",
    },
    {
      q: "Are Zimbabwe Dollars legal tender?",
      a: "Zimbabwe notes are no longer circulating legal tender in Zimbabwe, but they are sold as collectible currency worldwide.",
    },
  ];

  // Grouped under “Shipping & Payments” (with h3 subsections)
  const paymentsSecurity = [
    {
      q: "What payment methods do you accept?",
      a: "Currently, we accept New Zealand bank transfers only. This ensures secure, traceable transactions for compliance and customer protection.",
    },
    {
      q: "Do you accept credit cards, PayPal, or crypto payments?",
      a: "No, not at this time. For fraud prevention and compliance reasons, we only use bank transfers.",
    },
    {
      q: "Is my order secure?",
      a: "Yes. All orders are processed under strict compliance checks. Customer details remain confidential, and all shipments are securely packaged and tracked.",
    },
  ];

  const shippingDelivery = [
    {
      q: "How long does delivery take?",
      a: "Orders are dispatched once payment clears (usually within 1–2 business days). Delivery within New Zealand typically takes 7–9 business days, depending on your location and courier schedules.",
    },
    {
      q: "How will my order be shipped?",
      a: "We use secure tracked courier services (NZ Post or similar). You will receive a tracking link once your order is shipped so you can follow progress.",
    },
    {
      q: "Do you ship internationally?",
      a: "No, we only serve customers within New Zealand. For customers in Australia, please visit our Australian site (DinarExchange.com.au).",
    },
    {
      q: "What happens if my package is delayed or lost?",
      a: "While delays are rare, we provide full tracking for every order. If an issue arises, we work directly with the courier to resolve it. Customers are kept updated until delivery is completed.",
    },
  ];

  const authenticityReval = [
    {
      q: "How do I know the notes are real?",
      a: "All banknotes come with visible security features. Customers can verify them by holding notes up to light to see watermarks, using UV light, and checking the color-changing ink.",
    },
    {
      q: "Will the Iraqi Dinar revalue (RV)?",
      a: "No one can predict the future exchange rate or an RV with certainty. While many investors believe in the possibility of a revaluation, Dinar Exchange does not guarantee or provide financial advice regarding future currency values.",
    },
    {
      q: "Do you provide updates on the Dinar revaluation?",
      a: "We recommend following reliable news sources in Iraq and international financial updates. We do not provide speculative RV timelines.",
    },
  ];

  const complianceLegal = [
    {
      q: "Is it legal to buy Iraqi Dinar in New Zealand?",
      a: "Yes, buying and selling physical foreign currency is legal in New Zealand, provided it complies with financial regulations.",
    },
    {
      q: "Do I need ID to purchase?",
      a: "For large orders, we may request a copy of government-issued ID to comply with Anti-Money Laundering (AML) regulations.",
    },
    {
      q: "Are there any taxes on buying or selling Dinar?",
      a: "We do not charge GST on banknote sales. However, any future profits from selling currency may be subject to personal tax obligations depending on your situation. Please consult a tax advisor.",
    },
  ];

  // Build JSON-LD from the arrays above (ensures exact parity with on-page text)
  const allFaqs = [
    ...buyingIQD,
    ...sellingIQD,
    ...zimFAQs,
    ...paymentsSecurity,
    ...shippingDelivery,
    ...authenticityReval,
    ...complianceLegal,
  ];

  const Card = ({ children }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8 shadow-lg">
      {children}
    </div>
  );

  const QA = ({ q, a }) => (
    <details className="group rounded-lg border border-gray-100 p-4 md:p-5 hover:bg-gray-50 transition-colors">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">
          {q}
        </h3>
        <span className="mt-1 inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-orange text-white transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-3 text-gray-700">{a}</p>
    </details>
  );

  return (
    <MainLayout>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-100 to-orange-100">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue to-orange-900 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
              Clear answers about buying & selling Iraqi Dinar (IQD) and
              Zimbabwe Dollar (ZIM) notes in New Zealand — plus shipping,
              payments, authenticity, and compliance.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#buying-iqd"
              className="rounded-full bg-white border border-orange text-gray-900 px-4 py-2 hover:bg-orange hover:text-white transition-colors"
            >
              Buying Iraqi Dinar in NZ
            </a>
            <a
              href="#selling-iqd"
              className="rounded-full bg-white border border-orange text-gray-900 px-4 py-2 hover:bg-orange hover:text-white transition-colors"
            >
              Selling Iraqi Dinar in NZ
            </a>
            <a
              href="#zim-faqs"
              className="rounded-full bg-white border border-orange text-gray-900 px-4 py-2 hover:bg-orange hover:text-white transition-colors"
            >
              Zimbabwe Dollar FAQs
            </a>
            <a
              href="#shipping-payments"
              className="rounded-full bg-white border border-orange text-gray-900 px-4 py-2 hover:bg-orange hover:text-white transition-colors"
            >
              Shipping & Payments
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-8 space-y-12 md:space-y-16">
        {/* H2: Buying Iraqi Dinar in NZ */}
        <section id="buying-iqd" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Buying Iraqi Dinar in NZ
          </h2>
          <Card>
            <div className="space-y-4 md:space-y-5">
              {buyingIQD.map((item, i) => (
                <QA key={`buy-${i}`} q={item.q} a={item.a} />
              ))}
            </div>
          </Card>
        </section>

        {/* H2: Selling Iraqi Dinar in NZ */}
        <section id="selling-iqd" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Selling Iraqi Dinar in NZ
          </h2>
          <Card>
            <div className="space-y-4 md:space-y-5">
              {sellingIQD.map((item, i) => (
                <QA key={`sell-${i}`} q={item.q} a={item.a} />
              ))}
            </div>
          </Card>
        </section>

        {/* H2: Zimbabwe Dollar FAQs */}
        <section id="zim-faqs" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Zimbabwe Dollar FAQs
          </h2>
          <Card>
            <div className="space-y-4 md:space-y-5">
              {zimFAQs.map((item, i) => (
                <QA key={`zim-${i}`} q={item.q} a={item.a} />
              ))}
            </div>
          </Card>
        </section>

        {/* H2: Shipping & Payments */}
        <section id="shipping-payments" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Shipping &amp; Payments
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Payments & Security */}
            <Card>
              <h3 className="text-lg md:text-xl font-semibold text-blue mb-4">
                Payments &amp; Security
              </h3>
              <div className="space-y-4 md:space-y-5">
                {paymentsSecurity.map((item, i) => (
                  <QA key={`pay-${i}`} q={item.q} a={item.a} />
                ))}
              </div>
            </Card>

            {/* Shipping & Delivery */}
            <Card>
              <h3 className="text-lg md:text-xl font-semibold text-blue mb-4">
                Shipping &amp; Delivery
              </h3>
              <div className="space-y-4 md:space-y-5">
                {shippingDelivery.map((item, i) => (
                  <QA key={`ship-${i}`} q={item.q} a={item.a} />
                ))}
              </div>
            </Card>

            {/* Currency Authenticity & Revaluation */}
            <Card>
              <h3 className="text-lg md:text-xl font-semibold text-blue mb-4">
                Currency Authenticity &amp; Revaluation
              </h3>
              <div className="space-y-4 md:space-y-5">
                {authenticityReval.map((item, i) => (
                  <QA key={`auth-${i}`} q={item.q} a={item.a} />
                ))}
              </div>
            </Card>

            {/* Compliance & Legal */}
            <Card>
              <h3 className="text-lg md:text-xl font-semibold text-blue mb-4">
                Compliance &amp; Legal
              </h3>
              <div className="space-y-4 md:space-y-5">
                {complianceLegal.map((item, i) => (
                  <QA key={`law-${i}`} q={item.q} a={item.a} />
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>
      <FAQJsonLd />
    </MainLayout>
  );
}
