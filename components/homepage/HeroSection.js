"use client";

import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiStar,
  FiTruck,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";
import { FloatingTestimonial } from "./HeroTestmonial";
import { FloatingCallButton } from "./FloatingCall";

export default function HeroSection() {
const exchangeRates = [
  { amount: "10,000 IQD", rate: "9.77 AUD" },
  { amount: "50,000 IQD", rate: "48.83 AUD" },
  { amount: "100,000 IQD", rate: "97.65 AUD" },
  { amount: "250,000 IQD", rate: "243.14 AUD" },
  { amount: "500,000 IQD", rate: "486.75 AUD" },
  { amount: "1,000,000 IQD", rate: "973.50 AUD" },
];


  const features = [
    {
      icon: <FiCheckCircle className="w-5 h-5" />,
      text: "100% Authentic",
      subtext: "Certificate with every order",
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      text: "4.8★ Rated",
      subtext: "Verified customer reviews",
    },
    {
      icon: <FiTruck className="w-5 h-5" />,
      text: "NZ Post Registered",
      subtext: "Secure delivery nationwide",
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      text: "10+ Years",
      subtext: "Trusted currency specialists",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-100 to-orange-100 py-8 lg:py-20 px-4">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="mb-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-full">
                TRUSTED CURRENCY EXCHANGE
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              <span className="bg-blue-900 bg-clip-text text-transparent">
                Dinar Exchange
              </span>{" "}
              <span className="text-gray-800">New Zealand</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 font-medium mb-6">
              Your Premier Hub for{" "}
              <span className="text-orange-600">Iraqi Dinar</span> Transactions
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Your reliable partner for secure Iraqi Dinar transactions. Trusted
              by investors and collectors nationwide with competitive rates and
              guaranteed authenticity.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden group bg-gradient-to-r from-orange-800 to-orange-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Buy Dinars Now{" "}
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-orange-600 hover:text-orange-700 border-2 border-orange-100 hover:border-orange-200 px-8 py-4 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                View Pricing
              </motion.button>
            </div>
          </motion.div>

          {/* Right Content - Exchange Rates */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-blue-900 p-5 text-white">
                <h2 className="text-2xl text-orange font-bold mb-1">Live Exchange Rates</h2>
                <p className="text-orange-100 opacity-90">
                  Iraqi Dinar to New Zealand Dollar
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-2 p-4 bg-gray-50">
                  <div className="font-semibold text-gray-700">
                    Amount (IQD)
                  </div>
                  <div className="font-semibold text-gray-700 text-right">
                    Equivalent (NZD)
                  </div>
                </div>

                {exchangeRates.map((rate, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.5 }}
                    className="grid grid-cols-2 p-4 hover:bg-gray-50/50 transition-colors group"
                  >
                    <div className="font-medium text-gray-800 group-hover:text-orange-600 transition-colors">
                      {rate.amount}
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-orange-600">
                        {rate.rate}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">≈</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-50 p-4 text-center">
                <div className="inline-flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <FloatingTestimonial />
       <FloatingCallButton />
    </section>
  );
}
