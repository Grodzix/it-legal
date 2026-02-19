"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { testimonials } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

function rotateForward(arr: number[]) {
  return [...arr.slice(1), arr[0]];
}

function rotateBackward(arr: number[]) {
  return [arr[arr.length - 1], ...arr.slice(0, -1)];
}

function cardDepthClass(position: number) {
  if (position === 0) return "opacity-100 scale-100 translate-y-0";
  if (position === 1) return "opacity-100 scale-[0.965] translate-y-3";
  if (position === 2) return "opacity-100 scale-[0.93] translate-y-6";
  return "opacity-0 scale-[0.9] translate-y-8 pointer-events-none";
}

export default function TestimonialsSection() {
  const [stack, setStack] = useState(testimonials.map((_, i) => i));
  const [isAnimating, setIsAnimating] = useState(false);
  const [risingCard, setRisingCard] = useState<number | null>(null);
  const [risingActive, setRisingActive] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const total = testimonials.length;

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const dragLocked = useRef<"horizontal" | "vertical" | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = useCallback(() => {
    if (isAnimating) return;
    setShowSwipeHint(false);
    setDirection("forward");

    if (isMobile) {
      setIsAnimating(true);
      setStack((s) => rotateForward(s));
      setCurrentIndex((i) => (i + 1) % total);
      setTimeout(() => setIsAnimating(false), 350);
    } else {
      setRisingCard(stack[1]);
      setIsAnimating(true);
    }
  }, [isAnimating, stack, isMobile, total]);

  const prev = useCallback(() => {
    if (isAnimating) return;
    setDirection("backward");

    if (isMobile) {
      setIsAnimating(true);
      setStack((s) => rotateBackward(s));
      setCurrentIndex((i) => (i - 1 + total) % total);
      setTimeout(() => setIsAnimating(false), 350);
    } else {
      setRisingCard(stack[stack.length - 1]);
      setIsAnimating(true);
    }
  }, [isAnimating, stack, isMobile, total]);

  // Desktop-only rising card animation
  useEffect(() => {
    if (!isAnimating || risingCard === null) return;

    setRisingActive(false);
    setStack((s) =>
      direction === "forward" ? rotateForward(s) : rotateBackward(s)
    );
    setCurrentIndex((i) =>
      direction === "forward" ? (i + 1) % total : (i - 1 + total) % total
    );

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setRisingActive(true);
      });
    });

    const timer = setTimeout(() => {
      setRisingCard(null);
      setRisingActive(false);
      setIsAnimating(false);
    }, 550);

    return () => clearTimeout(timer);
  }, [isAnimating, risingCard, total, direction]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      dragLocked.current = null;
      if (isMobile && !isAnimating) {
        setIsDragging(true);
        setDragOffsetX(0);
      }
    },
    [isMobile, isAnimating]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile || !isDragging) return;
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;
      if (!dragLocked.current) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          dragLocked.current =
            Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
        }
        return;
      }
      if (dragLocked.current === "vertical") return;
      setDragOffsetX(dx);
    },
    [isMobile, isDragging]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (isMobile) {
        const THRESHOLD = 80;
        if (isDragging && Math.abs(dragOffsetX) > THRESHOLD) {
          setIsDragging(false);
          setDragOffsetX(0);
          if (dragOffsetX < 0) next();
          else prev();
        } else {
          setIsDragging(false);
          setDragOffsetX(0);
        }
      } else {
        const deltaX = touchStartX.current - e.changedTouches[0].clientX;
        const deltaY = touchStartY.current - e.changedTouches[0].clientY;
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 0) next();
          else prev();
        }
      }
      dragLocked.current = null;
    },
    [isMobile, isDragging, dragOffsetX, next, prev]
  );

  function renderCard(testimonial: (typeof testimonials)[number]) {
    return (
      <>
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          className="text-primary/20 mb-2 flex-shrink-0 sm:w-12 sm:h-12 sm:mb-3"
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

        <blockquote className="min-h-0 flex-1 pr-1">
          <p className="text-[0.95rem] sm:text-lg lg:text-xl text-text-dark leading-relaxed italic">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        <div className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4">
          {testimonial.logo && (
            <img
              src={testimonial.logo}
              alt={`Logo ${testimonial.company}`}
              className="h-10 w-auto max-w-[120px] object-contain flex-shrink-0"
            />
          )}
          <div>
            <p className="font-semibold text-text-dark text-sm sm:text-base">
              {testimonial.author}
            </p>
            <p className="text-xs sm:text-sm text-text-medium">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <section
      id="rekomendacje"
      className="py-12 sm:py-16 bg-bg-medium/50"
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
          <div className="relative">
            <div
              className="relative h-[440px] sm:h-[430px] lg:h-[400px]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {testimonials.map((testimonial, index) => {
                const position = stack.indexOf(index);
                const isTopCard = position === 0;

                const dragStyle: React.CSSProperties =
                  isTopCard && isDragging && isMobile && dragOffsetX !== 0
                    ? {
                        zIndex: total - position,
                        transform: `translateX(${dragOffsetX}px) rotate(${dragOffsetX * 0.04}deg)`,
                        transition: "none",
                      }
                    : { zIndex: total - position };

                const snapBack =
                  isTopCard && !isDragging && !isAnimating && isMobile
                    ? "transition-all duration-200 ease-out"
                    : "transition-all duration-300 lg:duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

                return (
                  <article
                    key={testimonial.author}
                    style={dragStyle}
                    className={`absolute inset-0 rounded-2xl bg-white border border-slate-200/70 px-6 pt-5 pb-6 sm:px-12 sm:pt-8 sm:pb-14 shadow-[0_18px_35px_rgba(15,23,42,0.10)] ${snapBack} flex flex-col ${cardDepthClass(position)}`}
                    aria-hidden={!isTopCard}
                  >
                    {renderCard(testimonial)}
                  </article>
                );
              })}

              {/* Desktop-only: rising card clone */}
              {!isMobile &&
                risingCard !== null &&
                (() => {
                  const t = testimonials[risingCard];
                  return (
                    <article
                      style={{ zIndex: total + 1 }}
                      className={`absolute inset-0 rounded-2xl bg-white border border-slate-200/70 px-6 pt-5 pb-6 sm:px-12 sm:pt-8 sm:pb-14 shadow-[0_18px_35px_rgba(15,23,42,0.10)] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${
                        risingActive
                          ? "translate-y-0 scale-100 opacity-100"
                          : "translate-y-[60px] scale-[0.88] opacity-0"
                      }`}
                      aria-hidden="true"
                    >
                      {renderCard(t)}
                    </article>
                  );
                })()}
            </div>

            <button
              onClick={prev}
              disabled={isAnimating}
              className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-text-dark/15 items-center justify-center hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer shadow-sm bg-white/80 backdrop-blur-sm disabled:opacity-40"
              aria-label="Poprzednia rekomendacja"
            >
              <svg
                width="22"
                height="22"
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

            <button
              onClick={next}
              disabled={isAnimating}
              className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-text-dark/15 items-center justify-center hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer shadow-sm bg-white/80 backdrop-blur-sm disabled:opacity-40"
              aria-label="Następna rekomendacja"
            >
              <svg
                width="22"
                height="22"
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

          <div className="flex flex-col items-center gap-3 mt-8 lg:hidden">
            <div className="flex items-center gap-0">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (isAnimating || i === stack[0]) return;
                    const stepsNeeded = (stack.indexOf(i) + total) % total;
                    if (stepsNeeded > 0) next();
                  }}
                  className="relative flex items-center justify-center w-8 h-8"
                  aria-label={`Rekomendacja ${i + 1}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      stack[0] === i
                        ? "w-6 h-2 bg-primary"
                        : "w-2 h-2 bg-text-light/40"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div
              className={`flex items-center gap-1.5 text-text-light text-xs transition-opacity duration-500 ${
                showSwipeHint ? "opacity-100" : "opacity-0"
              }`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M19 12l-4-4M19 12l-4 4M5 12l4-4M5 12l4 4" />
              </svg>
              <span>Przesuń</span>
            </div>
          </div>

          <div className="hidden lg:flex justify-center mt-12">
            <span className="text-sm text-text-light tabular-nums">
              {currentIndex + 1} / {total}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
