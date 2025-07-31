"use client";

import { PhoneIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";

export default function IraqiDinarSection() {
  const dinarPackages = [
    { amount: "25,000 IQD", price: "$186", popular: false },
    { amount: "50,000 IQD", price: "$281", popular: false },
    { amount: "75,000 IQD", price: "$325", popular: true },
    { amount: "100,000 IQD", price: "$381", popular: false },
    { amount: "200,000 IQD", price: "$656", popular: false },
    { amount: "500,000 IQD", price: "$1,875", popular: false },
    { amount: "1,000,000 IQD", price: "$2,800", popular: false },
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
        {/* Section Header */}
        <motion.div
          variants={fadeIn("up", "tween", 0.1, 1)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Buy Iraqi Dinars
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our range of authentic Iraqi Dinar packages. All
            banknotes come with a{" "}
            <span className="font-semibold text-orange-500">
              certificate of authenticity
            </span>
            .
          </p>
        </motion.div>

        {/* Dinar Packages Grid */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {dinarPackages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              whileHover={{ y: -5 }}
              className={`relative bg-white border-2 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                pkg.popular
                  ? "ring-2 ring-orange-500 border-orange-500"
                  : "border-gray-100"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold px-4 py-2 rounded-bl-xl shadow-md">
                  Most Popular
                </div>
              )}
              <div className="p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {pkg.amount}
                  </h3>
                  <p className="text-3xl font-extrabold text-orange-500 mb-6">
                    {pkg.price}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      USD
                    </span>
                  </p>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 group">
                  <ShoppingCartIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Order Now</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          variants={fadeIn("up", "tween", 0.6, 1)}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-6 text-lg">
            All prices include worldwide shipping and insurance
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            View All Currency Packages
          </button>
        </motion.div>
      </motion.div>
      {/* Promotional Banner */}
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-16 max-w-7xl mx-auto bg-gradient-to-r from-amber-100 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-sm"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <span className="bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                🎁 LIMITED TIME OFFER
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Free 20 Billion ZIM with 1 Million IQD orders!
            </h3>
            <p className="text-gray-700">
              Automatically applied at checkout • While stocks last
            </p>
            <p className="text-sm text-gray-600 mt-3">
              Limited Stock for 2 Million Plus Orders. Please call us before
              placing any order of 2 Million and above.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
            <a
              href="tel:0417460236"
              className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>0417 460 236</span>
            </a>
            <a
              href="tel:1300856881"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>1300 856 881</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
