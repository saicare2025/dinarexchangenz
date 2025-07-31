"use client";

import {
  
  ArrowRightIcon,
  CurrencyDollarIcon,
  ChartBarIcon,

  AcademicCapIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";

export function BuyingDinarNow() {
  const services = [
    {
      icon: <CurrencyDollarIcon className="w-8 h-8 text-orange-500" />,
      title: "Effortless Conversions",
      description: "Convert AUD to Iraqi dinars with precision through our exchange process",
      emoji: "💱"
    },
    {
      icon: <ChartBarIcon className="w-8 h-8 text-orange-500" />,
      title: "Market Insights",
      description: "Regularly updated dinar value information and market trends",
      emoji: "📊"
    },
    {
      icon: <ArrowTrendingUpIcon className="w-8 h-8 text-orange-500" />,
      title: "Revaluation Updates",
      description: "Expert analysis on Iraqi Dinar revaluation prospects",
      emoji: "📈"
    },
    {
      icon: <AcademicCapIcon className="w-8 h-8 text-orange-500" />,
      title: "Educational Resources",
      description: "Comprehensive guides for informed dinar investment decisions",
      emoji: "🎓"
    }
  ];

  return (
    <motion.section
      variants={fadeIn("up", "tween", 0.1, 1)}
      className="py-8 bg-gradient-to-r from-blue-100 to-orange-100"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Our Comprehensive <span className="text-orange-800">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need for successful Iraqi Dinar transactions
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-orange-50 rounded-lg">
                  {service.icon}
                </div>
                <span className="text-2xl">{service.emoji}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                {service.description}
              </p>
              <div className="mt-auto">
                <button className="inline-flex items-center text-orange-600 font-medium group">
                  Learn more
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeIn("up", "tween", 0.5, 1)}
          className="mt-16 text-center"
        >
          <button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-3.5 px-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center">
            Explore All Services
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}