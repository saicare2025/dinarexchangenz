"use client";

import { CheckCircleIcon, LightBulbIcon, ScaleIcon, ChartBarIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";

export function WhyChooseUs() {
  const features = [
    {
      icon: <ScaleIcon className="w-8 h-8 text-orange-500" />,
      title: "Transparency at its Core",
      description: "Our commitment to transparency ensures that every transaction is precise, reliable, and aligned with your expectations."
    },
    {
      icon: <ChartBarIcon className="w-8 h-8 text-orange-500" />,
      title: "Reliable Updates",
      description: "Stay ahead of the curve with reliable updates on the Iraqi Dinar revaluation and broader market trends."
    },
    {
      icon: <LightBulbIcon className="w-8 h-8 text-orange-500" />,
      title: "Expert Guidance",
      description: "Access expert insights and guidance from seasoned professionals in the field."
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8 text-orange-500" />,
      title: "Local Expertise",
      description: "Dinar Exchange is a local company assisting customers all over New Zealand to secure Iraqi Dinars safely and securely."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          variants={fadeIn("up", "tween", 0.1, 1)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Why Choose Dinar Exchange <span className="text-orange">New Zealand?</span> 
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide trusted currency exchange services with a commitment to excellence and customer satisfaction.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              className="bg-gradient-to-r from-amber-100 to-orange-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-3 bg-orange-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        {/* <motion.div
          variants={fadeIn("up", "tween", 0.4, 1)}
          className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-6 p-6 bg-gradient-to-r from-amber-100 to-orange-50 border border-amber-200 rounded-xl shadow-sm "
        >
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ready to invest with confidence?</h3>
            <p className="text-gray-600 max-w-xl">Our team is available to answer all your questions about Iraqi Dinar investments.</p>
          </div>
          <a
            href="tel:1300856881"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg whitespace-nowrap transition-colors flex items-center gap-2"
          >
            <PhoneIcon className="w-5 h-5" />
            <span>Call 1300 856 881</span>
          </a>
        </motion.div> */}
      </motion.div>
    </section>
  );
}