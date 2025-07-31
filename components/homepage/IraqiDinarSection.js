"use client";

import {
  ShoppingCartIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";

export default function IraqiDinarSection() {
  const dinarPackages = [
    { amount: "25,000 IQD", price: "$70.00 AUD", value: 70 },
    { amount: "50,000 IQD", price: "$140.00 AUD", value: 140 },
    { amount: "75,000 IQD", price: "$210.00 AUD", value: 210 },
    { amount: "100,000 IQD", price: "$280.00 AUD", value: 280 },
    { amount: "200,000 IQD", price: "$560.00 AUD", value: 560 },
    { amount: "300,000 IQD", price: "$840.00 AUD", value: 840 },
    { amount: "400,000 IQD", price: "$1,120.00 AUD", value: 1120 },
    { amount: "500,000 IQD", price: "$1,400.00 AUD", value: 1400 },
  ];

  return (
    <section className="py-8 bg-gradient-to-r from-blue-100 to-orange-100">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={fadeIn("up", "tween", 0.1, 1)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Explore Our <span className="text-orange-800">Popular Packages</span>
          </h2>
          <p className="text-lg hidden lg:block text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our range of authentic Iraqi Dinar packages. All banknotes come with a <span className="font-semibold text-orange-500">certificate of authenticity</span>.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <motion.div
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dinarPackages.map((pkg, index) => (
                      <motion.tr
                        key={index}
                        variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                        whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                        className="transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{pkg.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-extrabold text-orange-500">{pkg.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="inline-flex items-center gap-2 bg-blue-900 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 group text-sm">
                            <ShoppingCartIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Order Now
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/3 space-y-6">
            <motion.div
              variants={fadeIn("left", "tween", 0.4, 1)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckBadgeIcon className="w-5 h-5 text-orange-500" />
                Why Buy Dinar Now?
              </h3>
              <p className="text-gray-600 mb-4">
                We guarantee the best rates for buying Iraqi dinar in the market. Our prices are constantly updated to reflect the most current exchange rates.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">Best exchange rates guaranteed</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">Instant price quotes</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">No hidden fees</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeIn("left", "tween", 0.5, 1)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5 text-orange-500" />
                Our Guarantee
              </h3>
              <p className="text-gray-600 mb-4">
                Every dinar note comes with a certificate of authenticity that guarantees your currency is genuine and not counterfeit.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">100% authentic Iraqi dinar</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">Certificate of authenticity</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">Money-back guarantee</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}