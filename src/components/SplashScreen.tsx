"use client";

import { useState, useEffect, useRef } from "react";

const SPLASH_CENTER_SIZE = 120;

export default function SplashScreen() {
  const [phase, setPhase] = useState<"idle" | "visible" | "animating" | "done">(
    "idle"
  );
  const posRef = useRef({
    centerX: 0,
    centerY: 0,
    targetX: 0,
    targetY: 0,
    centerScale: SPLASH_CENTER_SIZE / 56,
  });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.location.hash) {
      setPhase("done");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              el.classList.add("revealed");
            }
          });

          setTimeout(() => {
            document.documentElement.classList.remove("hash-nav");
          }, 200);
        });
      });
      return;
    }

    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const headerLogo = document.getElementById("header-logo");
    if (headerLogo) headerLogo.style.opacity = "0";

    const headerSvg = headerLogo?.querySelector("svg");
    if (headerSvg) {
      const rect = headerSvg.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
      posRef.current = {
        centerX: (vw - rect.width) / 2,
        centerY: (vh - rect.height) / 2,
        targetX: rect.left,
        targetY: rect.top,
        centerScale: SPLASH_CENTER_SIZE / rect.height,
      };
    }

    const raf = requestAnimationFrame(() => setPhase("visible"));

    const t1 = setTimeout(() => setPhase("animating"), 300);

    // After transform animation settles, switch to layout positioning so
    // the splash SVG goes through the same rendering/rounding path as the
    // header logo (layout engine, not transform engine).
    const t2 = setTimeout(() => {
      const svg = svgRef.current;
      if (svg) {
        const { targetX, targetY } = posRef.current;
        svg.style.transition = "none";
        svg.style.top = `${targetY}px`;
        svg.style.left = `${targetX}px`;
        svg.style.transform = "none";
      }
    }, 800);

    const t3 = setTimeout(() => {
      if (headerLogo) headerLogo.style.opacity = "1";
      setPhase("done");
      document.body.style.overflow = "";
    }, 1400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
      if (headerLogo) {
        headerLogo.style.transition = "";
        headerLogo.style.opacity = "";
      }
    };
  }, []);

  if (phase === "done") return null;

  const isAnimating = phase === "animating";
  const { centerX, centerY, targetX, targetY, centerScale } = posRef.current;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-white"
        style={{
          opacity: isAnimating ? 0 : 1,
          transition: isAnimating ? "opacity 350ms ease-out 700ms" : "none",
          pointerEvents: isAnimating ? "none" : "auto",
        }}
      />

      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="144"
        height="48"
        viewBox="0 0 144 48"
        fill="none"
        aria-hidden="true"
        className="fixed top-0 left-0 z-[101] pointer-events-none h-14 w-auto"
        style={{
          transform: isAnimating
            ? `translate(${targetX}px, ${targetY}px) scale(1)`
            : `translate(${centerX}px, ${centerY}px) scale(${centerScale})`,
          opacity: phase === "idle" ? 0 : 1,
          transition: isAnimating
            ? "transform 420ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "opacity 200ms ease-out",
        }}
      >
        <path d="M24 46C36.1503 46 46 36.1503 46 24C46 11.8497 36.1503 2 24 2C11.8497 2 2 11.8497 2 24C2 36.1503 11.8497 46 24 46Z" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.25" strokeMiterlimit="10" className="text-text-dark" />
        <path d="M18.3259 13.5579C15.2101 18.1347 19.818 21.1615 24.0001 21.1615C28.1821 21.1615 31.5724 24.5517 31.5724 28.7338C31.5724 32.9159 28.1821 36.3061 24.0001 36.3061C19.818 36.3061 16.4277 32.9159 16.4277 28.7338" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" className="text-text-dark" />
        <path d="M29.6742 33.7483C32.79 29.1714 28.1821 26.1446 24.0001 26.1446C19.818 26.1446 16.4277 22.7544 16.4277 18.5723C16.4277 14.3902 19.818 11 24.0001 11C28.1821 11 31.5724 14.3902 31.5724 18.5723" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" className="text-text-dark" />
        <path d="M136.262 28.9999V19.5229H137.926V27.6349H143.802V28.9999H136.262Z" fill="currentColor" className="text-text-dark" />
        <path d="M122.514 28.9999L126.609 19.5229H128.897L132.992 28.9999H131.315L130.353 26.7249H125.127L124.126 28.9999H122.514ZM125.582 25.5679H129.885L128.247 21.8499L127.779 20.7189H127.688L127.22 21.8629L125.582 25.5679Z" fill="currentColor" className="text-text-dark" />
        <path d="M114.102 29.13C111.034 29.13 109.123 27.349 109.123 24.385V24.242C109.123 21.109 111.411 19.406 114.544 19.406C117.287 19.406 119.315 20.706 119.575 22.656H117.859C117.56 21.447 116.286 20.732 114.544 20.732C112.139 20.732 110.891 22.045 110.891 23.826V24.71C110.891 26.543 112.126 27.791 114.388 27.791C116.52 27.791 117.833 26.764 117.833 25.191V25.178H114.791V24.047H119.64V29H118.392L118.249 27.05H118.184C117.703 28.311 116.104 29.13 114.102 29.13Z" fill="currentColor" className="text-text-dark" />
        <path d="M97.979 28.9999V19.5229H106.052V20.8359H99.643V23.5399H105.259V24.7749H99.643V27.6869H106.039V28.9999H97.979Z" fill="currentColor" className="text-text-dark" />
        <path d="M87.0254 28.9999V19.5229H88.6894V27.6349H94.5654V28.9999H87.0254Z" fill="currentColor" className="text-text-dark" />
        <path d="M78.933 20.8489H75.371V28.9999H73.72V20.8489H70.21V19.5229H78.933V20.8489Z" fill="currentColor" className="text-text-dark" />
        <path d="M65.1572 28.9999V19.5229H66.8212V28.9999H65.1572Z" fill="currentColor" className="text-text-dark" />
      </svg>
    </>
  );
}
