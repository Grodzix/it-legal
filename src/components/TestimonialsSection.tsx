"use client";

import { useState, useEffect, useCallback } from "react";
import { testimonials } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

function rotateForward(arr: number[]) {
  return [...arr.slice(1), arr[0]];
}

function cardDepthClass(position: number) {
  if (position === 0) return "opacity-100 scale-100 translate-y-0";
  if (position === 1) return "opacity-100 scale-[0.965] translate-y-3";
  if (position === 2) return "opacity-100 scale-[0.93] translate-y-6";
  return "opacity-0 scale-[0.9] translate-y-8 pointer-events-none";
}

export default function TestimonialsSection() {
  const [stack, setStack] = useState(testimonials.map((_, i) => i));
  const [animating, setAnimating] = useState(false);
  const [recycleCard, setRecycleCard] = useState<number | null>(null);
  const [recycleActive, setRecycleActive] = useState(false);
  const total = testimonials.length;

  const next = useCallback(() => {
    if (animating) return;
    setAnimating(true);
  }, [animating]);

  useEffect(() => {
    if (!animating) return;
    const timer = setTimeout(() => {
      let movedCard = -1;
      setStack((prevStack) => {
        movedCard = prevStack[0];
        return rotateForward(prevStack);
      });
      setAnimating(false);

      // After being thrown, card briefly returns under the deck.
      setRecycleCard(movedCard);
      setRecycleActive(false);
      requestAnimationFrame(() => setRecycleActive(true));
      setTimeout(() => {
        setRecycleCard(null);
        setRecycleActive(false);
      }, 320);
    }, 520);
    return () => clearTimeout(timer);
  }, [animating]);

  const exitTopClass = "translate-x-[100%] rotate-6 opacity-100";

  return (
    <section
      id="rekomendacje"
      className="py-16 sm:py-20 bg-bg-medium/50"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="section-label mb-4">Rekomendacje</p>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark"
          >
            Zaufali nam liderzy bran&#380;y
          </h2>
        </ScrollReveal>

        <div className="mx-auto max-w-4xl">
          {/* Physical card stack */}
          <div className="relative h-[460px] sm:h-[430px] lg:h-[400px]">
            {testimonials.map((testimonial, index) => {
              if (recycleCard === index) return null;
              const position = stack.indexOf(index);
              const isTopCard = position === 0;
              const cardClass = isTopCard && animating ? exitTopClass : cardDepthClass(position);
              const initials = testimonial.author
                .split(" ")
                .map((part) => part[0])
                .join("");

              return (
                <article
                  key={testimonial.author}
                  style={{ zIndex: total - position }}
                  className={`absolute inset-0 rounded-2xl bg-white border border-slate-200/70 px-8 pt-6 pb-10 sm:px-12 sm:pt-8 sm:pb-14 shadow-[0_18px_35px_rgba(15,23,42,0.10)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${cardClass}`}
                  aria-hidden={!isTopCard}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-primary/20 mb-3 flex-shrink-0"
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

                  <blockquote className="min-h-0 flex-1 overflow-y-auto pr-1">
                    <p className="text-lg sm:text-xl text-text-dark leading-relaxed italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-dark">{testimonial.author}</p>
                      <p className="text-sm text-text-medium">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}

            {recycleCard !== null && (
              <article
                className={`absolute inset-0 rounded-2xl bg-white border border-slate-200/70 px-8 pt-6 pb-10 sm:px-12 sm:pt-8 sm:pb-14 shadow-[0_14px_28px_rgba(15,23,42,0.08)] pointer-events-none z-[1] transition-all duration-300 ease-out ${
                  recycleActive
                    ? "translate-x-0 translate-y-8 scale-[0.9] opacity-60"
                    : "translate-x-10 translate-y-8 scale-[0.88] opacity-95"
                }`}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center mt-8">
            <button
              onClick={next}
              disabled={animating}
              className="w-10 h-10 rounded-full border border-text-dark/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer"
              aria-label="Nast&#281;pna rekomendacja"
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
