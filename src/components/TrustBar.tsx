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

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCurrent(start);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [triggered, value]);

  return (
    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tabular-nums">
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-10 -mt-12 sm:-mt-16" aria-label="Statystyki">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div
          ref={ref}
          className="glass rounded-2xl px-6 py-8 sm:px-10 sm:py-10 shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {trustStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  triggered={triggered}
                />
                <span className="text-sm sm:text-base text-text-medium font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
