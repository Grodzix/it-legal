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
    <div ref={ref} className="hidden">
      {/* Stats are shown in AboutSection — hidden here on all viewports */}
    </div>
  );
}
