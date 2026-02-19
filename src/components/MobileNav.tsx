"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { navLinks } from "@/lib/data";
import Logo from "./Logo";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollYRef = useRef(0);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) close();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const html = document.documentElement;
    scrollYRef.current = window.scrollY;

    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyLeft = body.style.left;
    const prevBodyRight = body.style.right;
    const prevBodyWidth = body.style.width;
    const prevBodyTouchAction = body.style.touchAction;
    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlOverscrollBehavior = html.style.overscrollBehavior;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    return () => {
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.left = prevBodyLeft;
      body.style.right = prevBodyRight;
      body.style.width = prevBodyWidth;
      body.style.touchAction = prevBodyTouchAction;
      html.style.overflow = prevHtmlOverflow;
      html.style.overscrollBehavior = prevHtmlOverscrollBehavior;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

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

      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal={open ? true : undefined}
            aria-hidden={!open}
            aria-label="Menu nawigacyjne"
            className={`fixed inset-0 z-[90] lg:hidden ${
              open ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div
              className={`absolute inset-0 bg-[#0f172a] transition-opacity duration-300 ${
                open ? "opacity-70" : "opacity-0"
              }`}
              onClick={close}
              aria-hidden="true"
            />

            {/* Panel */}
            <nav
              className={`absolute top-0 right-0 h-[100dvh] w-[min(20rem,85vw)] bg-[#F5F7FA] flex flex-col shadow-[-8px_0_30px_rgba(0,0,0,0.15)] transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="px-7 pt-7 pb-2">
                <Logo id="mobile-nav-logo" />
              </div>

              <div className="flex-1 flex flex-col pt-4 pb-8 px-7 overflow-y-auto overscroll-contain">
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
          </div>,
          document.body
        )}
    </>
  );
}
