"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const sizeRef = useRef({ w: 0, h: 0 });

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(80, Math.floor((w * h) / 12000));
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 6 + 2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      sizeRef.current = { w: rect.width, h: rect.height };
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const animate = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Mouse parallax
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.x -= dx * force * 0.005;
          p.y -= dy * force * 0.005;
        }

        // Wrap around
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "#94A3B8";
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      // Draw connections
      ctx.strokeStyle = "rgba(148, 163, 184, 0.06)";
      ctx.lineWidth = 1;
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx2 = particles[i].x - particles[j].x;
          const dy2 = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d < 140) {
            ctx.globalAlpha = (1 - d / 140) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      if (visibleRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Defer animation start to not block LCP
    const timeout = setTimeout(() => {
      if (visibleRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 bottom-0 right-0 lg:left-[52%] xl:left-[56%] w-full lg:w-[48%] xl:w-[44%] h-full pointer-events-none"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        maskComposite: "intersect",
        WebkitMaskComposite: "destination-in",
      }}
      aria-hidden="true"
    />
  );
}
