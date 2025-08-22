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
        {/* Preconnect to external domains for faster connections */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://static.vecteezy.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://static.vecteezy.com" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />

        {enableAnalytics && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: true });
              `}
            </Script>

            {/* 👇 This is the key */}
            <Suspense fallback={null}>
              <GAListener />
            </Suspense>
          </>
        )}
      </body>
    </html>
  );
}
