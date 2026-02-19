"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { navLinks } from "@/lib/data";
import Logo from "./Logo";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const scrollYRef = useRef(0);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      scrollYRef.current = window.scrollY;
      document.documentElement.style.setProperty("--scroll-lock-top", `-${scrollYRef.current}px`);
      document.documentElement.classList.add("mobile-nav-open");
    } else {
      document.documentElement.classList.remove("mobile-nav-open");
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.documentElement.classList.remove("mobile-nav-open");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] flex items-center justify-center w-11 h-11 -mr-2 rounded-lg lg:hidden"
        aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <div className="relative w-5 h-3.5">
          <span
            className={`absolute left-0 h-[2px] w-full rounded-full bg-text-dark transition-all duration-300 ease-out ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full rounded-full bg-text-dark transition-all duration-200 ${
              open ? "opacity-0 scale-x-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-[2px] w-full rounded-full bg-text-dark transition-all duration-300 ease-out ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full -translate-y-full"
            }`}
          />
        </div>
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu nawigacyjne"
          className="fixed inset-0 z-[55] lg:hidden"
        >
          {/* Solid dark backdrop — no backdrop-blur, renders instantly */}
          <div
            className="absolute inset-0 bg-[#0f172a]/70 animate-[fadeIn_200ms_ease-out_forwards]"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel sliding from right */}
          <nav
            className="absolute top-0 right-0 h-full w-[min(20rem,85vw)] bg-[#F5F7FA] flex flex-col shadow-[-8px_0_30px_rgba(0,0,0,0.15)] animate-[slideInRight_280ms_cubic-bezier(0.32,0.72,0,1)_forwards]"
          >
            {/* Logo */}
            <div className="px-7 pt-7 pb-2">
              <Logo id="mobile-nav-logo" />
            </div>

            {/* Nav links */}
            <div
              className="flex-1 flex flex-col pt-4 pb-8 px-7 overflow-y-auto overscroll-contain"
            >
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="py-4 text-[1.05rem] font-medium text-text-dark border-b border-text-dark/[0.06] hover:text-primary transition-colors duration-200 animate-[slideInLink_350ms_ease-out_forwards] opacity-0"
                  style={{ animationDelay: `${60 + i * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}

              {/* CTA */}
              <div
                className="mt-8 animate-[slideInLink_350ms_ease-out_forwards] opacity-0"
                style={{ animationDelay: `${60 + navLinks.length * 50 + 60}ms` }}
              >
                <a
                  href="#kontakt"
                  onClick={close}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary/20 active:scale-[0.98] transition-transform"
                >
                  Umów konsultację
                </a>
              </div>
            </div>

            {/* Footer accent */}
            <div className="px-7 pb-7">
              <div className="h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-4" />
              <p className="text-[0.7rem] text-text-light tracking-wide">
                IT Legal &middot; Kancelaria prawna
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
