"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Logo from "./Logo";
import { navLinks } from "@/lib/data";

function lockBody(scrollYRef: React.RefObject<number>) {
  scrollYRef.current = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollYRef.current}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
}

function unlockBody(scrollYRef: React.RefObject<number>) {
  const y = scrollYRef.current;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  window.scrollTo(0, y);
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollYRef = useRef(0);
  const isLockedRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (isLockedRef.current) unlockBody(scrollYRef);
    };
  }, []);

  const handleToggle = useCallback(() => {
    if (isLockedRef.current) {
      unlockBody(scrollYRef);
      isLockedRef.current = false;
      setMobileOpen(false);
    } else {
      lockBody(scrollYRef);
      isLockedRef.current = true;
      setMobileOpen(true);
    }
  }, []);

  const handleNavClick = useCallback(() => {
    unlockBody(scrollYRef);
    isLockedRef.current = false;
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled ? "header-scrolled py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
          <Logo id="header-logo" />

          <button
            onClick={handleToggle}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
          >
            <span className={`block h-[2px] w-6 bg-text-dark rounded transition-all duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-6 bg-text-dark rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] w-6 bg-text-dark rounded transition-all duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>

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
      </header>

      {/* Mobile nav — OUTSIDE header to avoid iOS Safari backdrop-filter containing block bug */}
      {mobileOpen && (
        <nav
          className="fixed inset-0 z-[55] bg-bg-light flex flex-col items-center justify-center gap-8 lg:hidden"
          aria-label="Menu mobilne"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-xl font-medium uppercase tracking-[0.15em] text-text-dark/80 active:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
