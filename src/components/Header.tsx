"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { navLinks, siteConfig } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "header-scrolled py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Nawigacja główna">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest text-text-dark/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: phone + CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="text-sm font-medium text-text-dark/70 hover:text-primary transition-colors flex items-center gap-2"
            aria-label={`Zadzwoń: ${siteConfig.phoneDisplay}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {siteConfig.phoneDisplay}
          </a>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-dark transition-colors"
          >
            Umów konsultację
          </a>
        </div>

        {/* Mobile nav */}
        <MobileNav />
      </div>
    </header>
  );
}
