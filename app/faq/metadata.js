// app/faqs/FAQJsonLd.jsx
"use client";
import Script from "next/script";

export default function FAQJsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I buy Iraqi Dinar in New Zealand?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Order directly at DinarExchange.co.nz. Select your amount, complete the order form, and pay via New Zealand bank transfer. Once payment is confirmed, we dispatch your Dinar with tracking."
        }
      },
      {
        "@type": "Question",
        "name": "What denominations of Iraqi Dinar do you sell?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We primarily stock 25,000 IQD and 50,000 IQD banknotes. Availability may vary based on supply."
        }
      },
      {
        "@type": "Question",
        "name": "Are the Iraqi Dinar notes genuine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All notes are 100% authentic and include Iraqi Central Bank security features such as watermarks, security threads, and color-shifting ink."
        }
      },
      {
        "@type": "Question",
        "name": "Can I buy Iraqi Dinar with cash in person?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. For security and compliance, orders are processed online with NZ bank transfers only."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum and maximum order amount?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Minimum is typically NZD $500 equivalent. The maximum depends on stock; most customers purchase between NZD $500 and $10,000 equivalent."
        }
      },
      {
        "@type": "Question",
        "name": "Can I sell my Iraqi Dinar back to you?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Email us with quantity, denomination, and clear photos. We will confirm the buy-back rate and provide shipping instructions."
        }
      },
      {
        "@type": "Question",
        "name": "What denominations do you accept when buying back?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We currently accept 25,000 and 50,000 IQD notes only."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to get paid after selling my Dinar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After we receive and verify your notes, payment is made to your NZ bank account within 3–5 business days."
        }
      },
      {
        "@type": "Question",
        "name": "Can I buy Zimbabwe Dollar notes in New Zealand?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We sell collectible Zimbabwe banknotes (ZIM notes) popular with collectors and investors."
        }
      },
      {
        "@type": "Question",
        "name": "What Zimbabwe Dollar denominations are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Stock varies, but commonly includes 100 Trillion, 50 Trillion, and 10 Trillion ZIM notes."
        }
      },
      {
        "@type": "Question",
        "name": "Are Zimbabwe Dollars legal tender?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "They are no longer circulating legal tender in Zimbabwe; they are sold as collectible currency worldwide."
        }
      },
      {
        "@type": "Question",
        "name": "What payment methods do you accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accept New Zealand bank transfers only. This keeps transactions secure and compliant."
        }
      },
      {
        "@type": "Question",
        "name": "Do you accept credit cards, PayPal, or crypto payments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. For fraud prevention and compliance reasons, we only accept NZ bank transfers."
        }
      },
      {
        "@type": "Question",
        "name": "Is my order secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Orders are processed under strict compliance checks, details are kept confidential, and shipments are securely packaged and tracked."
        }
      },
      {
        "@type": "Question",
        "name": "How long does delivery take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once payment clears (usually within 1–2 business days), delivery within New Zealand typically takes 7–9 business days."
        }
      },
      {
        "@type": "Question",
        "name": "How will my order be shipped?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Via secure tracked courier services (e.g., NZ Post or similar). A tracking link is provided after dispatch."
        }
      },
      {
        "@type": "Question",
        "name": "Do you ship internationally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. We serve customers within New Zealand only. Australian customers can use DinarExchange.com.au."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if my package is delayed or lost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every order has tracking. If issues arise, we liaise with the courier until resolved and keep you updated."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know the notes are real?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Notes include visible security features like watermarks, security threads, and color-shifting ink. You can verify with light and UV checks."
        }
      },
      {
        "@type": "Question",
        "name": "Will the Iraqi Dinar revalue (RV)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Future exchange rates cannot be predicted. We do not guarantee or provide financial advice on potential revaluation."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide updates on the Dinar revaluation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend following reliable financial news. We do not publish speculative RV timelines."
        }
      },
      {
        "@type": "Question",
        "name": "Is it legal to buy Iraqi Dinar in New Zealand?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Buying and selling physical foreign currency is legal in New Zealand when compliant with financial regulations."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need ID to purchase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For larger orders, we may request government-issued ID to meet AML requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any taxes on buying or selling Dinar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We do not charge GST on banknote sales. Future profits may have personal tax implications—please consult a tax advisor."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.dinarexchange.co.nz/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "FAQs",
        "item": "https://www.dinarexchange.co.nz/faqs"
      }
    ]
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema-faqs"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
