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
    <footer className="bg-gradient-to-r from-blue-100 to-orange-100 pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src={logo}
                alt="Dinar Exchange Logo"
                width={180}
                height={50}
                priority
              />
              <span className="text-sm font-medium text-blue-900 px-2 py-1 rounded flex items-center gap-1">
                NZ
                <Image
                  src="https://static.vecteezy.com/system/resources/thumbnails/012/024/958/small_2x/new-zealand-flag-with-grunge-texture-png.png"
                  alt="NZ Flag"
                  width={16}
                  height={12}
                  className="rounded-sm"
                />
              </span>
            </Link>
            <p className="text-blue-900 mb-6">
              New Zealand&apos;s most trusted Iraqi Dinar exchange platform. We provide authentic banknotes with guaranteed security and fast delivery.
            </p>
            <div className="flex items-center gap-3 bg-orange/20 p-3 rounded-lg">
              <ShieldCheckIcon className="w-6 h-6 text-orange-400" />
              <span className="font-medium">100% Secure & Authentic</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ArrowRightIcon className="w-5 h-5 text-orange-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/buydinar" className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2">
                  Buy Iraqi Dinar
                </Link>
              </li>
              <li>
                <Link href="/buyzimdoller" className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2">
                  Buy Zimbabwe Dollar
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2">
                  FAQ&apos;s
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-900 hover:text-orange-400 transition-colors flex items-center gap-2">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-orange-400" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <PhoneIcon className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <a href="tel:+6498724693" className="hover:text-orange-400 transition-colors block">
                    +64 9 872 4693
                  </a>
                  <span className="text-sm text-blue-700">New Zealand</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <a href="tel:+61417460236" className="hover:text-orange-400 transition-colors block">
                    +61 417 460 236
                  </a>
                  <span className="text-sm text-blue-700">Australia</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <EnvelopeIcon className="w-5 h-5 text-orange-400 mt-0.5" />
                <a href="mailto:dinars@dinarexchange.co.nz" className="hover:text-orange-400 transition-colors">
                  dinars@dinarexchange.co.nz
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-orange-400 mt-0.5" />
                <span className="text-blue-900">Auckland, New Zealand</span>
              </li>
            </ul>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <BanknotesIcon className="w-5 h-5 text-orange-400" />
              Payment & Security
            </h3>
            <div className="bg-orange/20 p-4 rounded-lg mb-6">
              <h4 className="font-medium mb-2">Secure Payment Processing</h4>
              <p className="text-blue-900 text-sm">
                We only accept payment via Bank Transfer.
              </p>
            </div>
            <Link 
              href="/order" 
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Start Your Order
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-700 text-sm">
            © {new Date().getFullYear()} Dinar Exchange New Zealand. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-blue-700 hover:text-orange-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-blue-700 hover:text-orange-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}