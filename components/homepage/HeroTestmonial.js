"use client";

import { useState, useEffect, useCallback } from "react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import review2 from "../../app/assets/review-image/review2.png";
import review3 from "../../app/assets/review-image/review3.png";
import review4 from "../../app/assets/review-image/review4.png";
import review8 from "../../app/assets/review-image/review8.png";

const testimonials = [
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
    source: "Verified Trustpilot Review",
    rating: 5,
    image: review4,
  },
  {
    quote:
      "The team are always very helpful and professional in dealing with any questions I may have.👍",
    author: "Saving Brothers",
    source: "Verified Trustpilot Review",
    rating: 5,
    image: review8,
  },
];

export function FloatingTestimonial() {
  const [visible, setVisible] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

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
                      sizes="40px"
                      // Optionally: quality={90} priority
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex gap-0.5 mb-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className="w-3.5 h-3.5 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-800 font-medium leading-tight mb-1 line-clamp-2">
                      &quot;{t.quote}&quot;
                    </p>
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">
                        {t.author}
                      </span>{" "}
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
