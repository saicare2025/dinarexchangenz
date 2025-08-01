'use client';

import { motion } from 'framer-motion';

function AboutPage() {
  return (
    <div className="bg-white text-gray-800 px-4 py-16 md:px-8 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-blue-600 border-b-4 border-orange-500 pb-2 mb-6">
          About Dinar Exchange New Zealand
        </h1>
        <p className="text-xl mb-10">
          Your trusted source for Iraqi Dinars (IQD) and Zimbabwe Dollars (ZIM) in New Zealand and Australia.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">Who We Are</h2>
          <p className="mb-4">
            Welcome to Dinar Exchange New Zealand, your trusted source for Iraqi Dinars (IQD) and Zimbabwe Dollars (ZIM). We proudly serve customers throughout New Zealand and Australia, offering secure, transparent, and compliant currency exchange services since 2012.
          </p>
          <p>
            As a reputable and long-standing dealer of collectible currencies, we specialize in delivering authentic, high-quality banknotes with safe transactions and excellent service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">Our Compliance & Registration</h2>
          <ul className="list-disc pl-5">
            <li>Dinar Exchange New Zealand operates under Oz Trading Group Pty Ltd.</li>
            <li>ABN: 82 158 981 787</li>
            <li>ACN: 158 981 787</li>
            <li>AUSTRAC Enrolment Number: 100311410</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">What We Offer</h2>
          <ul className="list-disc pl-5">
            <li>Genuine Iraqi Dinar (IQD) and Zimbabwe Dollar (ZIM) banknotes</li>
            <li>Secure ordering with full KYC compliance</li>
            <li>Transparent pricing and competitive rates</li>
            <li>Fast, tracked shipping across New Zealand</li>
            <li>Friendly customer service and expert assistance</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">Why Choose Us?</h2>
          <ul className="space-y-2">
            <li>✅ Over a decade of experience</li>
            <li>✅ Verified authenticity</li>
            <li>✅ Secure transactions</li>
            <li>✅ Responsive service</li>
            <li>✅ Straightforward pricing</li>
            <li>✅ Fast & Secure Shipping</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">Our Mission</h2>
          <p>
            Our mission is to provide New Zealanders with a safe, convenient, and trustworthy platform to purchase Iraqi Dinar and Zimbabwe Dollar banknotes. We are dedicated to maintaining compliance, ensuring authenticity, and offering a customer-first experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">Get In Touch</h2>
          <p>Email: <a href="mailto:dinars@dinarexchange.co.nz" className="text-blue-600">dinars@dinarexchange.co.nz</a></p>
          <p>Phone: <span className="text-blue-600">+64 9 872 4693</span></p>
          <p>Website: <a href="https://www.DinarExchange.co.nz" className="text-blue-600">www.DinarExchange.co.nz</a></p>
        </section>
      </motion.div>
    </div>
  );
}

export default AboutPage;