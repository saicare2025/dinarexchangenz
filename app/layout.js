import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import GAListener from "./ga-listener";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dinar Exchange",
  description: "Dinar Exchange User Panel",
};

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  const isProdDeploy = process.env.VERCEL_ENV === "production";
  const enableAnalytics = Boolean(GA_ID && isProdDeploy);


  return (
    <html lang="en">
      <head>
        {/* Preconnects / DNS-prefetch (non-blocking) */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://static.vecteezy.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://static.vecteezy.com" />
        <link rel="preconnect" href="https://cdn.provesrc.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.provesrc.com" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />

        {/* Google Analytics (lazy, non-blocking) */}
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

        {/* ProveSource (Option B: next/script with lazyOnload) */}
        {/* {enableProveSource && hasMarketingConsent && (
          <>
            <Script id="provesrc-init" strategy="lazyOnload">
              {`
                if (!window.provesrc) {
                  window.provesrc = { dq: [], display: function(){ this.dq.push(arguments); } };
                }
                window._provesrcAsyncInit = function () {
                  window.provesrc.init({ apiKey: "${PROVESOURCE_KEY}", v: "0.0.4" });
                };
              `}
            </Script>
            <Script
              id="provesrc-script"
              src="https://cdn.provesrc.com/provesrc.js"
              strategy="lazyOnload"
              crossOrigin="anonymous"
            />
          </>
        )} */}
      </body>
    </html>
  );
}
