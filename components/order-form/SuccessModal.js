import React, { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function SuccessModal({ isOpen, onClose }) {
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      router.push("/thank-you");
    }, 1000);
    return () => clearTimeout(t);
  }, [isOpen, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <CheckCircleIcon className="w-12 h-12 mx-auto text-green-500 mb-4" />
        <h3 className="text-xl font-bold mb-4">Order Placed Successfully!</h3>
        <p className="mb-4">Thank you for your order. Your order will be processed within 24–48 hours.</p>
        <p className="mb-6 text-sm text-green-600">A confirmation email with invoice has been sent to your email address.</p>
        <p className="text-gray-500 text-sm">Redirecting...</p>
      </div>
    </div>
  );
}
