"use client";

import { useState, useEffect } from "react";
import { navLinks, siteConfig } from "@/lib/data";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 flex flex-col items-center justify-center w-10 h-10 gap-1.5"
        aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={open}
      >
        <span
          className={`block w-6 h-0.5 bg-text-dark transition-all duration-300 ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-text-dark transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-text-dark transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <nav
        className={`fixed top-0 right-0 z-40 h-full w-72 bg-bg-light shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menu mobilne"
      >
        <div className="flex flex-col pt-24 px-8 gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-text-dark py-3 border-b border-bg-medium hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-6 flex flex-col gap-4">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="text-sm text-text-medium hover:text-primary transition-colors"
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
            >
              Umów konsultację
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
