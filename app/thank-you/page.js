// app/thank-you/page.jsx
"use client";
import { buildLoginUrl } from "../lib/auth"; // adjust path if needed

export default function ThankYouPage() {
  const ordersUrl = buildLoginUrl("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-3">✅ Thank you!</h1>
        <p className="text-gray-700">Your order has been received successfully.</p>
        <p className="text-gray-600 mt-1">We’ll keep you updated.</p>

        <a
          href={ordersUrl}
          className="inline-block mt-6 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          See your orders
        </a>
      </div>
    </div>
  );
}
