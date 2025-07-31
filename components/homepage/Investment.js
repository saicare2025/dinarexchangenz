"use client";

import { 
  ShieldCheckIcon,
  BoltIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  StarIcon,
  HomeModernIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  FireIcon,
  ArrowPathIcon,
  MapPinIcon,
  ArrowRightCircleIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";

export function InvestmentOpportunity() {
  const features = [
    {
      icon: <BoltIcon className="w-8 h-8 text-orange-500" />,
      title: "Instant Ordering Facility",
      description: "Place your order online and receive confirmation immediately"
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-orange-500" />,
      title: "Secure Payment",
      description: "Bank transfer only for maximum security"
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-orange-500" />,
      title: "100% Guaranteed Delivery",
      description: "Timely delivery with full tracking"
    },
    {
      icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-orange-500" />,
      title: "24/7 Customer Service",
      description: "Dedicated support whenever you need it"
    },
    {
      icon: <StarIcon className="w-8 h-8 text-orange-500" />,
      title: "Outstanding Reputation",
      description: "Trusted by thousands of investors"
    },
    {
      icon: <HomeModernIcon className="w-8 h-8 text-orange-500" />,
      title: "Local NZ Company",
      description: "Based in New Zealand serving local investors"
    }
  ];

  return (
    <section className="py-4  bg-white">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Dinar Exchange Offers */}
        <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Dinar <span className="text-orange">Exchange</span> Offers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              When buying Iraqi Dinar online, trust is paramount. Dinar Exchange is one of the largest and most experienced companies in the market.
            </p>
          </div>

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-orange-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Why Invest Section */}
        <motion.div 
          variants={fadeIn("up", "tween", 0.3, 1)}
          className="mb-20 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl overflow-hidden"
        >
          <div className="p-8 md:p-12 lg:flex items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Invest in Iraqi Dinar?
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  The Iraqi Dinar represents one of the most significant investment opportunities of this decade. Historically valued at US $3.20 per dinar, with Iraq&apos;s oil reserves exceeding $11.6 trillion.
                </p>
                <p className="text-gray-700">
                  Current market indicators suggest a substantial potential appreciation. As oil prices fluctuate, the dinar&apos;s value stands to benefit significantly from Iraq&apos;s increasing production capacity.
                </p>
                <p className="text-gray-700 font-medium">
                  Investing in Dinar today could secure your financial future with potentially substantial long-term returns.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <FireIcon className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-800">Market Potential</h3>
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
          className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Embark on Your Iraqi Dinar Journey
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
            Whether you&apos;re exchanging currency or staying updated on revaluation news, we provide all the tools and resources you need for successful dinar investment.
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