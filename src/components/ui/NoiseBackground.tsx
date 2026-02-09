"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface NoiseBackgroundProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  gradientColors?: [string, string, string];
  noiseIntensity?: number;
  speed?: number;
}

export default function NoiseBackground({
  children,
  className = "",
  containerClassName = "",
  gradientColors = [
    "rgb(73, 133, 201)",
    "rgb(58, 107, 168)",
    "rgb(114, 163, 197)",
  ],
  noiseIntensity = 0.15,
  speed = 1,
}: NoiseBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const blobs = [blob1.current, blob2.current, blob3.current];
    if (!containerRef.current || blobs.some((b) => !b)) return;

    const container = containerRef.current;
    let t = Math.random() * 1000;

    const animate = () => {
      t += 0.008 * speed;
      const w = container.offsetWidth;
      const h = container.offsetHeight;

      // Three blobs moving in different Lissajous-like patterns
      const positions = [
        {
          x: w * (0.5 + 0.4 * Math.sin(t * 0.7)),
          y: h * (0.5 + 0.4 * Math.cos(t * 0.9)),
        },
        {
          x: w * (0.5 + 0.35 * Math.cos(t * 0.6 + 2)),
          y: h * (0.5 + 0.35 * Math.sin(t * 0.8 + 1)),
        },
        {
          x: w * (0.5 + 0.3 * Math.sin(t * 0.5 + 4)),
          y: h * (0.5 + 0.3 * Math.cos(t * 0.7 + 3)),
        },
      ];

      blobs.forEach((blob, i) => {
        if (blob) {
          blob.style.background = `radial-gradient(circle at ${positions[i].x}px ${positions[i].y}px, ${gradientColors[i]} 0%, transparent 50%)`;
        }
      });

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [gradientColors, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Gradient blobs */}
      <div
        ref={blob1}
        className="absolute inset-0 opacity-80"
        aria-hidden="true"
      />
      <div
        ref={blob2}
        className="absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <div
        ref={blob3}
        className="absolute inset-0 opacity-60"
        aria-hidden="true"
      />

      {/* Top highlight strip */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-40"
        style={{
          background: `linear-gradient(90deg, transparent, ${gradientColors[0]}, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* SVG noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: noiseIntensity }}
        aria-hidden="true"
      >
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Content */}
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
}
