"use client";

import { 
  ShieldCheckIcon,
  TruckIcon,
  StarIcon,
  DocumentCheckIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";

export function BuyingDinarNow() {
  const guarantees = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-orange-500" />,
      title: "100% Authentic",
      description: "Every banknote comes with a certificate of authenticity"
    },
    {
      icon: <TruckIcon className="w-8 h-8 text-orange-500" />,
      title: "Secure Shipping",
      description: "All orders shipped securely via NZ Post Registered Mail"
    },
    {
      icon: <StarIcon className="w-8 h-8 text-orange-500" />,
      title: "4.8★ Customer Rating",
      description: "Based on real verified customer reviews"
    },
    {
      icon: <DocumentCheckIcon className="w-8 h-8 text-orange-500" />,
      title: "Certificate of Authenticity",
      description: "Each purchase comes with a certificate"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Main Heading and CTA */}
        <motion.div
          variants={fadeIn("up", "tween", 0.1, 1)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            BUYING DINAR NOW
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We guarantee the best rate for buying Iraqi Dinar
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all"
          >
            Start Your Order
          </motion.button>
        </motion.div>

        {/* Our Guarantee Section */}
        <motion.div 
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="mb-20 bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-orange-500" />
                <h3 className="text-2xl font-bold text-gray-800">OUR GUARANTEE</h3>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                Certificate of authenticity that guarantees the dinars are not counterfeit.
              </p>
              <button className="flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                Learn More <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:w-1/2 bg-orange-100 p-6 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Why Choose Dinar Exchange New Zealand?</h4>
              <p className="text-gray-600">
                We are committed to providing the highest quality service and authentic currency with complete transparency and security.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Guarantee Features */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {guarantees.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-orange-50 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}