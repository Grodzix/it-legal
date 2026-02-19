"use client";

import { useState, useEffect, useCallback } from "react";
import { navLinks } from "@/lib/data";
import Logo from "./Logo";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("mobile-nav-open");
    } else {
      document.documentElement.classList.remove("mobile-nav-open");
    }
    return () => document.documentElement.classList.remove("mobile-nav-open");
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
      {/* Hamburger / X */}
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

      {/* Menu — always in DOM, controlled by CSS transitions */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        aria-label="Menu nawigacyjne"
        className={`fixed inset-0 z-[55] lg:hidden transition-[visibility] duration-300 ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#0f172a] transition-opacity duration-300 ${
            open ? "opacity-70" : "opacity-0"
          }`}
          onClick={close}
          onTouchMove={(e) => e.preventDefault()}
          aria-hidden="true"
        />

        {/* Panel */}
        <nav
          className={`absolute top-0 right-0 h-full w-[min(20rem,85vw)] bg-[#F5F7FA] flex flex-col shadow-[-8px_0_30px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-7 pt-7 pb-2">
            <Logo id="mobile-nav-logo" />
          </div>

          <div
            className="flex-1 flex flex-col pt-4 pb-8 px-7 overflow-y-auto overscroll-contain"
            onTouchMove={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="py-4 text-[1.05rem] font-medium text-text-dark border-b border-text-dark/[0.06] hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-8">
              <a
                href="/#kontakt"
                onClick={close}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary/20 active:scale-[0.98] transition-transform"
              >
                Umów konsultację
              </a>
            </div>
          </div>

          <div className="px-7 pb-7">
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
