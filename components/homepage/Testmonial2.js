"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@heroicons/react/24/solid";

// IMPORTANT: ensure these styles are imported once globally in your app (e.g., app/layout.tsx)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const PRODUCT_REVIEW_LOGO_SRC = "/productreview.svg"; // place logo file at /public/productreview.svg

const testimonials = [
  {
    quote: "Excellent customer service by Russel and Sam. Courteous and professional.",
    author: "Shane R.",
    source: "Verified Product Review",
    rating: 5,
    image:
      "https://cdn.productreview.com.au/resize/avatar/3cf32c50-bc43-3835-9e24-3061631312ce?width=128&height=128",
    link: "https://www.productreview.com.au/reviews/5f3bd3bd-392b-591c-a651-8caf4ca1a630",
  },
  {
    quote:
      "Brilliant service and Help. I have been using Dinar Exchange for 3 years now and the service is wonderful. I highly recommend this company. Thank you Dinar Exchange.",
    author: "Net-",
    source: "Verified Product Review",
    rating: 5,
    image:
      "https://cdn.productreview.com.au/resize/avatar/02724674-6154-3cb6-809f-daf8097e3b05?width=128&height=128",
    link: "https://www.productreview.com.au/reviews/89e0a946-5b7d-5a93-8132-ffd48d4e9308",
  },
  {
    quote:
      "I just had my first interactions with Dinar Exchange. Karla was so very helpful and kind. I will add to this after I receive my first order, but if you have any questions call the number and ask for Karla. She explains the process so well. I am not an investor, in my mid fifties so have some catching up to do. Thank you so much Dinar exchange team, and a huge should out to Karla",
    author: "Tara",
    source: "Verified Product Review",
    rating: 5,
    image:
      "https://cdn.productreview.com.au/resize/avatar/154bea28-c63a-35de-bbc7-62379db90241?width=128&height=128",
    link: "https://www.productreview.com.au/reviews/d790206a-0b13-5e92-a8cb-5ea1b054647d",
  },
  {
    quote: "Prompt reply and good product and service. Neil was great to work.",
    author: "James M.",
    source: "Verified Product Review",
    rating: 5,
    image:
      "https://cdn.productreview.com.au/resize/avatar/ea881fe7-c391-3bfe-971d-fd3f95cd1593?width=128&height=128",
    link: "https://cdn.productreview.com.au/resize/avatar/ea881fe7-c391-3bfe-971d-fd3f95cd1593?width=128&height=128",
  },
  {
    quote:
      "Great company to deal with never let me down on my orders and always answer the phone or email when I need them",
    author: "David",
    source: "Verified Product Review",
    rating: 5,
    image:
      "https://cdn.productreview.com.au/resize/avatar/16c5b9cb-8944-361e-bb05-6b25224ee340?width=128&height=128",
    link: "https://cdn.productreview.com.au/resize/avatar/16c5b9cb-8944-361e-bb05-6b25224ee340?width=128&height=128",
  },
  {
    quote:
      "Very profesional team to deal with . highly recomend Dinar Exchange to anyone looking at buying or selling these curencies , extreamly happy with the service i recieved , keep up the good work, cheers Rod",
    author: "rod m.",
    source: "Verified Product Review",
    rating: 5,
    image:
      "https://cdn.productreview.com.au/resize/avatar/ed1ae5d3-fac9-37b5-a2c5-80f88d9f8697?width=128&height=128",
    link: "https://www.productreview.com.au/reviews/2a5e311d-58f3-54ff-9ce9-6dd740b20626",
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
      {/* Header line */}
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
                  {/* header row: avatar/name/stars + ProductReview badge link */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-white shadow relative">
                        <Image src={t.image} alt={t.author} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-semibold leading-tight">{t.author}</h3>
                        <div className="flex items-center gap-1 text-amber-500" aria-label="5 stars">
                          <Stars />
                        </div>
                      </div>
                    </div>

                    {/* ProductReview.com.au badge opens in new tab */}
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md  px-2.5 py-1.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      aria-label={`Open on ProductReview.com.au: ${t.author}`}
                    >
                      <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH03xgyajUYg-syCYeMY5nDdGXDbkj-D2F-A&s"
                        alt="ProductReview.com.au"
                        width={120}
                        height={24}
                        className="h-8 object-cover w-auto opacity-80"
                        priority={i < 3}
                      />
                      <span className="sr-only">View review</span>
                    </a>
                  </div>

                  {/* date */}
                  <p className="text-xs text-gray-500 mt-1">{t.date}</p>

                  {/* quote */}
                  <p className="mt-3 text-sm text-gray-700 line-clamp-5">{t.quote}</p>
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

      {/* local styles */}
      <style jsx global>{`
        .reviews-swiper { padding: 10px 0 24px; }
        .reviews-swiper .swiper-slide { height: auto; }
        .reviews-swiper .swiper-pagination-bullet { width: 6px; height: 6px; opacity: 0.5; }
        .reviews-swiper .swiper-pagination-bullet-active { opacity: 1; }
        /* card emphasis for active center slide */
        .reviews-swiper .swiper-slide-active article > div { box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
      `}</style>
    </section>
  );
}
