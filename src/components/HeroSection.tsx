import Image from "next/image";
import { heroData, siteConfig } from "@/lib/data";
import HeroParticles from "./HeroParticles";
import HeroStats from "./HeroStats";

export default function HeroSection() {
  const words = heroData.heading.split(" ");

  return (
    <section
      className="relative min-h-screen hero-gradient overflow-hidden flex flex-col"
      aria-label="Sekcja główna"
    >
      {/* Particle animation */}
      <HeroParticles />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 hero-grid-pattern pointer-events-none" />

      {/* Decorative elements */}
      <div
        className="absolute top-[22%] left-10 w-px h-40 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden xl:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[35%] left-[7%] w-2.5 h-2.5 rounded-full bg-primary/15 hidden xl:block"
        style={{ animation: "pulse 4s ease-in-out infinite" }}
        aria-hidden="true"
      />

      {/* ===== LAWYER PHOTO (desktop) — absolute positioned right side ===== */}
      <div
        className="absolute right-0 bottom-0 top-0 w-[48%] xl:w-[44%] hidden lg:block pointer-events-none hero-word"
        style={{ animationDelay: "300ms" }}
        aria-hidden="true"
      >
        {/* Gradient fade from left for smooth blend */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-bg-light via-bg-light/60 to-transparent w-[35%]" />

        {/* Subtle glow behind */}
        <div className="absolute bottom-0 right-[10%] w-[70%] h-[60%] rounded-full bg-primary/[0.04] blur-3xl" />

        <Image
          src="/lawyer-transarent.png"
          alt=""
          width={840}
          height={1050}
          className="relative z-[1] h-full w-auto max-w-none object-contain object-right-bottom ml-auto drop-shadow-2xl"
          priority
          sizes="(min-width: 1024px) 48vw, 0vw"
        />
      </div>

      {/* ===== FLOATING STAT BADGES (desktop) — on top of photo ===== */}
      <HeroStats />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 w-full flex-1 flex items-center pt-24 pb-20 lg:pt-0 lg:pb-0">
        <div className="w-full">
          {/* Left content — limited width so it doesn't overlap photo */}
          <div className="max-w-full lg:max-w-[52%] xl:max-w-[55%]">
            {/* Section label */}
            <p
              className="hero-word section-label mb-5"
              style={{ animationDelay: "100ms" }}
            >
              Kancelaria prawna IT/Tech
            </p>

            {/* Heading with staggered word reveal */}
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold leading-[1.06] tracking-tight">
              {words.map((word, i) => (
                <span
                  key={i}
                  className={`inline-block hero-word ${
                    word === "IT/Tech" ? "text-primary" : "text-text-dark"
                  }`}
                  style={{ animationDelay: `${i * 100 + 200}ms` }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </h1>

            {/* Accent divider */}
            <div
              className="hero-word w-14 h-[3px] bg-gradient-to-r from-primary to-primary-light rounded-full mt-8 mb-6"
              style={{ animationDelay: "700ms" }}
            />

            {/* Subtitle */}
            <p
              className="hero-word text-lg sm:text-xl text-text-medium leading-relaxed max-w-lg"
              style={{ animationDelay: "800ms" }}
            >
              {heroData.subheading}
            </p>

            {/* CTAs */}
            <div
              className="hero-word flex flex-wrap items-center gap-4 mt-10"
              style={{ animationDelay: "1000ms" }}
            >
              <a
                href="#kontakt"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              >
                <span>{heroData.ctaPrimary}</span>
                <span className="cta-arrow inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-text-dark/12 px-7 py-4 text-base font-medium text-text-dark hover:border-primary hover:text-primary transition-colors duration-300"
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
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Mobile: photo + stats */}
          <div className="lg:hidden mt-12">
            <div className="relative w-52 sm:w-64 mx-auto mb-8">
              <div
                className="absolute inset-0 rounded-full bg-primary/[0.06] blur-2xl scale-90"
                aria-hidden="true"
              />
              <Image
                src="/lawyer-transarent.png"
                alt="Paweł Sokołowski – Radca Prawny, IT Legal"
                width={420}
                height={525}
                className="relative w-full h-auto drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="relative z-10 flex justify-center pb-8 hero-word"
        style={{ animationDelay: "1500ms" }}
      >
        <a
          href="#o-nas"
          className="flex flex-col items-center gap-2 text-text-light hover:text-primary transition-colors group"
          aria-label="Przewiń do sekcji O nas"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold">
            Poznaj nas
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="scroll-bounce"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
