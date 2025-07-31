"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I just had my first interactions with Dinar Exchange. Professional, quick, and excellent service. Will definitely use again.",
      author: "John M.",
      source: "Verified Google Review",
      rating: 5
    },
    {
      quote: "Recent reply and good product and service. Neil was great to deal with and got back to me quickly.",
      author: "Sarah K.",
      source: "Verified Google Review",
      rating: 5
    },
    {
      quote: "I have been using Dinar Exchange for over four years now, and they continue to provide excellent service and authentic currency.",
      author: "David L.",
      source: "Verified Google Review",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          variants={fadeIn("up", "tween", 0.1, 1)}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-orange">Customers</span>  Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-amber-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-800">4.8</span>
          </div>
          <p className="text-gray-600">
            Based On Real &quot;Verified Client Reviews&quot;
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">&quot;{testimonial.quote}&quot;</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.source}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          className="flex flex-col md:flex-row items-center justify-between gap-6 bg-orange-100 p-6 rounded-xl border border-gray-200"
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              TRUSTED BY 1000+ CUSTOMERS
            </h3>
            <p className="text-gray-600">ABN: 123 456 789</p>
            <p className="text-gray-600">AUSTRALIAN REGISTERED BUSINESS</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbP1seQq0kFgsBZzQ4A1aU8ob0vuIJVTidCg&s" 
                alt="Google Reviews" 
                className="h-12 w-auto"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <img 
                src="https://www.pngitem.com/pimgs/m/42-421398_trustpilot-logo-png-transparent-png.png" 
                alt="Trustpilot" 
                className="h-12 w-auto"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}