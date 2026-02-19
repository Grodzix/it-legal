"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { navLinks } from "@/lib/data";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const scrollYRef = useRef(0);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      {/* Hamburger / X toggle */}
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

      {/* Fullscreen overlay menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacyjne"
        className={`fixed inset-0 z-[55] lg:hidden transition-all duration-300 ${
          open ? "visible" : "invisible"
        }`}
        onTouchMove={(e) => e.preventDefault()}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-bg-dark/60 backdrop-blur-md transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
          aria-hidden="true"
        />

        {/* Panel — slides from right */}
        <nav
          className={`absolute top-0 right-0 h-full w-[min(20rem,85vw)] bg-bg-light flex flex-col shadow-[-8px_0_30px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Nav links */}
          <div
            className="flex-1 flex flex-col pt-24 pb-8 px-8 overflow-y-auto overscroll-contain"
            onTouchMove={(e) => e.stopPropagation()}
          >
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className={`py-4 text-[1.05rem] font-medium text-text-dark border-b border-text-dark/[0.06] hover:text-primary transition-colors duration-200 ${
                  open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
                style={{
                  transitionDelay: open ? `${80 + i * 40}ms` : "0ms",
                  transitionProperty: "color, opacity, transform",
                  transitionDuration: open ? "400ms" : "150ms",
                }}
              >
                {link.label}
              </a>
            ))}

            {/* CTA */}
            <div
              className={`mt-8 transition-all ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{
                transitionDelay: open ? `${80 + navLinks.length * 40 + 40}ms` : "0ms",
                transitionDuration: open ? "400ms" : "150ms",
              }}
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
          <div className="px-8 pb-8">
            <div className="h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-4" />
            <p className="text-[0.7rem] text-text-light tracking-wide">
              IT Legal &middot; Kancelaria prawna
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
