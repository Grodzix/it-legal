"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { navLinks } from "@/lib/data";

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
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center">
        {/* Logo */}
        <Logo id="header-logo" />

        {/* Mobile nav */}
        <div className="lg:hidden ml-auto">
          <MobileNav />
        </div>
      </div>

      {/* Desktop nav — starts where the white/photo area begins */}
      <nav
        className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 absolute top-1/2 -translate-y-1/2 left-[52%] xl:left-[56%] right-0"
        aria-label="Nawigacja główna"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[0.8rem] font-medium uppercase tracking-[0.15em] text-text-dark/80 hover:text-primary transition-colors whitespace-nowrap"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
