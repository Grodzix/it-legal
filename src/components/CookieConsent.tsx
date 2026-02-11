"use client";

import { useState, useEffect, useCallback } from "react";

const COOKIE_KEY = "cookie-consent";
type ConsentValue = "accepted" | "rejected";

function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(COOKIE_KEY);
  if (val === "accepted" || val === "rejected") return val;
  return null;
}

function setConsent(value: ConsentValue) {
  localStorage.setItem(COOKIE_KEY, value);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no consent decision has been made
    if (getConsent() === null) {
      // Small delay so it doesn't compete with page load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = useCallback(() => {
    setConsent("accepted");
    setVisible(false);
  }, []);

  const handleReject = useCallback(() => {
    setConsent("rejected");
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Zgoda na pliki cookies"
      className="fixed bottom-0 left-0 right-0 z-[90] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl glass rounded-2xl shadow-xl border border-white/20 px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-text-dark font-medium mb-1">
              Pliki cookies
            </p>
            <p className="text-xs text-text-medium leading-relaxed">
              Używamy plików cookies w celu zapewnienia prawidłowego działania
              serwisu oraz do celów statystycznych. Możesz zaakceptować lub
              odrzucić cookies.{" "}
              <a
                href="/polityka-prywatnosci.pdf"
                className="text-primary hover:underline"
              >
                Polityka prywatności
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-5 py-2.5 text-sm font-medium text-text-medium hover:text-text-dark border border-bg-medium rounded-full transition-colors cursor-pointer"
            >
              Odrzuć
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-full transition-colors shadow-md cursor-pointer"
            >
              Akceptuję
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
