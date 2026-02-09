"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/lib/data";

interface PhonePopoverProps {
  children?: ReactNode;
}

export default function PhonePopover({ children }: PhonePopoverProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const close = useCallback(() => setOpen(false), []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = siteConfig.phone;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const defaultTrigger = (
    <button
      type="button"
      className="inline-flex items-center gap-2.5 rounded-full border border-text-dark/12 pl-6 pr-7 py-3.5 text-[0.95rem] font-medium text-text-dark hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer"
      aria-haspopup="dialog"
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
      {siteConfig.phoneDisplay}
    </button>
  );

  const modal = (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${
        open ? "visible" : "invisible"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Dane kontaktowe"
    >
      {/* Backdrop — bez transition, pojawia się natychmiast */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />

      {/* Card */}
      <div
        className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 pt-7 transition-[transform,opacity] duration-300 ${
          open ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
          aria-label="Zamknij"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Phone icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
        </div>

        {/* Label */}
        <p className="text-center text-sm text-gray-500 mb-1.5">
          Zadzwoń do nas
        </p>

        {/* Phone number */}
        <p className="text-center text-[1.75rem] font-bold text-text-dark tracking-tight mb-7">
          {siteConfig.phone}
        </p>

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-primary-dark transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Zadzwoń
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3.5 text-sm font-semibold text-text-dark hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Skopiowano
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Kopiuj numer
              </>
            )}
          </button>
        </div>

        {/* Working hours */}
        <p className="text-center text-xs text-gray-400 mt-5">
          Pon-Pt 8:00-20:00 · Sob 9:00-14:00
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Trigger */}
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children || defaultTrigger}
      </div>

      {/* Portal — renderuje modal bezpośrednio w <body>, omijając containing block */}
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
