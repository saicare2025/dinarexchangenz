"use client";

import { motion } from "framer-motion";
import MainLayout from "../MainLayout";
import ReviewsWidget from "../../components/ReviewsWidget";
import { FiStar, FiQuote } from "react-icons/fi";

export default function TestimonialsPage() {
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
