"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  EnvelopeIcon,
  HomeIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  ShoppingCartIcon,
  PhoneArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/24/outline";
import logo from "../app/assets/logo.png";

const CONTACT_INFO = [
  {
    text: "dinars@dinarexchange.com.au",
    icon: <EnvelopeOpenIcon className="w-4 h-4" />,
  },
  { text: "0417 460 236", icon: <PhoneArrowUpRightIcon className="w-4 h-4" /> },
  { text: "1300 856 881", icon: <PhoneArrowUpRightIcon className="w-4 h-4" /> },
];

const NAV_LINKS = [
  { name: "Home", href: "/", icon: <HomeIcon className="w-5 h-5" /> },
  {
    name: "Buy Iraqi Dinar",
    href: "/buydiner",
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
  },
  {
    name: "Buy Zimbabwe Dollar",
    href: "/buydiner",
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
  },
  {
    name: "About Us",
    href: "/about",
    icon: <UserCircleIcon className="w-5 h-5" />,
  },
  {
    name: "FAQ",
    href: "/faq",
    icon: <QuestionMarkCircleIcon className="w-5 h-5" />,
  },
  {
    name: "Contact Us",
    href: "/contact",
    icon: <PhoneIcon className="w-5 h-5" />,
  },
];

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const { hours, minutes, seconds } = prev;
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-mono text-xs">
      {String(timeLeft.hours).padStart(2, "0")}:
      {String(timeLeft.minutes).padStart(2, "0")}:
      {String(timeLeft.seconds).padStart(2, "0")}
    </span>
  );
};

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const profileMenuItems = [
    {
      icon: <HomeIcon className="w-5 h-5" />,
      label: "Dashboard",
      action: () => router.push("/user/dashboard"),
    },
    {
      icon: <UserCircleIcon className="w-5 h-5" />,
      label: "My Profile",
      action: () => router.push("/user/profile"),
    },
    {
      icon: <EnvelopeIcon className="w-5 h-5" />,
      label: "Messages",
      action: () => router.push("/user/messages"),
    },
    {
      icon: <ArrowLeftOnRectangleIcon className="w-5 h-5" />,
      label: "Sign Out",
      action: () => router.push("/user/login"),
    },
  ];

  const getContactHref = (text) =>
    text.includes("@") ? `mailto:${text}` : `tel:${text.replace(/\s/g, "")}`;

  return (
    <header className="sticky top-0 z-50">
      {/* Top Contact Bar */}
      <div className="bg-blue-900 text-white text-sm">
        <div className="container max-w-7xl mx-auto px-4 py-0 lg:py-2 flex justify-between items-center">
          {/* Desktop Contact Info and Offer */}
          <div className="flex items-center space-x-6">
            {CONTACT_INFO.map((item, index) => (
              <a
                key={index}
                href={getContactHref(item.text)}
                className={`hidden lg:flex items-center space-x-1 hover:text-orange-400 transition-colors ${
                  item.text.includes("phone")
                    ? "animate-pulse hover:animate-none"
                    : ""
                }`}
              >
                {item.icon}
                <span>{item.text}</span>
              </a>
            ))}

            {/* Enhanced Offer Information with Countdown */}
            <div className="relative group ml-2">
              <div className="flex items-center my-2 space-x-3 bg-gradient-to-r from-orange-800 to-orange-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all">
                <span className="text-xl">🔥</span>
                <div className="flex gap-4 justify-center items-center">
                  <span className="font-bold text-sm uppercase tracking-wider">
                    Get Discount 10% OFF
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium">Ends in:</span>
                    <span className="font-mono text-sm font-bold bg-orange-700 px-2 py-0.5 rounded">
                      <CountdownTimer />
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute hidden group-hover:block bg-white text-blue-900 p-2 rounded-md shadow-lg mt-1 text-xs whitespace-nowrap z-10">
                Limited time offer! Don't miss this special discount!
              </div>
            </div>
          </div>

          

          {/* Order Now Button - Visible on all screens */}
          <button className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-orange-800 to-orange-700 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-md hover:opacity-90 transition-opacity shadow-md hover:shadow-orange-700/30">
            <ShoppingCartIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Order Now</span>
          </button>
        </div>
      </div>
      {/* Main Navigation */}
      <div
        className={`bg-white shadow-sm transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Go to homepage"
          >
            <Image
              src={logo}
              alt="Company Logo"
              width={240}
              height={60}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.name} {...link} />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          {/* Profile Dropdown */}
          <ProfileDropdown
            ref={profileRef}
            isOpen={isProfileOpen}
            onToggle={() => setIsProfileOpen(!isProfileOpen)}
            menuItems={profileMenuItems}
          />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          navLinks={NAV_LINKS}
          profileMenuItems={profileMenuItems}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}

// Sub-components
function NavLink({ href, name, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-1 font-bold text-gray-900 hover:text-orange-500 transition-colors px-2 py-1 rounded hover:bg-gray-50"
    >
      <span className="hidden lg:inline-block">{icon}</span>
      <span className="text-sm font-medium">{name}</span>
    </Link>
  );
}

function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      className="lg:hidden p-2 text-gray-700 hover:text-orange-500 focus:outline-none flex items-center gap-2"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <>
          <XMarkIcon className="h-6 w-6 text-sm text-shadow-gray-800 font-bold" />
          <span className="text-sm text-shadow-gray-800 font-bold">CLOSE</span>
        </>
      ) : (
        <>
          <Bars3Icon className="h-6 w-6 text-sm text-shadow-gray-800 font-bold" />
          <span className="text-sm text-shadow-gray-800 font-bold">MENU</span>
        </>
      )}
    </button>
  );
}

const ProfileDropdown = forwardRef(({ isOpen, onToggle, menuItems }, ref) => {
  return (
    <div className="hidden lg:block relative" ref={ref}>
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-1"
        aria-label="Profile menu"
        aria-expanded={isOpen}
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-700">Nahid Priom</p>
          <p className="text-xs text-gray-500">User</p>
        </div>
        <div className="relative w-10 h-10 rounded-full bg-gray-100 border-2 border-orange-500 overflow-hidden">
          <Image
            src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020"
            alt="Profile"
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-700">
                nahid.priom.06@gmail.com
              </p>
            </div>
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors"
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

ProfileDropdown.displayName = "ProfileDropdown";

function MobileMenu({ isOpen, navLinks, profileMenuItems, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white border-t border-gray-200">
      <nav className="px-2 py-3 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center px-3 py-2 text-base font-bold text-gray-900 hover:text-orange-500 hover:bg-gray-50 rounded-md"
            onClick={onClose}
          >
            <span className="mr-3">{link.icon}</span>
            {link.name}
          </Link>
        ))}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center px-3 py-2">
            <div className="relative w-10 h-10 rounded-full bg-gray-100 border-2 border-orange-500 overflow-hidden mr-3">
              <Image
                src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020"
                alt="Profile"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Nahid Priom</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
          {profileMenuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.action();
                onClose();
              }}
              className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
