"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../MainLayout";
import { submitContactForm, mapValidationErrors, getErrorMessage, getSuccessMessage, ContactFormError } from "../../lib/client/contactForm";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    website: '', // honeypot field
  });
  
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous status
    setSubmitStatus(null);
    setStatusMessage('');
    setFieldErrors({});
    
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);
      
      setSubmitStatus('success');
      setStatusMessage(getSuccessMessage(result));
      
      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
        website: '',
      });
      
    } catch (error) {
      setSubmitStatus('error');
      
      if (error instanceof ContactFormError && error.code === 'VALIDATION_ERROR') {
        // Map validation errors to form fields
        const errors = mapValidationErrors(error.details);
        setFieldErrors(errors);
        setStatusMessage('Please correct the errors below and try again.');
      } else {
        setStatusMessage(getErrorMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName) => {
    return fieldErrors[fieldName] || '';
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

          {/* Status Messages */}
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                submitStatus === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {statusMessage}
            </motion.div>
          )}

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
              </div>

              {/* Contact Form */}
              <motion.form 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
              >
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm rounded-md border transition-all focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
                      getFieldError('fullName') 
                        ? 'border-red-300 focus:ring-red-300 focus:border-red-300' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Your full name"
                    required
                  />
                  {getFieldError('fullName') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError('fullName')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm rounded-md border transition-all focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
                      getFieldError('email') 
                        ? 'border-red-300 focus:ring-red-300 focus:border-red-300' 
                        : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                  {getFieldError('email') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm rounded-md border transition-all focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
                      getFieldError('phone') 
                        ? 'border-red-300 focus:ring-red-300 focus:border-red-300' 
                        : 'border-gray-300'
                    }`}
                    placeholder="+64 21 123 4567"
                    required
                  />
                  {getFieldError('phone') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 text-sm rounded-md border transition-all focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
                      getFieldError('message') 
                        ? 'border-red-300 focus:ring-red-300 focus:border-red-300' 
                        : 'border-gray-300'
                    }`}
                    placeholder="How can we help?"
                    required
                  ></textarea>
                  {getFieldError('message') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError('message')}</p>
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
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-all shadow-sm ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-orange-500 text-white hover:from-blue-600 hover:to-orange-600'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
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