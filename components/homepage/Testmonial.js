"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/solid";

// IMPORTANT: ensure these styles are imported once globally in your app (e.g., app/layout.tsx)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// --- Replace these with your actual images ---
import review1 from "../../app/assets/review-image/review1.png";
import review2 from "../../app/assets/review-image/review2.png";
import review3 from "../../app/assets/review-image/review3.png";
import review4 from "../../app/assets/review-image/review4.png";
import review5 from "../../app/assets/review-image/review5.png";
import review6 from "../../app/assets/review-image/review6.png";
import review7 from "../../app/assets/review-image/review7.png";
import review8 from "../../app/assets/review-image/review8.png";
import review9 from "../../app/assets/review-image/review9.png";

const testimonials = [
  {
    quote:
      "What a great service Dinar Exchange provides. They went above and beyond to help with my first purchase. Can highly recommend them to do business with. Big thank you to Russel.",
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
    image: review2,
  },
  {
    quote:
      "Always great experience and most importantly confidence in the whole process! Service is absolutely amazing, especially Sonya that communicates no matter what the time it is, and what I might need and also Sherlyn. They are all very professional and quick! They also give you a call once Your notes have been shipped ! I would have give them 7stars Review if I could! Shop with confidence and fairness 🌟🌟🌟🌟🌟🌟🌟Thank you ladies so much ! I appreciate you! Great service as Always!!!",
    author: "Maya Maryanovich",
    source: "Verified Google Review",
    rating: 5,
    image: review3,
  },
  {
    quote:
      "Courteous and helpful staff. Thorough follow-up. Safe delivery of purchases. No complaints at all, just praise.",
    author: "Beverley Currie",
    source: "Verified Google Review",
    rating: 5,
    image: review4,
  },
  {
    quote:
      "Great people to deal with. Very helpful, very efficient and professional. Thanks Dinar Exchange.",
    author: "Fiona J",
    source: "Verified Google Review",
    rating: 5,
    image: review5,
  },
  {
    quote:
      "2nd time using Dinar Exchange. Quick process, quick deliveries, A+ communication.",
    author: "Craig Lees",
    source: "Verified Google Review",
    rating: 5,
    image: review6,
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-4 w-4 text-amber-400" />
      ))}
    </div>
  );
}

export default function ACSReviewsCarousel() {
  const breakpoints = useMemo(
    () => ({
      320: { slidesPerView: 1.05, spaceBetween: 16, centeredSlides: true },
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
    }),
    []
  );

  return (
    <section className="w-full bg-white">
      {/* Header line like the screenshot */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <p className="w-full text-center text-gray-700 text-xl sm:text-2xl md:text-[26px]">
          <span className="mr-1">Overall rating</span>
          <span className="font-bold text-[26px] align-middle">4.8</span>
          <span className="inline-block align-middle ml-0.5">
            <StarIcon className="h-5 w-5 text-amber-400" />
          </span>
          <span className="ml-2">based on</span>
         
          <span>Verified Client Reviews</span>
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-6xl mx-auto px-2 sm:px-6 pb-10 pt-6">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{ rotate: 0, depth: 120, stretch: 0, modifier: 1, slideShadows: false }}
          autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ prevEl: ".rev-prev", nextEl: ".rev-next" }}
          pagination={{ el: ".rev-dots", clickable: true }}
          loop
          breakpoints={breakpoints}
          className="reviews-swiper"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <article className="h-full">
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 md:p-6 h-[260px] flex flex-col">
                  {/* name + zoom icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-white shadow">
                        <Image src={t.image} alt={t.author} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-semibold leading-tight">{t.author}</h3>
                        <div className="flex items-center gap-1 text-amber-500" aria-label="5 stars">
                          <Stars />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* date */}
                  <p className="text-xs text-gray-500 mt-1">{t.date}</p>

                  {/* quote */}
                  <p className="mt-3 text-sm text-gray-700 line-clamp-5">
                    {t.quote}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Nav arrows */}
        <button
          aria-label="Previous"
          className="rev-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 grid place-items-center h-10 w-10 rounded-full bg-white shadow border border-gray-200 hover:bg-gray-50"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>
        <button
          aria-label="Next"
          className="rev-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 grid place-items-center h-10 w-10 rounded-full bg-white shadow border border-gray-200 hover:bg-gray-50"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>

        {/* Dots */}
        <div className="rev-dots mt-6 flex justify-center" />
      </div>

      {/* local styles to match screenshot subtleties */}
      <style jsx global>{`
        .reviews-swiper { padding: 10px 0 24px; }
        .reviews-swiper .swiper-slide { height: auto; }
        .reviews-swiper .swiper-pagination-bullet { width: 6px; height: 6px; opacity: .5; }
        .reviews-swiper .swiper-pagination-bullet-active { opacity: 1; }
        /* card emphasis for active center slide */
        .reviews-swiper .swiper-slide-active article > div { box-shadow: 0 8px 20px rgba(0,0,0,.06); }
      `}</style>
    </section>
  );
}
