import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { Suspense } from "react";
import GAListener from "./ga-listener";
import ReviewsWidget from "../components/ReviewsWidget";

const inter = Inter({ subsets: ["latin"] });
// app/(site)/metadata.js (homepage)
export const metadata = {
  // Primary, Iraq-focused homepage SEO
  title: "Buy Iraqi Dinar & Zimbabwe Dollar in New Zealand | Dinar Exchange New Zealand",
  description:
    "Order authentic Iraqi Dinar (IQD) and Zimbabwe Dollar in New Zealand with Dinar Exchange. Safe bank transfers, competitive rates, and fast tracked delivery nationwide. Trusted since 2010. Also offering collectible Zimbabwe banknotes.",

  // Base URL for absolute URLs
  metadataBase: new URL("https://www.dinarexchange.co.nz"),

  // Keywords (Iraqi Dinar first; Zimbabwe included secondarily)
  keywords: [
    "Buy Iraqi Dinar NZ",
    "Iraqi Dinar New Zealand",
    "Buy IQD online",
    "IQD notes",
    "Dinar Exchange",
    "Buy Zimbabwe Dollars NZ",
    "ZIM banknotes"
  ],

  // Canonical & language alternates for the homepage
  alternates: {
    canonical: "/",
    languages: {
      "en-NZ": "/",
    },
  },


  // Crawl settings
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

  // Icons
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const isProdDeploy = process.env.VERCEL_ENV === "production";
  const enableAnalytics = Boolean(GA_ID && isProdDeploy);

  return (
    <html lang="en">
      <head>
        {/* Preconnects / DNS-prefetch (non-blocking) */}
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://static.vecteezy.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://static.vecteezy.com" />
        <link rel="preconnect" href="https://cdn.provesrc.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.provesrc.com" />
        <link rel="dns-prefetch" href="https://reviewsonmywebsite.com" />
      </head>
      <body className={inter.className}>
        {children}

        <Toaster position="top-right" />

        {enableAnalytics && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
              crossOrigin="anonymous"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: true });
              `}
            </Script>
            <Suspense fallback={null}>
              <GAListener />
            </Suspense>
          </>
        )}

       
      </body>
    </html>
  );
}
