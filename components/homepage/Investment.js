"use client";

import {
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  FireIcon,
  ArrowPathIcon,
  MapPinIcon,
  ArrowRightCircleIcon,
  DocumentCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";
import currency from "../../app/assets/currency.png";
import Image from "next/image";

export function InvestmentOpportunity() {
  return (
    <section className="pt-4  bg-gradient-to-r from-blue-100 to-orange-100">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Dinar Exchange Offers */}
        <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left side - Content */}
            <motion.div
              variants={fadeIn("up", "tween", 0.1, 1)}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                  Trusted<span className="text-orange-800"> Currency Exchange</span> 
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  When buying Iraqi Dinar online, trust is paramount. Dinar
                  Exchange is one of the largest and most experienced companies
                  in the market.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row items-stretch gap-8">
                {/* Left side - Content (now with fixed height) */}
                <motion.div
                  variants={staggerContainer(0.1, 0.2)}
                  className="lg:w-1/2 bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col"
                >
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6">
                      Why Choose Dinar Exchange
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Experience the difference with our professional currency
                      exchange services. We provide authentic Iraqi Dinar and
                      Zimbabwe Dollar notes with guaranteed delivery and
                      exceptional customer service.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-green-100 rounded-lg text-green-600">
                          <ShieldCheckIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">
                            100% Authentic Currency
                          </h4>
                          <p className="text-gray-500 mt-1">
                            Certified banknotes with authenticity guarantee
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                          <DocumentCheckIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">
                            ASIC & AUSTRAC Registered
                          </h4>
                          <p className="text-gray-500 mt-1">
                            Fully compliant with financial regulations
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                          <LockClosedIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">
                            Secure Payment Methods
                          </h4>
                          <p className="text-gray-500 mt-1">
                            Encrypted transactions for your safety
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right side - Image */}
                <motion.div
                  variants={fadeIn("left", "tween", 0.3, 1)}
                  className="lg:w-1/2 rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={currency}
                    alt="Trusted Currency Exchange"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Invest Section */}
        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          className="mb-8 bg-white rounded-2xl overflow-hidden"
        >
          <div className="p-8 lg:flex items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Invest in Iraqi Dinar?
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  The Iraqi Dinar represents one of the most significant
                  investment opportunities of this decade. Historically valued
                  at US $3.20 per dinar, with Iraq&apos;s oil reserves exceeding
                  $11.6 trillion.
                </p>
                <p className="text-gray-700">
                  Current market indicators suggest a substantial potential
                  appreciation. As oil prices fluctuate, the dinar&apos;s value
                  stands to benefit significantly from Iraq&apos;s increasing
                  production capacity.
                </p>
                <p className="text-gray-700 font-medium">
                  Investing in Dinar today could secure your financial future
                  with potentially substantial long-term returns.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 bg-orange-100 p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <FireIcon className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-800">
                  Market Potential
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-orange-500 mt-0.5" />
                  <span>Historic high value of $3.20 per dinar</span>
                </li>
                <li className="flex items-start gap-3">
                  <CurrencyDollarIcon className="w-5 h-5 text-orange-500 mt-0.5" />
                  <span>$11.6 trillion in proven oil reserves</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowPathIcon className="w-5 h-5 text-orange-500 mt-0.5" />
                  <span>Increasing oil production capacity</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-orange-500 mt-0.5" />
                  <span>Strategic geopolitical position</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={fadeIn("up", "tween", 0.5, 1)}
          className="bg-blue-900 rounded-t-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Embark on Your Iraqi Dinar Journey
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
            Whether you&apos;re exchanging currency or staying updated on
            revaluation news, we provide all the tools and resources you need
            for successful dinar investment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <CurrencyDollarIcon className="w-5 h-5" />
              Buy Iraqi Dinars
            </button>
            <button className="bg-transparent hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-lg border border-gray-600 flex items-center justify-center gap-2 transition-colors">
              <ArrowRightCircleIcon className="w-5 h-5" />
              Learn More
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
