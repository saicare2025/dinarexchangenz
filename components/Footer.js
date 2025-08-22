"use client";

import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import logo from "../app/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-100 to-orange-100 pt-16 pb-8 w-full overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Company Info */}
          <div className="w-full">
            <Link href="/" className="flex items-center gap-2 mb-6 w-full">
              <Image
                src={logo}
                alt="Dinar Exchange Logo"
                width={180}
                height={50}
                className="h-auto max-w-[180px] w-auto"
              />
              <span className="text-sm font-medium text-blue-900 px-2 py-1 rounded flex items-center gap-1">
                NZ
                <Image
                  src="https://static.vecteezy.com/system/resources/thumbnails/012/024/958/small_2x/new-zealand-flag-with-grunge-texture-png.png"
                  alt="New Zealand Flag"
                  width={16}
                  height={12}
                  className="rounded-sm"
                  style={{ minWidth: 16, minHeight: 12 }} // Prevents layout shift
                />
              </span>
            </Link>
            <p className="text-blue-900 mb-6 text-sm sm:text-base">
              New Zealand&apos;s most trusted Iraqi Dinar exchange platform. We
              provide authentic banknotes with guaranteed security and fast
              delivery.
            </p>
            <div className="flex items-center gap-3 bg-orange-100 p-3 rounded-lg w-full">
              <ShieldCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              <span className="font-medium text-sm sm:text-base">
                100% Secure & Authentic
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ArrowRightIcon className="w-5 h-5 text-orange-400" />
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/buydinar"
                  className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  Buy Iraqi Dinar
                </Link>
              </li>
              <li>
                <Link
                  href="/buyzimdoller"
                  className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  Buy Zimbabwe Dollar
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  FAQ&apos;s
                </Link>
              </li>
              
              <li>
                <Link
                  href="/contact"
                  className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-orange-400" />
              Contact Us
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-0.5" />
                <div>
                  <a
                    href="tel:+6498724693"
                    className="hover:text-orange-400 transition-colors block text-sm sm:text-base"
                  >
                    +64 9 872 4693
                  </a>
                  <span className="text-xs sm:text-sm text-blue-700">
                    New Zealand
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-0.5" />
                <div>
                  <a
                    href="tel:+61417460236"
                    className="hover:text-orange-400 transition-colors block text-sm sm:text-base"
                  >
                    +61 417 460 236
                  </a>
                  <span className="text-xs sm:text-sm text-blue-700">
                    Australia
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-0.5" />
                <a
                  href="mailto:dinars@dinarexchange.co.nz"
                  className="hover:text-orange-400 transition-colors text-sm sm:text-base"
                >
                  dinars@dinarexchange.co.nz
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-0.5" />
                <span className="text-blue-900 text-sm sm:text-base">
                  Auckland, New Zealand
                </span>
              </li>
            </ul>
          </div>

          {/* Payment Info */}
          <div className="w-full">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <BanknotesIcon className="w-5 h-5 text-orange-400" />
              Payment & Security
            </h3>
            <div className="bg-orange-100 p-3 sm:p-4 rounded-lg mb-6">
              <h4 className="font-medium mb-2 text-sm sm:text-base">
                Secure Payment Processing
              </h4>
              <p className="text-blue-900 text-xs sm:text-sm">
                We only accept payment via Bank Transfer.
              </p>
            </div>
            <Link
              href="/buydinar"
              className="inline-flex items-center justify-center gap-2 bg-blue hover:bg-orange text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              Start Your Order
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 my-6 sm:my-8"></div>

        {/* Bottom Footer */}
        <div className="flex justify-center items-center gap-4 text-center md:text-left">
          <p className="text-blue-700 text-xs sm:text-sm">
            © {new Date().getFullYear()} Dinar Exchange New Zealand. All rights
            reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}
