"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/app/assets/logo.png";

import {
  EnvelopeOpenIcon,
  PhoneArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  ShoppingCartIcon,
  UserCircleIcon, // <- remove if you don't want the icon anywhere
} from "@heroicons/react/24/outline";
import { buildLoginUrl } from "@/app/lib/auth";

/* -------------------- Constants -------------------- */
const CONTACT_INFO = [
  {
    text: "dinars@dinarexchange.co.nz",
    icon: <EnvelopeOpenIcon className="w-4 h-4" />,
    showOnMobile: true,
  },
  {
    text: "+64 9 872 4693",
    icon: <PhoneArrowUpRightIcon className="w-4 h-4" />,
    showOnMobile: false,
  },
  {
    text: "+61 417 460 236",
    icon: <PhoneArrowUpRightIcon className="w-4 h-4" />,
    showOnMobile: true,
  },
];

const NAV_LINKS = [
  { name: "Home", href: "/", icon: <HomeIcon className="w-5 h-5" /> },
  {
    name: "Buy Iraqi Dinar",
    href: "/buydinar",
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
  },
  {
    name: "Buy Zimbabwe Dollar",
    href: "/buyzimdoller",
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
  },
  {
    name: "About Us",
    href: "/about",
    icon: <UserCircleIcon className="w-5 h-5" />,
  },
  {
    name: "Contact Us",
    href: "/contact",
    icon: <PhoneIcon className="w-5 h-5" />,
  },
];

/* -------------------- Small Components -------------------- */
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

function LimitedTimeOffer() {
  return (
    <div className="relative group">
      <div className="flex items-center space-x-3 px-4 py-2 shadow-lg hover:shadow-orange/20 transition-all">
        <div className="flex gap-4 justify-center items-center">
          <span className="font-bold text-xs uppercase tracking-wider">
            🎁 LIMITED TIME: Free 20 Billion ZIM with 1 Million IQD orders!
          </span>
          <div className="flex items-center space-x-1">
            <span className="text-xs hidden lg:block font-medium">
              Ends in:
            </span>
            <span className="font-mono text-sm font-bold bg-orange text-white px-2 py-0.5 rounded">
              <CountdownTimer />
            </span>
          </div>
        </div>
      </div>
      <div className="absolute hidden group-hover:block bg-white text-blue p-2 rounded-md shadow-lg mt-1 text-xs whitespace-nowrap z-10">
        Limited time offer! Don&apos;t miss this special discount!
      </div>
    </div>
  );
}

function NavLink({ href, name, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-1 font-bold text-gray-900 hover:text-orange transition-colors px-2 py-1 rounded hover:bg-gray-50"
    >
      <span className="hidden lg:inline-block">{icon}</span>
      <span className="text-sm font-medium">{name}</span>
    </Link>
  );
}

function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      className="lg:hidden p-2 text-gray-700 hover:text-orange focus:outline-none flex items-center gap-2"
      onClick={onClick}
      aria-label="Toggle menu"
      type="button"
    >
      {isOpen ? (
        <>
          <XMarkIcon className="h-6 w-6" />
          <span className="text-sm font-bold">CLOSE</span>
        </>
      ) : (
        <>
          <Bars3Icon className="h-6 w-6" />
          <span className="text-sm font-bold">MENU</span>
        </>
      )}
    </button>
  );
}

/* ------------- Mobile Menu (profile removed) ------------- */
function MobileMenu({ isOpen, navLinks, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="lg:hidden bg-white border-t border-gray-200 z-40">
      <nav className="px-2 py-3 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center px-3 py-2 text-base font-bold text-gray-900 hover:text-orange hover:bg-gray-50 rounded-md"
            onClick={onClose}
          >
            <span className="mr-3">{link.icon}</span>
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

/* -------------------- Header (profile removed) -------------------- */
export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleClick = () => {
    const url = buildLoginUrl("/"); // or "/profile"
    // full page redirect to Base44 login
    window.location.assign(url);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#0A2540] text-white text-sm">
        <div className="container max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            {pathname === "/buyzimdoller" ? (
              <LimitedTimeOffer />
            ) : (
              <div className="flex items-center space-x-4">
                {CONTACT_INFO.map((info, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center lg:ml-0 py-3 ml-6 justify-between space-x-1 ${
                      !info.showOnMobile ? "hidden sm:flex" : ""
                    }`}
                  >
                    {info.icon}
                    {info.text.includes("@") ? (
                      <a
                        href={`mailto:${info.text}`}
                        className="text-xs sm:text-sm hover:underline"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <a
                        href={`tel:${info.text.replace(/\s/g, "")}`}
                        className="text-xs sm:text-sm hover:underline"
                      >
                        {info.text}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/buydinar" className="hidden lg:flex">
            <button className="cursor-pointer flex items-center gap-2 text-orange-100 px-4 py-2 rounded-md hover:opacity-90 transition-opacity shadow-md hover:shadow-orange/30">
              <ShoppingCartIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Order Now</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={`bg-white transition-all duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="container w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
            aria-label="Go to homepage"
          >
            <Image
              src={logo} // <-- replace with your logo path or import
              alt="Dinar Exchange New zealand"
              width={200}
              height={60}
              priority
            />
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-800">NZ</span>
              <Image
                src="https://static.vecteezy.com/system/resources/thumbnails/012/024/958/small_2x/new-zealand-flag-with-grunge-texture-png.png"
                alt="New Zealand Flag"
                width={20}
                height={14}
                className="rounded-sm"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.name} {...link} />
            ))}
          </nav>
          <button
            type="button" // <- important if this sits inside a <form>
            onClick={handleClick}
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-orange rounded p-1"
            aria-label="Profile menu"
          >
            <UserCircleIcon className="w-9 h-9 text-orange bg-orange-50 rounded-full border-2 border-orange shadow" />
            <span className="text-sm font-medium text-gray-700">Profile</span>
          </button>

          {/* Mobile Menu Button */}
          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          />
        </div>

        {/* Mobile Menu (no profile section) */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          navLinks={NAV_LINKS}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}
