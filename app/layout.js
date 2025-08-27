import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { Suspense } from "react";
import GAListener from "./ga-listener";
import ReviewsWidget from "../components/ReviewsWidget";

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
