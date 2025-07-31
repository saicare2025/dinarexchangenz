"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I just had my first interactions with Dinar Exchange. Professional, quick, and excellent service. Will definitely use again.",
      author: "John M.",
      source: "Verified Google Review",
      rating: 5,
    },
    {
      quote: "Recent reply and good product and service. Neil was great to deal with and got back to me quickly.",
      author: "Sarah K.",
      source: "Verified Google Review",
      rating: 5,
    },
    {
      quote: "I have been using Dinar Exchange for over four years now, and they continue to provide excellent service and authentic currency.",
      author: "David L.",
      source: "Verified Google Review",
      rating: 5,
    },
    {
      quote: "Exceptional customer service and fast delivery. Highly recommend for anyone looking to exchange currency.",
      author: "Emma S.",
      source: "Verified Trustpilot Review",
      rating: 5,
    },
    {
      quote: "The most reliable currency exchange service I've used. Always accurate and trustworthy.",
      author: "Michael T.",
      source: "Verified Google Review",
      rating: 5,
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 to-orange-100">
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
            What Our <span className="text-orange-800">Customers</span> Say
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
            Based On Real "Verified Client Reviews"
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="relative mb-16"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
                >
                  <motion.div
                    variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                    className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 h-full"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-6">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-500">{testimonial.source}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Buttons */}
          <button 
            onClick={scrollPrev}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={scrollNext}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
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
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbP1seQq0kFgsBZzQ4A1aU8ob0vuIJVTidCg&s"
                alt="Google Reviews"
                className="h-12 w-auto"
                width={200}
                height={100}
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Image
                src="https://www.pngitem.com/pimgs/m/42-421398_trustpilot-logo-png-transparent-png.png"
                alt="Trustpilot"
                className="h-12 w-auto"
                width={200}
                height={100}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}