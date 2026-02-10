"use client";

import { useEffect } from "react";

/**
 * Intercepts clicks on same-page hash links (e.g. #kontakt, #specjalizacje)
 * and scrolls smoothly. Cross-page navigation (Next.js) uses instant scroll.
 */
export default function SmoothAnchorScroll() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element)?.closest?.("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });

      // Update URL hash without triggering scroll
      history.pushState(null, "", href);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
