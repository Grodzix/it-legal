"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.classList.add("revealed");
      return;
    }

    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight * 1.1 && rect.bottom > 0;

    if (inViewport) {
      el.classList.add("revealed");
      return;
    }

    el.classList.add("sr-init");

    const reveal = () => {
      if (el.classList.contains("revealed")) return;
      if (delay > 0) {
        setTimeout(() => el.classList.add("revealed"), delay);
      } else {
        el.classList.add("revealed");
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(el);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);

    const timer = setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        reveal();
        observer.unobserve(el);
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [delay]);

  const dirClass =
    direction === "left"
      ? "reveal-left"
      : direction === "right"
        ? "reveal-right"
        : "reveal";

  return (
    <div ref={ref} className={`${dirClass} ${className}`}>
      {children}
    </div>
  );
}
