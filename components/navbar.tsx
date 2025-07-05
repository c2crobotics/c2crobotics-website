import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-[#1a1a1f] w-full z-50">
      <div className="max-w mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 min-w-[200px]">
            <img
              src="/logo.png"
              alt={siteConfig.name}
              className="h-16 w-auto"
            />
            <div className="hidden sm:block text-white">
              <div className="font-bold text-xl leading-none uppercase">{siteConfig.name}</div>
              <div className="font-bold text-l tracking-wide uppercase">Robotics</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-20 justify-end">
            {siteConfig.navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-lg font-bold tracking-wide hover:underline transition whitespace-nowrap px-2 py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#000000] bg-opacity-80 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 px-8 pt-32">
          {siteConfig.navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-center text-xl font-bold tracking-wide py-3 border-b border-white/10 hover:bg-[#1a1a1f] rounded transition"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Close button */}
        <button
          className="absolute top-3 right-4 text-white text-5xl"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          &times;
        </button>
      </div>
    </nav>
  );
}