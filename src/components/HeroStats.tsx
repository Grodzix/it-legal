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

// Positions for floating badges over the lawyer photo (desktop only)
// These are relative to the viewport right side where the photo sits
const badgeStyles: React.CSSProperties[] = [
  { top: "18%", right: "38%"  },
  { top: "44%", right: "42%" },
  { top: "68%", right: "34%"  },
];

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
      {/* ===== DESKTOP: Floating glass badges over the lawyer photo ===== */}
      <div className="hidden lg:block">
        {trustStats.map((stat, i) => (
          <div
            key={stat.label}
            className="hero-word absolute z-20"
            style={{
              ...badgeStyles[i],
              animationDelay: `${i * 200 + 900}ms`,
            }}
          >
            <div
              className="stat-float"
              style={{ animationDelay: `${i * 1.5}s` }}
            >
              <div className="glass rounded-2xl px-5 py-4 shadow-xl border border-white/50 backdrop-blur-2xl min-w-[140px]">
                <div className="text-2xl xl:text-3xl font-bold leading-none tracking-tight">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    triggered={triggered}
                  />
                </div>
                <p className="text-[0.6rem] xl:text-[0.65rem] text-text-medium font-semibold tracking-wider uppercase mt-1.5 whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

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
