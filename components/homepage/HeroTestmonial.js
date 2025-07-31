"use client";

import { useState, useEffect, useCallback } from "react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const testimonials = [
  {
    quote: "Professional & quick service. Will use again!",
    author: "John M.",
    source: "Google",
    rating: 5,
    image: "https://img.freepik.com/free-photo/young-man-sad-expression_1194-2826.jpg?semt=ais_hybrid&w=740",
  },
  {
    quote: "Neil was great - fast responses!",
    author: "Sarah K.",
    source: "Google",
    rating: 5,
    image: "https://img.freepik.com/free-photo/outdoor-shot-young-caucasian-man-with-beard-relaxing-open-air-surrounded-by-beautiful-mountain-setting-rainforest_273609-1855.jpg",
  },
  {
    quote: "Authentic currency for 4+ years",
    author: "David L.",
    source: "Google",
    rating: 5,
    image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
  },
];

export function FloatingTestimonial() {
  const [visible, setVisible] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Show only once using localStorage
  useEffect(() => {
    const hasShown = localStorage.getItem("testimonialShown");
    if (!hasShown) {
      setVisible(true);
      localStorage.setItem("testimonialShown", "true");
    }
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-5 left-5 z-50 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
    >
      <div className="relative">
        <button
          onClick={() => setVisible(false)}
          aria-label="Close"
          className="absolute top-1.5 right-1.5 z-10 p-1 bg-white/90 rounded-full hover:bg-gray-100"
        >
          <XMarkIcon className="w-4 h-4 text-gray-500" />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t, index) => (
              <div key={index} className="flex-[0_0_100%] px-4 py-3">
                <div className="flex gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={t.image}
                      alt={t.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-0.5 mb-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <StarIcon key={i} className="w-3.5 h-3.5 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-800 font-medium leading-tight mb-1 line-clamp-2">
                      &quot;{t.quote}&quot;
                    </p>
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">{t.author}</span>{" "}
                      • {t.source}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-1 px-3 pb-2">
          <button
            onClick={scrollPrev}
            className="text-xs text-gray-400 hover:text-orange-600 px-2 py-1 rounded"
          >
            ←
          </button>
          <button
            onClick={scrollNext}
            className="text-xs text-gray-400 hover:text-orange-600 px-2 py-1 rounded"
          >
            →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
