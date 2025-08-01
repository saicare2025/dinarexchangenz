"use client";

import { motion } from "framer-motion";
import MainLayout from "../MainLayout";

const ContactPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-blue-100 to-orange-100 min-h-[calc(100vh-120px)] py-10 px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <motion.header 
            variants={itemVariants}
            className="text-center mb-8"
          >
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2"
            >
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-gray-600"
            >
              Reach out for inquiries or assistance with currency exchange
            </motion.p>
          </motion.header>

          {/* Contact Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Contact Info */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-100 to-orange-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500 text-sm">EMAIL</h3>
                    <a href="mailto:dinars@dinarexchange.co.nz" className="text-blue-600 hover:text-orange-500 transition-colors">
                      dinars@dinarexchange.co.nz
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-100 to-orange-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500 text-sm">PHONE</h3>
                    <a href="tel:+6498724693" className="text-blue-600 hover:text-orange-500 transition-colors">
                      +64 9 872 4693
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-100 to-orange-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500 text-sm">HOURS</h3>
                    <p className="text-gray-700">Mon-Fri: 9am-5pm</p>
                    <p className="text-gray-700">Sat: 10am-2pm</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium text-gray-500 text-sm mb-2">FOLLOW US</h3>
                  <div className="flex gap-3">
                    {['Facebook', 'Twitter', 'Instagram'].map((social, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        className="bg-gradient-to-br from-blue-50 to-orange-50 p-2 rounded-lg border border-gray-200 hover:border-blue-200 transition-all"
                        whileHover={{ y: -2 }}
                      >
                        <span className="sr-only">{social}</span>
                        <div className="h-4 w-4 bg-gradient-to-r from-blue-500 to-orange-400 rounded-sm"></div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <motion.form 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                    placeholder="How can we help?"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:from-blue-600 hover:to-orange-600 transition-all shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;