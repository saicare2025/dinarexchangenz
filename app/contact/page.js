"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../MainLayout";
import {
  submitContactForm,
  mapValidationErrors,
  getErrorMessage,
  getSuccessMessage,
  ContactFormError,
} from "../../lib/client/contactForm";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot field
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous status
    setSubmitStatus(null);
    setStatusMessage("");
    setFieldErrors({});

    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formData);

      setSubmitStatus("success");
      setStatusMessage(getSuccessMessage(result));

      // Reset form on success
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        website: "",
      });
    } catch (error) {
      setSubmitStatus("error");

      if (
        error instanceof ContactFormError &&
        error.code === "VALIDATION_ERROR"
      ) {
        // Map validation errors to form fields
        const errors = mapValidationErrors(error.details);
        setFieldErrors(errors);
        setStatusMessage("Please correct the errors below and try again.");
      } else {
        setStatusMessage(getErrorMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName) => {
    return fieldErrors[fieldName] || "";
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-120px)] py-12 px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.header variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue mb-4">
              Contact Dinar Exchange
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We&apos;re here to assist with all your currency exchange needs. Reach
              out to us with any questions about Iraqi Dinar or Zimbabwe Dollar.
            </p>
          </motion.header>

          {/* Status Messages */}
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-8 p-4 rounded-lg ${
                submitStatus === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {statusMessage}
            </motion.div>
          )}

          {/* Get in Touch With Us Section */}
          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-2xl font-bold text-blue mb-6 pb-2 border-b border-gray-200">
              Get in Touch With Us
            </h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-4 p-4">
                {/* Contact Form */}
                <motion.form
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-blue focus:border-blue ${
                        getFieldError("fullName")
                          ? "border-red-300 focus:ring-red-300 focus:border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Your full name"
                      required
                    />
                    {getFieldError("fullName") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getFieldError("fullName")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-blue focus:border-blue ${
                        getFieldError("email")
                          ? "border-red-300 focus:ring-red-300 focus:border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="your@email.com"
                      required
                    />
                    {getFieldError("email") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getFieldError("email")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-blue focus:border-blue ${
                        getFieldError("phone")
                          ? "border-red-300 focus:ring-red-300 focus:border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="+64 21 123 4567"
                      required
                    />
                    {getFieldError("phone") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getFieldError("phone")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-blue focus:border-blue ${
                        getFieldError("message")
                          ? "border-red-300 focus:ring-red-300 focus:border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="How can we assist with your currency exchange needs?"
                      required
                    ></textarea>
                    {getFieldError("message") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getFieldError("message")}
                      </p>
                    )}
                  </div>

                  {/* Honeypot field - hidden from users */}
                  <div className="hidden">
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg text-base font-medium transition-all shadow-sm ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue text-white hover:bg-blue/90"
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending Message...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </motion.form>

                {/* Contact Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-blue mb-4">
                      Contact Information
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Our team is ready to assist you with any questions about
                      purchasing Iraqi Dinar or Zimbabwe Dollars. We typically
                      respond to all inquiries within 24 hours during business
                      days.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                      <div className="bg-blue p-2 rounded-md flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-500 text-sm">
                          EMAIL ADDRESS
                        </h4>
                        <a
                          href="mailto:dinars@dinarexchange.co.nz"
                          className="text-blue hover:text-orange transition-colors text-base"
                        >
                          dinars@dinarexchange.co.nz
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                      <div className="bg-blue p-2 rounded-md flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-500 text-sm">
                          PHONE NUMBER
                        </h4>
                        <a
                          href="tel:+6498724693"
                          className="text-blue hover:text-orange transition-colors text-base"
                        >
                          +64 9 872 4693
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                      <div className="bg-blue p-2 rounded-md flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-500 text-sm">
                          BUSINESS HOURS
                        </h4>
                        <p className="text-gray-700 text-base">
                          Monday - Friday: 9:00 AM - 5:00 PM
                        </p>
                        <p className="text-gray-700 text-base">
                          Saturday: 10:00 AM - 2:00 PM
                        </p>
                        <p className="text-gray-700 text-base">
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Office Location & Appointments Section */}
          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-2xl font-bold text-blue mb-6 pb-2 border-b border-gray-200">
              Office Location & Appointments
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="grid md:grid-cols-2 gap-10">
                {/* Left: Copy & Details */}
                <div>
                  <h3 className="text-lg font-semibold text-blue mb-4">
                    Visit Our Office
                  </h3>
                  <p className="text-gray-600 mb-6">
                    While we primarily operate online to serve customers across
                    New Zealand, we welcome scheduled appointments at our office
                    for larger transactions or detailed consultations about
                    currency purchases.
                  </p>

                  <div className="space-y-5">
                    {/* Address */}
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-md mr-4 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Office Address
                        </h4>
                        <p className="text-gray-600">
                          Dinar Exchange — Auckland (exact pin on Google Maps)
                        </p>
                      </div>
                    </div>

                    {/* Appointments */}
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-md mr-4 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Schedule an Appointment
                        </h4>
                        <p className="text-gray-600">
                          Please contact us in advance to schedule an office
                          visit. We recommend appointments for transactions over
                          5 million IQD.
                        </p>
                      </div>
                    </div>

                    {/* Open in Google Maps (Button only) */}
                    <div className="pt-2">
                      <a
                        href="https://maps.app.goo.gl/h99qRy6nwQ8zFpzz8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-orange px-5 py-3 font-medium text-white hover:bg-orange-600 transition-colors"
                        aria-label="Open Dinar Exchange location in Google Maps"
                      >
                        Open in Google Maps
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h6m0 0v6m0-6l-8 8"
                          />
                        </svg>
                      </a>
                      <p className="text-xs text-gray-500 mt-2">
                        Taps open the Google Maps app on mobile or a new tab on
                        desktop.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Compact Info Card (replaces map) */}
                <div className="rounded-xl border border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z"
                        />
                        <circle cx="12" cy="9" r="2" fill="currentColor" />
                      </svg>
                    </div>
                    <h4 className="text-base font-semibold text-gray-900">
                      Location Snapshot
                    </h4>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange mr-2">•</span>
                      Exact pin available via Google Maps link above.
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange mr-2">•</span>
                      Discreet, secure office—appointments required.
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange mr-2">•</span>
                      Parking and access details sent with confirmation.
                    </li>
                  </ul>
                  <div className="mt-6 rounded-lg bg-white border border-dashed border-gray-300 p-4 text-sm text-gray-600">
                    Tip: Add notes to your booking (e.g., preferred time,
                    transaction size) so we can prepare documents and
                    verification steps in advance.
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Customer Support Section */}
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold text-blue mb-6 pb-2 border-b border-gray-200">
              Customer Support
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue mb-4">
                    Dedicated Support
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our customer support team specializes in currency exchange
                    and is ready to assist you with:
                  </p>

                  <ul className="space-y-3">
                    {[
                      "Guidance on purchasing Iraqi Dinar or Zimbabwe Dollars",
                      "Verification of currency authenticity",
                      "Transaction process explanations",
                      "Delivery tracking and updates",
                      "Secure payment options",
                      "After-sales support and inquiries",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue mb-4">
                    Response Time
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We pride ourselves on prompt and helpful customer service.
                    Here&apos;s what you can expect:
                  </p>

                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue mb-2">
                        Email Inquiries
                      </h4>
                      <p className="text-gray-700">
                        Response within 24 hours during business days
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue mb-2">
                        Phone Calls
                      </h4>
                      <p className="text-gray-700">
                        Answered during business hours or returned within 2
                        hours
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue mb-2">
                        Urgent Matters
                      </h4>
                      <p className="text-gray-700">
                        Mark your inquiry as urgent for priority response
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
