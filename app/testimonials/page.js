"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
import ReviewsWidget from "../../components/ReviewsWidget";
import { FiStar } from "react-icons/fi";
import { QuoteIcon } from "lucide-react";

export default function TestimonialsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const handleWidgetLoaded = () => {
      setTimeout(() => setIsLoading(false), 500);
    };
    const handleWidgetError = () => {
      setLoadError(true);
      setIsLoading(false);
    };

    window.addEventListener("reviewsWidgetLoaded", handleWidgetLoaded);
    window.addEventListener("reviewsWidgetError", handleWidgetError);

    const fallbackTimer = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      window.removeEventListener("reviewsWidgetLoaded", handleWidgetLoaded);
      window.removeEventListener("reviewsWidgetError", handleWidgetError);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-orange" />
            <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-2">
              Loading Reviews
            </h2>
            <p className="text-gray-600">
              Fetching the latest customer testimonials...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (loadError) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Unable to Load Reviews
            </h2>
            <p className="text-gray-600 mb-4">
              We&apos;re having trouble loading the reviews at the moment.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-12 md:pt-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* H1: What Our Customers Say */}
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
              What Our Customers Say
            </h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Real feedback from real buyers across New Zealand.
            </p>
          </motion.header>

          {/* H2: Reviews from Dinar Exchange Customers */}
          <section className="mb-8">
        

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <ReviewsWidget />
            </motion.div>
          </section>

          {/* H2: Trusted by Thousands Across NZ */}
          <section className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Trusted by Thousands Across NZ
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                For 14+ years, customers have chosen us for secure ordering and
                reliable delivery. Our service is built on transparency and
                compliance.
              </p>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <div className="rounded-xl border border-gray-200 p-6 text-center">
                <div className="flex justify-center mb-3">{renderStars(5)}</div>
                <p className="font-semibold text-gray-900">Average 5★ Rating</p>
                <p className="text-gray-600 text-sm mt-1">
                  Consistently excellent feedback
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 p-6 text-center">
                <QuoteIcon className="mx-auto w-6 h-6 text-orange mb-3" />
                <p className="font-semibold text-gray-900">
                  Thousands of Happy Customers
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Across New Zealand &amp; Australasia
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 p-6 text-center">
                <span className="mx-auto block w-6 h-6 mb-3 text-orange">🔒</span>
                <p className="font-semibold text-gray-900">Secure &amp; Compliant</p>
                <p className="text-gray-600 text-sm mt-1">
                  Bank transfers, tracked delivery
                </p>
              </div>
            </div>
          </section>

          {/* H2: Share Your Experience */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Share Your Experience
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                Have you purchased with us? We’d love to hear your thoughts and
                help others shop with confidence.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://www.productreview.com.au/listings/dinar-exchange/write-review"
                  className="bg-orange text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Leave a Review
                </a>
                <a
                  href="mailto:hello@dinarexchange.co.nz?subject=My%20Review%20of%20Dinar%20Exchange"
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Email Your Feedback
                </a>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
