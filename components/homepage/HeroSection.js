"use client";

import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiStar,
  FiTruck,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

import Image from "next/image";
import heroImage from "../../app/assets/dinar.png";
import { FloatingTestimonial } from "./HeroTestmonial";
import { FloatingCallButton } from "./FloatingCall";
import Link from "next/link";

export default function HeroSection() {
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
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-100 to-orange-100 py-8 px-4">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex flex-col"
          >
            <div className="flex-grow">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                <span className="bg-blue-900 bg-clip-text text-transparent">
                  Dinar Exchange
                </span>{" "}
                <span className="text-gray-800">New Zealand</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-600 font-medium mb-6">
                Your Premier Hub for{" "}
                <span className="text-orange-600">Iraqi Dinar</span>{" "}
                Transactions
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Your reliable partner for secure Iraqi Dinar transactions.
                Trusted by investors and collectors nationwide with competitive
                rates and guaranteed authenticity.
              </p>

              <div className="flex flex-wrap gap-4 ">
                <Link href="/buydinar">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden group bg-gradient-to-r from-orange-700 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Buy Dinars Now{" "}
                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px] rounded-2xl overflow-hidden shadow-xl border-1 border-orange-100">
              <Image
                src={heroImage}
                alt="Iraqi Dinar currency"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 80vw, 50vw"
              />
            </div>
          </motion.div>
        </div>

        {/* Features Grid - Positioned at bottom spanning both columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-center text-lg lg:text-xl">
                    {feature.text}
                  </h3>
                  <p className="text-gray-600 text-sm text-center lg:text-base">
                    {feature.subtext}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <FloatingTestimonial />
      <FloatingCallButton />
    </section>
  );
}
