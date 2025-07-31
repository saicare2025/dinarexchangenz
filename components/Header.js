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
  EnvelopeOpenIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const CONTACT_INFO = [
  { text: "dinars@dinarexchange.com.au", icon: <EnvelopeOpenIcon className="w-4 h-4" /> },
  { text: "0417 460 236", icon: <PhoneArrowUpRightIcon className="w-4 h-4" /> },
  { text: "1300 856 881", icon: <PhoneArrowUpRightIcon className="w-4 h-4" /> },
];

const NAV_LINKS = [
  { name: "Home", href: "/", icon: <HomeIcon className="w-5 h-5" /> },
  { name: "Buy Iraqi Dinar", href: "/buy/iraqi-dinar", icon: <CurrencyDollarIcon className="w-5 h-5" /> },
  { name: "Buy Zimbabwe Dollar", href: "/buy/zimbabwe-dollar", icon: <CurrencyDollarIcon className="w-5 h-5" /> },
  { name: "About Us", href: "/about", icon: <UserCircleIcon className="w-5 h-5" /> },
  { name: "FAQ", href: "/faq", icon: <QuestionMarkCircleIcon className="w-5 h-5" /> },
  { name: "Contact Us", href: "/contact", icon: <PhoneIcon className="w-5 h-5" /> },
];

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentContactIndex, setCurrentContactIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
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
    { icon: <HomeIcon className="w-5 h-5" />, label: "Dashboard", action: () => router.push("/user/dashboard") },
    { icon: <UserCircleIcon className="w-5 h-5" />, label: "My Profile", action: () => router.push("/user/profile") },
    { icon: <EnvelopeIcon className="w-5 h-5" />, label: "Messages", action: () => router.push("/user/messages") },
    { icon: <ArrowLeftOnRectangleIcon className="w-5 h-5" />, label: "Sign Out", action: () => router.push("/user/login") },
  ];

  const getContactHref = (text) => 
    text.includes("@") ? `mailto:${text}` : `tel:${text.replace(/\s/g, "")}`;

  return (
    <header className="sticky top-0 z-50">
      {/* Top Contact Bar */}
      <div className="bg-gray-800 text-white text-sm">
        <div className="container max-w-7xl mx-auto px-4 py-0 lg:py-2 flex justify-between items-center">
          {/* Desktop Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            {CONTACT_INFO.map((item, index) => (
              <a
                key={index}
                href={getContactHref(item.text)}
                className="flex items-center space-x-1 hover:text-orange-400 transition-colors"
              >
                {item.icon}
                <span>{item.text}</span>
              </a>
            ))}
          </div>

        

          <button className="hidden lg:flex items-center space-x-1 bg-orange-500 text-white px-4 py-1 rounded-md hover:bg-orange-600 transition-colors">
            <ShoppingCartIcon className="w-4 h-4" />
            <span>Order Now</span>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`bg-white shadow-sm transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}>
        <div className="container max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
            <LogoIcon />
            <span className="text-xl font-bold text-gray-800">
              Dinar<span className="text-orange-500">Exchange</span>
            </span>
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
function LogoIcon() {
  return (
    <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 9V22H21V9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function NavLink({ href, name, icon }) {
  return (
    <Link href={href} className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors px-2 py-1 rounded hover:bg-gray-50">
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
              <p className="text-sm font-medium text-gray-700">nahid.priom.06@gmail.com</p>
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

ProfileDropdown.displayName = 'ProfileDropdown';

function MobileMenu({ isOpen, navLinks, profileMenuItems, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white border-t border-gray-200">
      <nav className="px-2 py-3 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md"
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
              onClick={() => { item.action(); onClose(); }}
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