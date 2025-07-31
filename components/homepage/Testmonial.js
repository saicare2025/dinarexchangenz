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
    quote:
      "I just completed my first transaction with Dinar Exchange and was genuinely impressed. Their process was smooth, professional, and customer-focused from start to finish. The team kept me informed, and the delivery was right on time. I’ll definitely be using them again!",
    author: "John M.",
    source: "Verified Google Review",
    rating: 5,
    image:
      "https://img.freepik.com/free-photo/smiling-hipster-guy-glasses-hoodie-looking-happy_176420-21093.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    quote:
      "I reached out with a few questions and received a prompt, courteous reply. Neil was incredibly helpful and made the whole process easy. The service and currency quality exceeded my expectations. Highly recommended for first-time buyers.",
    author: "Sarah K.",
    source: "Verified Google Review",
    rating: 5,
    image:
      "https://img.freepik.com/free-photo/portrait-fitness-woman-posing-after-working-out-gym-wearing-blue-pink-sportwear-looking-directly-camera-having-dark-hair_176532-9989.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    quote:
      "I’ve been using Dinar Exchange for over 4 years and they’ve never let me down. The currency is always authentic, the service is fast, and the staff is consistently professional. They’ve earned my trust time and time again.",
    author: "David L.",
    source: "Verified Google Review",
    rating: 5,
    image:
      "https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg",
  },
  {
    quote:
      "Absolutely stellar experience. My order was securely packaged and arrived quicker than expected. The team behind the scenes clearly knows what they’re doing — everything was smooth, safe, and professional.",
    author: "Emma S.",
    source: "Verified Trustpilot Review",
    rating: 5,
    image:
      "https://img.freepik.com/free-photo/fashion-portrait-young-beautiful-man_158595-3837.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    quote:
      "I’ve worked with a few exchange companies, but this one stands out for its reliability and precision. Every transaction has been accurate and timely. It's clear they value their customers and run a tight ship.",
    author: "Michael T.",
    source: "Verified Google Review",
    rating: 5,
    image:
      "https://img.freepik.com/free-photo/portrait-smiley-woman_23-2148827181.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    quote:
      "The speed of service blew me away. I placed my order and had the currency in hand sooner than expected. Not only that, but the communication throughout the process was top-notch. Excellent service from beginning to end.",
    author: "Linda G.",
    source: "Verified Trustpilot Review",
    rating: 5,
    image:
      "https://img.freepik.com/free-photo/waist-up-isolated-picture-handsome-young-male-with-loose-curly-hairdo-smooth-clean-face-looking-sideways-with-thoughtful-dreamy-smile-human-facial-expressions-emotions-feelings_343059-1544.jpg?semt=ais_hybrid&w=740",
  },
  {
    quote:
      "I appreciated the transparency in pricing and the ease of ordering. Everything was clearly explained, and there were no hidden fees or surprises. The whole experience felt trustworthy and efficient.",
    author: "Robert P.",
    source: "Verified Google Review",
    rating: 5,
    image:
      "https://img.freepik.com/free-photo/no-problem-very-well-smiling-young-woman-with-red-long-hair-look-satisfied-make-okay-zero-sign-approve-good-thing-like-recommend-white-background_176420-54305.jpg?semt=ais_hybrid&w=740",
  },
  {
    quote:
      "Every time I’ve used Dinar Exchange, the staff has been friendly, knowledgeable, and eager to help. It’s refreshing to deal with real people who genuinely care about providing good service. A+ experience every single time.",
    author: "Karen W.",
    source: "Verified Trustpilot Review",
    rating: 5,
    image:
      "https://img.freepik.com/free-photo/expressive-lady-posing-studio_344912-2368.jpg?semt=ais_hybrid&w=740",
  },
  {
    quote:
      "Hands down the best dinar exchange company I’ve worked with. Great customer service, fast shipping, and 100% legitimate currency. You can feel confident knowing you're in good hands with this team.",
    author: "James B.",
    source: "Verified Google Review",
    rating: 5,
    image:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
  },
];


  // Group testimonials into chunks of 6 per slide
  const groupSize = 4;
  const chunked = testimonials.reduce((acc, curr, i) => {
    const index = Math.floor(i / groupSize);
    if (!acc[index]) acc[index] = [];
    acc[index].push(curr);
    return acc;
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-12 bg-gradient-to-r from-blue-100 to-orange-100">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 max-w-7xl"
      >
        {/* Header */}
        <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-orange-800">Customers</span> Say
          </h2>
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-amber-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-800">4.8</span>
          </div>
          <p className="text-gray-600">Based on Real &quot;Verified Client Reviews&quot;</p>
        </motion.div>

        {/* Carousel */}
        <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="relative mb-4">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {chunked.map((group, slideIndex) => (
                <div key={slideIndex} className="flex-[0_0_100%] px-2">
                  <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                    {group.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-full"
                      >
                        <div className="flex gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-5 h-5 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 italic mb-4">
                          &quot;{testimonial.quote}&quot;
                        </p>
                        <div className="flex items-center gap-4">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            width={60}
                            height={60}
                            className="rounded-full object-cover border"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{testimonial.author}</p>
                            <p className="text-sm text-gray-500">{testimonial.source}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 -left-3 sm:-left-5 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-50 transition z-10"
            aria-label="Previous testimonials"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 -right-3 sm:-right-5 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-50 transition z-10"
            aria-label="Next testimonials"
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">TRUSTED BY 1000+ CUSTOMERS</h3>
            <p className="text-gray-600">ABN: 123 456 789</p>
            <p className="text-gray-600">AUSTRALIAN REGISTERED BUSINESS</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbP1seQq0kFgsBZzQ4A1aU8ob0vuIJVTidCg&s"
                alt="Google Reviews"
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Image
                src="https://www.pngitem.com/pimgs/m/42-421398_trustpilot-logo-png-transparent-png.png"
                alt="Trustpilot"
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
