"use client";

import { useState, useEffect, useCallback } from "react";
import { testimonials } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = testimonials[current];

  return (
    <section
      id="rekomendacje"
      className="py-24 sm:py-32 bg-bg-medium/50"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="section-label mb-4">Rekomendacje</p>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark"
          >
            Zaufali nam liderzy branży
          </h2>
        </ScrollReveal>

        <div
          className="mx-auto max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Quote card */}
          <div className="glass rounded-2xl p-8 sm:p-12 shadow-lg relative min-h-[280px] flex flex-col justify-between">
            {/* Quote icon */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary/20 mb-4"
              aria-hidden="true"
            >
              <path
                d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                fill="currentColor"
              />
              <path
                d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                fill="currentColor"
              />
            </svg>

            {/* Quote text with fade transition */}
            <blockquote className="transition-opacity duration-500">
              <p className="text-lg sm:text-xl text-text-dark leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="font-semibold text-text-dark">{t.author}</p>
                <p className="text-sm text-text-medium">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-text-dark/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Poprzednia rekomendacja"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Wybierz rekomendację">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Rekomendacja ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current
                      ? "bg-primary w-8"
                      : "bg-text-dark/20 hover:bg-text-dark/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-text-dark/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Następna rekomendacja"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
