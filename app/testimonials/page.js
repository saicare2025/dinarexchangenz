"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
import ReviewsWidget from "../../components/ReviewsWidget";
import { FiStar, FiQuote } from "react-icons/fi";

export default function TestimonialsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const handleWidgetLoaded = () => {
      // Add a small delay to ensure the widget is fully rendered
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    const handleWidgetError = () => {
      setLoadError(true);
      setIsLoading(false);
    };

    // Listen for widget load events
    window.addEventListener('reviewsWidgetLoaded', handleWidgetLoaded);
    window.addEventListener('reviewsWidgetError', handleWidgetError);

    // Fallback: hide loading after 3 seconds if no event is received
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      window.removeEventListener('reviewsWidgetLoaded', handleWidgetLoaded);
      window.removeEventListener('reviewsWidgetError', handleWidgetError);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-orange"></div>
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
      <div>
        {/* Live Reviews Widget Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Live <span className="text-orange">Customer Reviews</span> 
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Real-time reviews from our customers across New Zealand
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 shadow-lg"
            >
              <ReviewsWidget />
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
