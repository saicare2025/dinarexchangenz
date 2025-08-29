// app/about/metadata.js
export const metadata = {
  title: "About Dinar Exchange New Zealand | Trusted Currency Dealer",
  description:
    "Learn more about Dinar Exchange, New Zealand’s trusted source for Iraqi Dinar and Zimbabwe Dollars. Serving customers with integrity since 2010.",

  // Base site URL for absolute URLs
  metadataBase: new URL("https://www.dinarexchange.co.nz"),

  // SEO helpers (no OpenGraph/Twitter as requested)
  keywords: [
    "About Dinar Exchange",
    "Trusted currency dealer NZ",
    "Iraqi Dinar New Zealand",
    "Zimbabwe Dollars New Zealand",
    "IQD NZ",
    "ZIM banknotes NZ",
    "Since 2010"
  ],

  alternates: {
    canonical: "/about",
    languages: {
      "en-NZ": "/about",
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
