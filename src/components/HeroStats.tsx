"use client";

import { useEffect, useRef, useState } from "react";
import { trustStats } from "@/lib/data";

function AnimatedCounter({
  value,
  prefix,
  suffix,
  triggered,
}: {
  value: number;
  prefix: string;
  suffix: string;
  triggered: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!triggered) return;

    const duration = 2200;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [triggered, value]);

  return (
    <span className="stat-gradient-text tabular-nums">
      {prefix}
      {current}
      {suffix}
    </span>
  );
}


export default function HeroStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Desktop stats hidden — photo speaks for itself */}

      {/* ===== MOBILE: Stats row below photo (rendered in HeroSection) ===== */}
      <div className="lg:hidden fixed-mobile-stats">
        <div className="grid grid-cols-3 gap-3 px-5 sm:px-8 max-w-7xl mx-auto">
          {trustStats.map((stat, i) => (
            <div
              key={stat.label}
              className="hero-word text-center"
              style={{ animationDelay: `${i * 150 + 900}ms` }}
            >
              <div className="text-2xl sm:text-3xl font-bold leading-none tracking-tight">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  triggered={triggered}
                />
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-4 h-[2px] rounded-full bg-primary/25" />
                <span className="text-[0.6rem] text-text-medium font-semibold tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
