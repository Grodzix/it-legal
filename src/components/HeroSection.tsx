import { heroData } from "@/lib/data";
import HeroParticles from "./HeroParticles";
import HeroStats from "./HeroStats";
import PhonePopover from "./PhonePopover";
import NoiseBackground from "./ui/NoiseBackground";

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

      {/* ===== LAWYER PHOTO (desktop) — absolute positioned right side, overlaps next section ===== */}
      <div
        className="absolute right-0 bottom-0 top-0 w-[48%] xl:w-[44%] hidden lg:flex items-end justify-center pointer-events-none hero-word z-30"
        style={{ animationDelay: "300ms" }}
        aria-hidden="true"
      >
        {/* Subtle glow behind */}
        <div className="absolute bottom-0 right-[10%] w-[70%] h-[60%] rounded-full bg-primary/[0.04] blur-3xl" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source srcSet="/portret.avif" type="image/avif" />
          <img
            src="/portret.jpg"
            alt=""
            width={1760}
            height={1916}
            fetchPriority="high"
            decoding="async"
            className="relative z-[1] w-[103%] max-w-none max-h-full object-contain object-bottom drop-shadow-2xl -translate-x-[18%]"
          />
        </picture>
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
              Kancelaria prawna
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
              className="hero-word text-lg sm:text-xl text-text-medium leading-relaxed max-w-lg text-justify"
              style={{ animationDelay: "800ms" }}
            >
              {heroData.subheading}
            </p>

            {/* CTAs */}
            <div
              className="hero-word flex flex-wrap items-center gap-4 mt-10"
              style={{ animationDelay: "1000ms" }}
            >
              <NoiseBackground
                containerClassName="rounded-full p-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300"
                gradientColors={[
                  "rgb(73, 133, 201)",
                  "rgb(58, 107, 168)",
                  "rgb(140, 190, 230)",
                ]}
                noiseIntensity={0.12}
                speed={1.2}
              >
                <a
                  href="#kontakt"
                  className="group relative inline-flex items-center gap-3 rounded-full pl-8 pr-1.5 py-1.5 text-[0.95rem] font-semibold text-text-dark transition-all duration-200 active:scale-[0.98]"
                >
                  {/* White overlay that fades out towards the arrow */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/85 via-white/80 to-white/20 backdrop-blur-sm pointer-events-none" />
                  <span className="relative">{heroData.ctaPrimary}</span>
                  <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm text-text-dark ring-1 ring-white/30 transition-all duration-300 group-hover:bg-white/35 group-hover:translate-x-0.5 group-hover:ring-white/50">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              </NoiseBackground>
              <PhonePopover />
            </div>
          </div>

          {/* Mobile: photo + stats */}
          <div className="lg:hidden mt-12">
            <div className="relative w-52 sm:w-64 mx-auto mb-8">
              <div
                className="absolute inset-0 rounded-full bg-primary/[0.06] blur-2xl scale-90"
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <picture>
                <source srcSet="/portret.avif" type="image/avif" />
                <img
                  src="/portret.jpg"
                  alt="Paweł Sokołowski – Radca Prawny, IT Legal"
                  width={880}
                  height={958}
                  loading="lazy"
                  decoding="async"
                  className="relative w-full h-auto drop-shadow-xl rounded-2xl"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — centered within left content area */}
      <div
        className="relative z-10 flex pb-8 hero-word lg:pr-[48%] xl:pr-[44%] justify-center"
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
