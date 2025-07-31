"use client";

import { useState, useCallback } from "react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    quote:
      "I just had my first interactions with Dinar Exchange. Professional, quick, and excellent service. Will definitely use again.",
    author: "John M.",
    source: "Verified Google Review",
    rating: 5,
  },
  {
    quote:
      "Recent reply and good product and service. Neil was great to deal with and got back to me quickly.",
    author: "Sarah K.",
    source: "Verified Google Review",
    rating: 5,
  },
  {
    quote:
      "I have been using Dinar Exchange for over four years now, and they continue to provide excellent service and authentic currency.",
    author: "David L.",
    source: "Verified Google Review",
    rating: 5,
  },
  {
    quote:
      "Exceptional customer service and fast delivery. Highly recommend for anyone looking to exchange currency.",
    author: "Emma S.",
    source: "Verified Trustpilot Review",
    rating: 5,
  },
  {
    quote:
      "The most reliable currency exchange service I've used. Always accurate and trustworthy.",
    author: "Michael T.",
    source: "Verified Google Review",
    rating: 5,
  },
];

export function FloatingTestimonial() {
  const [visible, setVisible] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [
      Autoplay({
        delay: 3000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-24 left-4 z-50 w-[90vw] max-w-sm bg-white rounded-xl shadow-xl border border-gray-200"
    >
      {/* Close Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setVisible(false)}
          className="p-2 text-gray-500 hover:text-gray-700"
          aria-label="Close testimonials"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((t, i) => (
            <div key={i} className="flex-[0_0_100%] px-4 pb-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm border h-full">
                <div className="flex gap-1 mb-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic mb-4">
                  &quot;{t.quote}&quot;
                </p>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {t.author}
                  </p>
                  <p className="text-xs text-gray-500">{t.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center px-4 py-2 border-t text-sm border-gray-100">
        <button onClick={scrollPrev} className="text-gray-600 hover:text-orange-600">
          ← Prev
        </button>
        <button onClick={scrollNext} className="text-gray-600 hover:text-orange-600">
          Next →
        </button>
      </div>
    </motion.div>
  );
}
