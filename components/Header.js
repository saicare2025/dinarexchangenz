"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  EnvelopeIcon,
  HomeIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  ShoppingCartIcon,
  PhoneArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/24/outline";
import logo from "../app/assets/logo.png";

const CONTACT_INFO = [
  { text: "dinars@dinarexchange.co.nz", icon: <EnvelopeOpenIcon className="w-4 h-4" />, showOnMobile: true },
  { text: "+64 9 872 4693", icon: <PhoneArrowUpRightIcon className="w-4 h-4" />, showOnMobile: false },
  { text: "+61 417 460 236", icon: <PhoneArrowUpRightIcon className="w-4 h-4" />, showOnMobile: true },
];

const NAV_LINKS = [
  { name: "Home", href: "/", icon: <HomeIcon className="w-5 h-5" /> },
  { name: "Buy Iraqi Dinar", href: "/buydinar", icon: <CurrencyDollarIcon className="w-5 h-5" /> },
  { name: "Buy Zimbabwe Dollar", href: "/buyzimdoller", icon: <CurrencyDollarIcon className="w-5 h-5" /> },
  { name: "About Us", href: "/about", icon: <UserCircleIcon className="w-5 h-5" /> },
  { name: "Contact Us", href: "/contact", icon: <PhoneIcon className="w-5 h-5" /> },
];
function buildLoginUrl(targetPath) {
  const APP = process.env.NEXT_PUBLIC_BASE44_APP_URL;        // must be https://portal.dinarexchange.co.nz
  const LOGIN = process.env.NEXT_PUBLIC_BASE44_LOGIN_URL;    // https://app.base44.com/login

  if (!APP || !LOGIN) {
    console.error("Missing env vars: NEXT_PUBLIC_BASE44_APP_URL or NEXT_PUBLIC_BASE44_LOGIN_URL");
    // Hard fallback for debugging:
    return "https://app.base44.com/login?from_url=" + encodeURIComponent("https://portal.dinarexchange.co.nz/");
  }

  const normalized = targetPath?.startsWith("/") ? targetPath : `/${targetPath || ""}`;
  const from = `${APP}${normalized}`;

  // Simple sanity checks
  if (!from.startsWith("https://portal.dinarexchange.co.nz")) {
    console.warn("from_url is not on portal.dinarexchange.co.nz:", from);
  }

  const url = `${LOGIN}?from_url=${encodeURIComponent(from)}`;
  console.log("LOGIN URL →", url); // <— check this in the browser console
  return url;
}


// Offer Timer (unchanged)
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 0 });
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
            <span className="text-xs hidden  lg:block font-medium">Ends in:</span>
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

// ============ Profile Dropdown ============
const ProfileDropdown = forwardRef(
  ({ isOpen, onToggle, user, menuItems, onLogin, onSignup, onLogout }, ref) => (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-orange rounded p-1"
        aria-label="Profile menu"
        aria-expanded={isOpen}
      >
        <UserCircleIcon className="w-9 h-9 text-orange bg-orange-50 rounded-full border-2 border-orange shadow" />
        <span className="text-sm font-medium text-gray-700">Profile</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
          <div className="py-1">
            {!user ? (
              <div className="flex flex-col px-4 py-2">
                <button onClick={onLogin} className="mb-2 py-2 px-3 rounded bg-orange text-white hover:bg-orange-600 transition">
                  Log In
                </button>
                <button onClick={onSignup} className="py-2 px-3 rounded border border-orange text-orange hover:bg-orange-50 transition">
                  Sign Up
                </button>
              </div>
            ) : (
              <>
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange transition-colors"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <button onClick={onLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50 font-bold transition-colors">
                  <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
);
ProfileDropdown.displayName = "ProfileDropdown";

// ============ Mobile Menu ============
function MobileMenu({
  isOpen,
  navLinks,
  user,
  profileMenuItems,
  onClose,
  onLogin,
  onSignup,
  onLogout,
}) {
  return !isOpen ? null : (
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
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center px-3 py-2">
            <UserCircleIcon className="w-9 h-9 text-orange bg-orange-50 rounded-full border-2 border-orange shadow mr-3" />
            <div><p className="text-sm font-medium text-gray-700">Profile</p></div>
          </div>
          {!user ? (
            <div className="flex flex-col px-3 py-2">
              <button
                onClick={() => { onLogin(); onClose(); }}
                className="mb-2 py-2 px-3 rounded bg-orange text-white hover:bg-orange-600 transition"
              >
                Log In
              </button>
              <button
                onClick={() => { onSignup(); onClose(); }}
                className="py-2 px-3 rounded border border-orange text-orange hover:bg-orange-50 transition"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <>
              {profileMenuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { item.action(); onClose(); }}
                  className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-orange hover:bg-gray-50 rounded-md"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { onLogout(); onClose(); }}
                className="flex w-full items-center px-3 py-2 text-base font-bold text-red-600 hover:bg-gray-50 rounded-md"
              >
                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

// ============ Header ============
export default function Header() {
   const APP = process.env.NEXT_PUBLIC_BASE44_APP_URL; // safe to use for deep-links

  const handleLogin = () => {
    window.location.href = buildLoginUrl("/");        // start with "/" to confirm flow
  };

  const handleSignup = () => {
    window.location.href = buildLoginUrl("/");        // same as login
  };

  // Example deep-links (only if these pages exist in Base44 app)
  const profileMenuItems = [
    { icon: <HomeIcon className="w-5 h-5" />, label: "Orders",   action: () => window.location.assign(`${APP}/orders`) },
    { icon: <EnvelopeIcon className="w-5 h-5" />, label: "Messages", action: () => window.location.assign(`${APP}/messages`) },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Local demo user state (you can remove if Base44 handles UI state entirely)
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !(profileRef.current).contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // You can keep a local "logout" UX if needed, but real logout should happen in Base44 app.
  const handleLogout = () => {
    setUser(null);
    if (typeof window !== "undefined") localStorage.removeItem("user");
    setIsProfileOpen(false);
    router.push("/");
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
                  <div key={idx} className={`flex items-center lg:ml-0 py-3 ml-6 justify-between space-x-1 ${!info.showOnMobile ? "hidden sm:flex" : ""}`}>
                    {info.icon}
                    {info.text.includes("@") ? (
                      <a href={`mailto:${info.text}`} className="text-xs sm:text-sm hover:underline">{info.text}</a>
                    ) : (
                      <a href={`tel:${info.text.replace(/\s/g, "")}`} className="text-xs sm:text-sm hover:underline">{info.text}</a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link href="/buydinar">
            <button className="hidden cursor-pointer lg:flex items-center gap-2 text-orange-100 px-3 lg:px-4 py-1.5 lg:py-2 rounded-md hover:opacity-90 transition-opacity shadow-md hover:shadow-orange/30">
              <ShoppingCartIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Order Now</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`bg-white shadow-sm transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}>
        <div className="container w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 rounded focus:outline-none focus:ring-2 focus:ring-orange" aria-label="Go to homepage">
            <Image src={logo} alt="Company Logo" width={200} height={60} priority />
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
            {NAV_LINKS.map((link) => (<NavLink key={link.name} {...link} />))}
          </nav>

          {/* Mobile Menu Button */}
          <MobileMenuButton isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

          {/* Profile Dropdown */}
          <div className="hidden lg:block">
            <ProfileDropdown
              ref={profileRef}
              isOpen={isProfileOpen}
              onToggle={() => setIsProfileOpen(!isProfileOpen)}
              user={user}
              menuItems={profileMenuItems}
              onLogin={handleLogin}
              onSignup={handleSignup}
              onLogout={handleLogout}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          navLinks={NAV_LINKS}
          user={user}
          profileMenuItems={profileMenuItems}
          onClose={() => setIsMobileMenuOpen(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
}
