// app/testimonials/metadata.js
export const metadata = {
  title: "Customer Reviews | Dinar Exchange New Zealand",
  description:
    "See what our customers in New Zealand say about buying and selling Iraqi Dinar and Zimbabwe Dollars with Dinar Exchange.",

  // Base site URL
  metadataBase: new URL("https://www.dinarexchange.co.nz"),

  // SEO helpers (no OpenGraph/Twitter as requested)
  keywords: [
    "Dinar Exchange reviews",
    "Customer reviews New Zealand",
    "Iraqi Dinar reviews NZ",
    "Zimbabwe Dollar reviews NZ",
    "Dinar Exchange testimonials",
    "Dinar Exchange ratings"
  ],

  alternates: {
    canonical: "/testimonials",
    languages: {
      "en-NZ": "/testimonials",
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
