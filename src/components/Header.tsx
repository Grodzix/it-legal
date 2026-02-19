"use client";

import { useState, useEffect, useCallback } from "react";
import Logo from "./Logo";
import { navLinks } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const close = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "header-scrolled py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
        <Logo id="header-logo" />

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden relative z-60 flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
          aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`block h-[2px] w-6 bg-text-dark rounded transition-all duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-6 bg-text-dark rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-6 bg-text-dark rounded transition-all duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Desktop nav */}
      <nav
        className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 absolute top-1/2 -translate-y-1/2 left-[52%] xl:left-[56%] right-5 sm:right-8 xl:right-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        aria-label="Nawigacja główna"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-3 py-2 rounded-lg text-[0.8rem] font-medium uppercase tracking-[0.15em] text-text-dark/80 hover:text-primary hover:bg-primary/[0.06] transition-all duration-200 whitespace-nowrap"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Mobile nav overlay */}
      <div
        className={`fixed inset-0 bg-bg-light/95 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-6 transition-all duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={close}
            className="text-xl font-medium uppercase tracking-[0.15em] text-text-dark/80 hover:text-primary transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
