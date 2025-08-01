"use client";

import { motion } from "framer-motion";
import MainLayout from "../MainLayout";

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-blue-100 to-orange-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.header 
            variants={itemVariants}
            className="mb-16 text-center"
          >
            <motion.div
              variants={fadeIn}
              className="inline-block mb-6"
            >
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-orange-600 rounded-full mx-auto" />
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-4"
            >
              About Dinar Exchange NZ
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-800 max-w-3xl mx-auto"
            >
              Your trusted source for Iraqi Dinars (IQD) and Zimbabwe Dollars (ZIM) 
              in New Zealand and Australia.
            </motion.p>
          </motion.header>

          {/* Content Sections */}
          <div className="space-y-20">
            {/* Who We Are */}
            <motion.section 
              variants={itemVariants}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-6"
                  whileInView={{ x: 0, opacity: 1 }}
                  initial={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-blue-600">Who</span> We Are
                </motion.h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Welcome to Dinar Exchange New Zealand, your trusted source for
                    Iraqi Dinars (IQD) and Zimbabwe Dollars (ZIM). We proudly serve
                    customers throughout New Zealand and Australia.
                  </p>
                  <p>
                    As a reputable dealer of collectible currencies since 2012,
                    we specialize in delivering authentic, high-quality banknotes
                    with secure transactions and exceptional service.
                  </p>
                </div>
              </div>
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border-l-4 border-orange-600 shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Compliance</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Operates under Oz Trading Group Pty Ltd
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    ABN: 82 158 981 787
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    ACN: 158 981 787
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    AUSTRAC Enrolment: 100311410
                  </li>
                </ul>
              </motion.div>
            </motion.section>

            {/* Services */}
            <motion.section 
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl"
            >
              <motion.h2 
                className="text-3xl font-bold text-center text-gray-800 mb-12"
                whileInView={{ scale: 1.05 }}
                initial={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                Our <span className="text-orange-600">Services</span>
              </motion.h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Authentic Currencies",
                    desc: "Genuine Iraqi Dinar (IQD) and Zimbabwe Dollar (ZIM) banknotes"
                  },
                  {
                    title: "Secure Transactions",
                    desc: "Full KYC compliance and protected ordering process"
                  },
                  {
                    title: "Competitive Rates",
                    desc: "Transparent pricing with no hidden fees"
                  },
                  {
                    title: "Fast Shipping",
                    desc: "Tracked delivery across New Zealand"
                  },
                  {
                    title: "Expert Support",
                    desc: "Knowledgeable customer service team"
                  },
                  {
                    title: "Proven Experience",
                    desc: "Over a decade serving collectors and investors"
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-orange-600 text-2xl mb-3">{index + 1}.</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Mission */}
            <motion.section 
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-orange-600 p-0.5 rounded-full inline-block mb-8"
                whileInView={{ scaleX: [0, 1.2, 1] }}
                initial={{ scaleX: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gradient-to-r from-blue-100 to-orange-100 px-8 py-4 rounded-full">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                    Our Mission
                  </h2>
                </div>
              </motion.div>
              
              <motion.p
                className="text-xl text-gray-700 max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                To provide New Zealanders with a secure, compliant platform for 
                collectible currency exchange, prioritizing authenticity, 
                transparency, and exceptional customer experience.
              </motion.p>
            </motion.section>

            {/* Contact */}
            <motion.section 
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Contact <span className="text-blue-600">Us</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="text-orange-600 text-3xl mb-4">✉️</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                  <a 
                    href="mailto:dinars@dinarexchange.co.nz" 
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    dinars@dinarexchange.co.nz
                  </a>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="text-orange-600 text-3xl mb-4">📞</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                  <a 
                    href="tel:+6498724693" 
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    +64 9 872 4693
                  </a>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="text-orange-600 text-3xl mb-4">🌐</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Website</h3>
                  <a 
                    href="https://www.DinarExchange.co.nz" 
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DinarExchange.co.nz
                  </a>
                </motion.div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;