// app/contact/metadata.js
export const metadata = {
  title: "Contact Dinar Exchange New Zealand | Get Support",
  description:
    "Have questions about buying or selling Iraqi Dinar or Zimbabwe Dollars? Contact Dinar Exchange today for fast and reliable support.",

  // Base site URL for absolute links
  metadataBase: new URL("https://www.dinarexchange.co.nz"),

  // SEO helpers (no OpenGraph/Twitter)
  keywords: [
    "Contact Dinar Exchange",
    "Dinar Exchange support",
    "Iraqi Dinar help NZ",
    "Zimbabwe Dollar help NZ",
    "Currency dealer New Zealand",
    "Buy IQD NZ",
    "Buy ZIM notes NZ"
  ],

  alternates: {
    canonical: "/contact",
    languages: {
      "en-NZ": "/contact",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};
