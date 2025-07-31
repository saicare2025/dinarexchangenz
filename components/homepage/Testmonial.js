"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";
import review1 from "../../app/assets/review-image/review1.png";
import review2 from "../../app/assets/review-image/review2.png";
import review3 from "../../app/assets/review-image/review3.png";
import review4 from "../../app/assets/review-image/review4.png";
import review5 from "../../app/assets/review-image/review5.png";
import review6 from "../../app/assets/review-image/review6.png";
import review7 from "../../app/assets/review-image/review7.png";
import review8 from "../../app/assets/review-image/review8.png";
import review9 from "../../app/assets/review-image/review9.png";
import { ArrowTopRightOnSquareIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export function TestimonialsSection() {
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReview = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const testimonials = [
    {
      quote:
        "What a great service Dinar Exchange provides. They went above  and beyond  to help with  my first purchase. Can highly recommend  them to do business  with. Big thank you to Russel.",
      author: "John M.",
      source: "Verified Google Review",
      rating: 5,
      image: review1,
    },
    {
      quote:
        "Great service, Great prices and speedy delivery. I had a few issues as i use a building society but the lovely customer service lady on Dinar exchange was more than happy to help me out. It is so nice to talk to a real human nowadays and not just a voice recording. I am on my second order now and i feel very confident using Dinar exchange. I highly recommend",
      author: "Shelley Maxted",
      source: "Verified Google Review",
      rating: 5,
      image: review6,
    },
    {
      quote:
        "Always great experience and most importantly confidence in the whole process! Service is absolutely amazing, especially Sonya that communicates no matter what the time it is, and what I might need and also Sherlyn. They are all very professional and quick! They also give you a call once Your  notes have  been shipped ! I would have give  them 7stars  Review if I could! Shop  with confidence and fairness 🌟🌟🌟🌟🌟🌟🌟Thank you ladies so much ! I appreciate you! Great service as Always!!!",
      author: "Maya Maryanovich",
      source: "Verified Google Review",
      rating: 5,
      image: review7,
    },
    {
      quote:
        "Courteous and helpful staff. Thorough follow-up. Safe delivery of purchases. No complaints at all, just praise.",
      author: "Beverley Currie",
      source: "Verified Google Review",
      rating: 5,
      image: review2,
    },
    {
      quote:
        "Great people to deal with. Very helpful, very efficient and professional. Thanks Dinar Exchange.",
      author: "Fiona J",
      source: "Verified Google Review",
      rating: 5,
      image: review3,
    },
    {
      quote:
        "2nd time using Dinar Exchange. Quick process, quick deliveries, A+ communication.",
      author: "Craig Lees",
      source: "Verified Google Review",
      rating: 5,
      image: review4,
    },
    {
      quote:
        "I have been using Dinar Exchange for over 4yrs, never had a problem, very professional. Very trustworthy.",
      author: "Lesley Brown",
      source: "Verified Google Review",
      rating: 5,
      image: review5,
    },

    {
      quote:
        "The team are always very helpful and professional in dealing with any questions I may have.👍",
      author: "Saving Brothers",
      source: "Verified Google Review",
      rating: 5,
      image: review8,
    },
    {
      quote:
        "Repeat customer, all authentic & delivered safetly, takes some time to deliver but worth the wait, sit back and be patient. bought in bulk and even recieved a surprise gift, totally took me off guard lol Plan to be buying more in the future & will only be buying from Dinar exchange. Thanks guys appreciate the Transparency",
      author: "Ben L",
      source: "Verified Google Review",
      rating: 5,
      image: review9,
    },
  ];
  const isLongReview = (text) => text.length > 150;
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
        <motion.div
          variants={fadeIn("up", "tween", 0.1, 1)}
          className="text-center mb-8"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-4">
              <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                VERIFIED REVIEWS
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-orange-700">Customers</span> Say
            </h2>

            <div className="flex justify-center items-center gap-3 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-7 h-7 text-amber-400" />
                ))}
              </div>
              <span className="text-3xl font-bold text-gray-800">4.8</span>
            </div>

            <div className="flex justify-center">
              <a
                href="https://maps.app.goo.gl/5VmZDoAyLtB332Rw5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-orange-600 transition-colors group"
              >
                <span>View All Reviews on Google</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="relative mb-4"
        >
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
                            <StarIcon
                              key={i}
                              className="w-5 h-5 text-amber-400"
                            />
                          ))}
                        </div>
                        <div className="relative">
                          <p className="text-gray-700 italic mb-4">
                            {isLongReview(testimonial.quote) &&
                            !expandedReviews[index] ? (
                              <>
                                {`${testimonial.quote.substring(0, 150)}... `}
                                <button
                                  onClick={() => toggleReview(index)}
                                  className="text-orange-600 hover:underline font-medium"
                                >
                                  Read More
                                </button>
                              </>
                            ) : (
                              <>
                                {testimonial.quote}
                                {isLongReview(testimonial.quote) &&
                                  expandedReviews[index] && (
                                    <button
                                      onClick={() => toggleReview(index)}
                                      className="text-orange-600 hover:underline font-medium block mt-2"
                                    >
                                      Show Less
                                    </button>
                                  )}
                              </>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            width={60}
                            height={60}
                            className="rounded-full object-cover border"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {testimonial.author}
                            </p>
                            <p className="text-sm text-gray-500">
                              {testimonial.source}
                            </p>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 -right-3 sm:-right-5 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-50 transition z-10"
            aria-label="Next testimonials"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
