"use client";

import { motion } from "framer-motion";
import MainLayout from "../MainLayout";

const AboutPage = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <MainLayout>
      <div className="min-h-screen py-16 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Header */}
          <motion.header 
            variants={item} 
            className="mb-16 text-center relative"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue to-orange rounded-full" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 mt-8">
              About <span className="text-blue">Dinar Exchange</span>{' '}
              <span className="text-orange">New Zealand</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your trusted source for Iraqi Dinars (IQD) and Zimbabwe Dollars (ZWL) 
              across New Zealand and Australia with over a decade of excellence in currency exchange.
            </p>
          </motion.header>

          <div className="space-y-24">
            {/* Our Story & Mission Section */}
            <motion.section
              variants={item}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="relative">
                <div className="absolute -z-10 -left-6 -top-6 w-24 h-24 bg-blue-100 rounded-full opacity-70"></div>
                <div className="absolute -z-10 -right-6 -bottom-6 w-32 h-32 bg-orange-100 rounded-full opacity-70"></div>
                
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 relative">
                  <span className="relative z-10">
                    Our Story & Mission
                    <span className="absolute -bottom-3 left-0 w-32 h-1 bg-gradient-to-r from-blue to-orange rounded-full mt-2"></span>
                  </span>
                </h2>
                
                <div className="space-y-5 text-gray-700 relative z-10">
                  <p className="leading-relaxed">
                    Founded in 2011, Dinar Exchange NZ began with a simple vision: to make collectible 
                    foreign banknotes accessible, secure, and straightforward for enthusiasts across 
                    Australasia. What started as a specialized service has grown into a trusted platform 
                    serving thousands of customers with authentic IQD and ZWL notes.
                  </p>
                  <p className="leading-relaxed">
                    Our mission extends beyond transactions—we&apos;re committed to building a knowledgeable 
                    community of currency collectors. We prioritize authenticity, transparency, and 
                    exceptional customer experience at every step, from your first inquiry to delivery 
                    and beyond.
                  </p>
                </div>
              </div>

              {/* Compliance Card */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-4 lg:p-8 shadow-xl border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue to-orange"></div>
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <svg className="w-8 h-8 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-800">Regulatory Compliance</h3>
                </div>
                
                <ul className="space-y-4">
                  {[
                    { label: "Operating Entity", value: "Oz Trading Group Pty Ltd" },
                    { label: "ABN", value: "82 158 981 787" },
                    { label: "ACN", value: "158 981 787" },
                    { label: "AUSTRAC Enrolment", value: "100311410" },
                  ].map((item, index) => (
                    <li key={index} className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-600 font-medium">{item.label}</span>
                      <span className="text-gray-900 text-sm lg:text-base font-semibold">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.section>

            {/* Why We're Trusted Section */}
            <motion.section
              variants={item}
              className="bg-gradient-to-r from-blue to-blue-700 rounded-2xl p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/20 rounded-full"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                  Why We&apos;re Trusted Across NZ
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Authentic Currencies",
                      desc: "Genuine IQD & ZWL notes sourced through trusted suppliers and verified before dispatch.",
                      icon: "✓"
                    },
                    {
                      title: "Security & Compliance",
                      desc: "Bank-transfer payments, AML/KYC checks when required, and transparent processes.",
                      icon: "🔒"
                    },
                    {
                      title: "Proven Track Record",
                      desc: "14+ years serving collectors with thousands of happy customers across Australasia.",
                      icon: "⭐"
                    },
                    {
                      title: "Transparent Pricing",
                      desc: "No hidden fees—clear rates and straightforward communication every step of the way.",
                      icon: "💲"
                    },
                    {
                      title: "Fast, Tracked Delivery",
                      desc: "Discreet packaging and tracked courier service across New Zealand.",
                      icon: "🚚"
                    },
                    {
                      title: "Expert Support",
                      desc: "NZ-based help from people who know collectible banknotes inside and out.",
                      icon: "👨‍💼"
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -8 }}
                      className="bg-white/95 p-6 rounded-xl shadow-lg border border-white/20 backdrop-blur-sm"
                    >
                      <div className="text-3xl mb-4 text-blue">{card.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{card.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Our Commitment Section */}
            <motion.section variants={item} className="relative">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Our Commitment to Customers
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Guaranteed Authenticity",
                    desc: "Every note is inspected and verified. We do not deal in replicas or copies.",
                    icon: (
                      <svg className="w-10 h-10 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    )
                  },
                  {
                    title: "Clear Communication",
                    desc: "From order confirmation to tracking updates, you'll always know what's happening.",
                    icon: (
                      <svg className="w-10 h-10 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                      </svg>
                    )
                  },
                  {
                    title: "After-Sales Support",
                    desc: "Questions after delivery? We're here to help with storage, resale queries, and more.",
                    icon: (
                      <svg className="w-10 h-10 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                      </svg>
                    )
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center transition-all hover:shadow-xl"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                      {c.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {c.title}
                    </h3>
                    <p className="text-gray-700">{c.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              variants={item}
              className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-10 shadow-lg border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Get In Touch
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md text-center transition-all hover:shadow-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-blue">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                  <a
                    href="mailto:dinars@dinarexchange.co.nz"
                    className="text-blue hover:text-orange transition-colors font-medium"
                  >
                    dinars@dinarexchange.co.nz
                  </a>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center transition-all hover:shadow-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 text-orange">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                  <a
                    href="tel:+6498724693"
                    className="text-blue hover:text-orange transition-colors font-medium"
                  >
                    +64 9 872 4693
                  </a>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md text-center transition-all hover:shadow-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-blue">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Website</h3>
                  <a
                    href="https://www.DinarExchange.co.nz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue hover:text-orange transition-colors font-medium"
                  >
                    DinarExchange.co.nz
                  </a>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;