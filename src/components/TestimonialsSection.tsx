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
  const [animating, setAnimating] = useState(false);
  const [recycleCard, setRecycleCard] = useState<number | null>(null);
  const [recycleActive, setRecycleActive] = useState(false);
  const [prevAnimating, setPrevAnimating] = useState(false);
  const [risingCard, setRisingCard] = useState<number | null>(null);
  const [risingActive, setRisingActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [exitDirection, setExitDirection] = useState<"left" | "right">("right");
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const total = testimonials.length;
  const anyAnimating = animating || prevAnimating;

  // Swipe support
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const dragLocked = useRef<"horizontal" | "vertical" | null>(null);

  // Detect mobile (< lg breakpoint)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = useCallback(() => {
    if (anyAnimating) return;
    setAnimating(true);
    setShowSwipeHint(false);
  }, [anyAnimating]);

  const prev = useCallback(() => {
    if (anyAnimating) return;
    setRisingCard(stack[stack.length - 1]);
    setPrevAnimating(true);
  }, [anyAnimating, stack]);

  useEffect(() => {
    if (!animating) return;
    // Mobile: faster transition, no recycle animation
    const delay = isMobile ? 320 : 520;
    const timer = setTimeout(() => {
      let movedCard = -1;
      setStack((prevStack) => {
        movedCard = prevStack[0];
        return rotateForward(prevStack);
      });
      setAnimating(false);
      setCurrentIndex((prev) => (prev + 1) % total);

      if (!isMobile) {
        setRecycleCard(movedCard);
        setRecycleActive(false);
        requestAnimationFrame(() => setRecycleActive(true));
        setTimeout(() => {
          setRecycleCard(null);
          setRecycleActive(false);
        }, 320);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [animating, total, isMobile]);

  useEffect(() => {
    if (!prevAnimating || risingCard === null) return;

    setRisingActive(false);
    setStack((prev) => rotateBackward(prev));
    setCurrentIndex((prev) => (prev - 1 + total) % total);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setRisingActive(true);
      });
    });

    const timer = setTimeout(() => {
      setRisingCard(null);
      setRisingActive(false);
      setPrevAnimating(false);
    }, 550);

    return () => clearTimeout(timer);
  }, [prevAnimating, risingCard, total]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    dragLocked.current = null;
    if (isMobile && !anyAnimating) {
      setIsDragging(true);
      setDragOffsetX(0);
    }
  }, [isMobile, anyAnimating]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile || !isDragging) return;
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;

      // Lock direction on first significant movement
      if (!dragLocked.current) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          dragLocked.current = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
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
          setExitDirection(dragOffsetX < 0 ? "left" : "right");
          setIsDragging(false);
          setDragOffsetX(0);
          next();
        } else {
          // Snap back
          setIsDragging(false);
          setDragOffsetX(0);
        }
      } else {
        // Desktop: bidirectional horizontal swipe
        const deltaX = touchStartX.current - e.changedTouches[0].clientX;
        const deltaY = touchStartY.current - e.changedTouches[0].clientY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        if (absDeltaX > 50 && absDeltaX > absDeltaY) {
          if (deltaX > 0) next();
          else prev();
        }
      }
      dragLocked.current = null;
    },
    [isMobile, isDragging, dragOffsetX, next, prev]
  );

  // Exit animation: mobile = fly in swipe direction, desktop = fly right
  const exitTopClass = isMobile
    ? exitDirection === "left"
      ? "-translate-x-[110%] -rotate-6 opacity-60"
      : "translate-x-[110%] rotate-6 opacity-60"
    : "translate-x-[100%] rotate-6 opacity-100";

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
          {/* Card stack + side arrows */}
          <div className="relative">
            {/* Cards */}
            <div
              className="relative h-[440px] sm:h-[430px] lg:h-[400px]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {testimonials.map((testimonial, index) => {
                if (recycleCard === index || risingCard === index) return null;
                const position = stack.indexOf(index);
                const isTopCard = position === 0;
                const cardClass =
                  isTopCard && animating
                    ? exitTopClass
                    : cardDepthClass(position);

                // Drag: top card follows finger on mobile
                const dragStyle: React.CSSProperties =
                  isTopCard && isDragging && isMobile && dragOffsetX !== 0
                    ? {
                        zIndex: total - position,
                        transform: `translateX(${dragOffsetX}px) rotate(${dragOffsetX * 0.04}deg)`,
                        transition: "none",
                      }
                    : { zIndex: total - position };

                // Snap-back: when not dragging and not animating, use short transition
                const snapBack =
                  isTopCard && !isDragging && !animating && isMobile
                    ? "transition-all duration-200 ease-out"
                    : "transition-all duration-300 lg:duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

                return (
                  <article
                    key={testimonial.author}
                    style={dragStyle}
                    className={`absolute inset-0 rounded-2xl bg-white border border-slate-200/70 px-6 pt-5 pb-6 sm:px-12 sm:pt-8 sm:pb-14 shadow-[0_18px_35px_rgba(15,23,42,0.10)] ${snapBack} flex flex-col ${cardClass}`}
                    aria-hidden={!isTopCard}
                  >
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
                      {testimonial.logo ? (
                        <img
                          src={testimonial.logo}
                          alt={`Logo ${testimonial.company}`}
                          className="h-10 w-auto max-w-[120px] object-contain flex-shrink-0"
                        />
                      ) : (
                        <div className="h-10 w-24 sm:h-12 sm:w-28 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-[0.6rem] text-text-light whitespace-nowrap select-none">
                            Logo firmy
                          </span>
                        </div>
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
                  </article>
                );
              })}

              {recycleCard !== null && (
                <article
                  className={`absolute inset-0 rounded-2xl bg-white border border-slate-200/70 px-6 pt-5 pb-6 sm:px-12 sm:pt-8 sm:pb-14 shadow-[0_14px_28px_rgba(15,23,42,0.08)] pointer-events-none z-[1] transition-all duration-300 ease-out ${
                    recycleActive
                      ? isMobile
                        ? "translate-x-0 translate-y-8 scale-[0.9] opacity-60"
                        : "translate-x-0 translate-y-8 scale-[0.9] opacity-60"
                      : isMobile
                        ? "translate-x-0 translate-y-12 scale-[0.88] opacity-95"
                        : "translate-x-10 translate-y-8 scale-[0.88] opacity-95"
                  }`}
                  aria-hidden="true"
                />
              )}

              {risingCard !== null &&
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
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </blockquote>

                      <div className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4">
                        {t.logo ? (
                          <img
                            src={t.logo}
                            alt={`Logo ${t.company}`}
                            className="h-10 w-auto max-w-[120px] object-contain flex-shrink-0"
                          />
                        ) : (
                          <div className="h-10 w-24 sm:h-12 sm:w-28 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-[0.6rem] text-text-light whitespace-nowrap select-none">
                              Logo firmy
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-text-dark text-sm sm:text-base">
                            {t.author}
                          </p>
                          <p className="text-xs sm:text-sm text-text-medium">
                            {t.role}, {t.company}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })()}
            </div>

            {/* Desktop: arrow on the left side */}
            <button
              onClick={prev}
              disabled={anyAnimating}
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

            {/* Desktop: arrow on the right side */}
            <button
              onClick={next}
              disabled={anyAnimating}
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

          {/* Mobile: swipe hint + dot indicator */}
          <div className="flex flex-col items-center gap-3 mt-8 lg:hidden">
            {/* Dot indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (anyAnimating || i === stack[0]) return;
                    // Rotate stack until this card is on top
                    const stepsNeeded =
                      (stack.indexOf(i) + total) % total;
                    if (stepsNeeded > 0) next();
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    stack[0] === i
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-text-light/40"
                  }`}
                  aria-label={`Rekomendacja ${i + 1}`}
                />
              ))}
            </div>
            {/* Swipe hint */}
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

          {/* Desktop counter */}
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
