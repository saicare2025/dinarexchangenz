"use client";

import {
  ShoppingCartIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  PhoneIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";
import Link from "next/link";

export default function IraqiDinarSection() {
  const dinarPackages = [
    { amount: "25,000 IQD", price: "$186" },
    { amount: "50,000 IQD", price: "$281" },
    { amount: "75,000 IQD", price: "$325" },
    { amount: "100,000 IQD", price: "$381" },
    { amount: "200,000 IQD", price: "$656" },
    { amount: "500,000 IQD", price: "$1875" },
    { amount: "1000,000 IQD", price: "$2800" },
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
        {/* Main Content */}
        <motion.div
          variants={fadeIn("up", "tween", 0.1, 1)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Buy <span className="text-orange-700">Iraqi Dinar</span>
          </h2>
          <p className="text-lg hidden lg:block text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our range of authentic Iraqi Dinar packages. All
            banknotes come with a{" "}
            <span className="font-semibold text-orange-500">
              certificate of authenticity
            </span>
            .
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Column - Table */}
          <div className="lg:w-1/2 flex flex-col">
            <motion.div
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex-grow"
            >
              <div className="overflow-x-auto h-full">
                <table className="min-w-full divide-y divide-gray-200 h-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dinarPackages.map((pkg, index) => (
                      <motion.tr
                        key={index}
                        variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                        whileHover={{
                          backgroundColor: "rgba(249, 250, 251, 1)",
                        }}
                        className="transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {pkg.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-extrabold text-orange-500">
                          {pkg.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link href="/buydinar">
                            <button className="inline-flex items-center gap-2 bg-blue-900 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 group text-sm">
                              <ShoppingCartIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              Order Now
                            </button>
                          </Link>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="lg:w-1/2 flex flex-col gap-6 h-full">
            <motion.div
              variants={fadeIn("left", "tween", 0.4, 1)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex-grow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckBadgeIcon className="w-5 h-5 text-orange-500" />
                Why Buy Dinar Now?
              </h3>
              <p className="text-gray-600 mb-4">
                We guarantee the best rates for buying Iraqi dinar in the
                market. Our prices are constantly updated to reflect the most
                current exchange rates.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Best exchange rates guaranteed
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Instant price quotes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">No hidden fees</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeIn("left", "tween", 0.5, 1)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex-grow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5 text-orange-500" />
                Our Guarantee
              </h3>
              <p className="text-gray-600 mb-4">
                Every dinar note comes with a certificate of authenticity that
                guarantees your currency is genuine and not counterfeit.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    100% authentic Iraqi dinar
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Certificate of authenticity
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Money-back guarantee
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* New CTA Section */}
        <motion.div
          variants={fadeIn("up", "tween", 0.6, 1)}
          className="mt-16 bg-orange-700 rounded-xl p-6 md:p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <GiftIcon className="w-8 h-8 text-orange-200" />
                <h3 className="text-2xl md:text-3xl font-bold">
                  🎁 LIMITED TIME OFFER
                </h3>
              </div>
              <p className="text-lg md:text-xl mb-2">
                Free 20 Billion ZIM with 1 Million IQD orders!
              </p>
              <p className="text-orange-100 mb-4">
                Automatically applied at checkout • While stocks last
              </p>
              <p className="text-sm text-orange-100">
                Limited Stock for 2 Million Plus Orders
                <br />
                Please call us before placing any order of 2 Million and above.
                There might be slight delays in shipping.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:0417460236"
                  className="flex items-center gap-2 bg-white text-orange-700 px-5 py-3 rounded-lg font-semibold hover:bg-orange-100 transition-colors"
                >
                  <PhoneIcon className="w-5 h-5" />
                  Call 0417 460 236
                </a>
                <a
                  href="tel:1300856881"
                  className="flex items-center gap-2 bg-orange-700 border border-white text-white px-5 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  <PhoneIcon className="w-5 h-5" />
                  Call 1300 856 881
                </a>
              </div>
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                Order Now & Claim Your Bonus
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
