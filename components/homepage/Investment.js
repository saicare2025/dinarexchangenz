"use client";

import {
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  FireIcon,
  ArrowPathIcon,
  MapPinIcon,
  DocumentCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";
import currency from "../../app/assets/currency.png";
import Image from "next/image";
import heroImage from "../../app/assets/dinar2.png";
import Link from "next/link";

export function InvestmentOpportunity() {
  return (
    <section className="pt-4 bg-gradient-to-r from-blue-100 to-orange-100 overflow-x-hidden">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
      >
        {/* Dinar Exchange Offers */}
        <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="mb-8">
          <div className="flex flex-col items-center gap-8 w-full">
            {/* Content Section */}
            <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="w-full">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                  Trusted <span className="text-orange-700">Currency Exchange</span>
                </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  When buying Iraqi Dinar online, trust is paramount. Dinar
                  Exchange is one of the largest and most experienced companies
                  in the market.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row items-stretch gap-6 md:gap-8 w-full">
                {/* Content Card */}
                <motion.div
                  variants={staggerContainer(0.1, 0.2)}
                  className="lg:w-1/2 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col w-full"
                >
                  <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 md:mb-6">
                      Why Choose Dinar Exchange
                    </h3>
                    <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                      Experience the difference with our professional currency
                      exchange services. We provide authentic Iraqi Dinar and
                      Zimbabwe Dollar notes with guaranteed delivery and
                      exceptional customer service.
                    </p>

                    <div className="space-y-4 md:space-y-6">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="p-2 bg-green-100 rounded-lg text-green-600 flex-shrink-0">
                          <ShieldCheckIcon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-gray-800">
                            100% Authentic Currency
                          </h4>
                          <p className="text-gray-500 mt-1 text-sm md:text-base">
                            Certified banknotes with authenticity guarantee
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600 flex-shrink-0">
                          <DocumentCheckIcon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-gray-800">
                            ASIC & AUSTRAC Registered
                          </h4>
                          <p className="text-gray-500 mt-1 text-sm md:text-base">
                            Fully compliant with financial regulations
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600 flex-shrink-0">
                          <LockClosedIcon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-gray-800">
                            Secure Payment Methods
                          </h4>
                          <p className="text-gray-500 mt-1 text-sm md:text-base">
                            Encrypted transactions for your safety
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Image Section */}
                <motion.div
                  variants={fadeIn("left", "tween", 0.3, 1)}
                  className="lg:w-1/2 rounded-xl overflow-hidden shadow-lg w-full"
                >
                  <div className="relative h-64 md:h-80 lg:h-full w-full">
                    <Image
                      src={currency}
                      alt="Trusted Currency Exchange"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Invest Section */}
        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          className="mb-8 bg-white rounded-2xl overflow-hidden w-full"
        >
          <div className="p-6 md:p-8 flex flex-col lg:flex-row items-center w-full">
            <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pr-6 w-full">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Why Invest in Iraqi Dinar?
              </h2>
              <div className="space-y-3 md:space-y-4">
                <p className="text-gray-700 text-sm md:text-base">
                  The Iraqi Dinar represents one of the most significant
                  investment opportunities of this decade. Historically valued
                  at US $3.20 per dinar, with Iraq&apos;s oil reserves exceeding
                  $11.6 trillion.
                </p>
                <p className="text-gray-700 text-sm md:text-base">
                  Current market indicators suggest a substantial potential
                  appreciation. As oil prices fluctuate, the dinar&apos;s value
                  stands to benefit significantly from Iraq&apos;s increasing
                  production capacity.
                </p>
                <p className="text-gray-700 font-medium text-sm md:text-base">
                  Investing in Dinar today could secure your financial future
                  with potentially substantial long-term returns.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 bg-orange-100 p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 w-full">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <FireIcon className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  Market Potential
                </h3>
              </div>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-2 md:gap-3">
                  <ArrowTrendingUpIcon className="w-4 h-4 md:w-5 md:h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base">Historic high value of $3.20 per dinar</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <CurrencyDollarIcon className="w-4 h-4 md:w-5 md:h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base">$11.6 trillion in proven oil reserves</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <ArrowPathIcon className="w-4 h-4 md:w-5 md:h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base">Increasing oil production capacity</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <MapPinIcon className="w-4 h-4 md:w-5 md:h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base">Strategic geopolitical position</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={fadeIn("up", "tween", 0.5, 1)}
          className="bg-blue-900 rounded-2xl overflow-hidden w-full"
        >
          <div className="flex flex-col md:flex-row w-full">
            {/* Image Section */}
            <div className="md:w-1/2 h-full">
              <div className="relative h-64 sm:h-80 md:h-96 w-full">
                <Image
                  src={heroImage}
                  alt="Iraqi Dinar currency"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-blue-900/20"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center w-full">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
                Embark on Your Iraqi Dinar Journey
              </h2>
              <p className="text-gray-300 max-w-lg mb-6 md:mb-8 text-sm md:text-base lg:text-lg">
                Whether you&apos;re exchanging currency or staying updated on
                revaluation news, we provide all the tools and resources you
                need for successful dinar investment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/buydinar" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-orange-700 hover:bg-orange-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg flex items-center justify-center gap-2 transition-all w-full text-sm md:text-base"
                  >
                    <CurrencyDollarIcon className="w-4 h-4 md:w-5 md:h-5" />
                    Buy Iraqi Dinars
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}