"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    router.push("/user/login");
  };

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
      action: handleLogout,
    },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link className="flex items-center justify-center cursor-pointer space-x-2" href="/user/dashboard">
          <svg
            className="w-8 h-8 text-orange"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L3 9V22H21V9L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-bold text-gray-800">
            Dinar<span className="text-orange">Exchange</span>
          </span>
        </Link>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 focus:outline-none"
            aria-label="Profile menu"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                Nahid Ferdous Priom
              </p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <div className="relative cursor-pointer w-10 h-10 rounded-full bg-gray-100 border-2 border-orange overflow-hidden">
              <Image
                src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
                alt="Profile"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute z-50 right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-700">
                    nahid.priom.06@gmail.com
                  </p>
                </div>
                {profileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setIsProfileOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange transition-colors"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
