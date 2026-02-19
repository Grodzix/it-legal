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
      {/* Particle animation — desktop only */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <HeroParticles />
      </div>


      {/* ===== MOBILE HERO ===== */}
      <div className="lg:hidden relative z-10 flex-1 flex flex-col items-center pt-24 sm:pt-28">
        <div className="flex flex-col items-center px-6 sm:px-10">
          {/* Trust badge */}
          <div
            className="hero-word inline-flex items-center gap-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 px-4 py-2 shadow-sm"
            style={{ animationDelay: "100ms" }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-amber-400"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-dark/70">
              10+ lat doświadczenia w IT
            </span>
          </div>

          {/* Heading */}
          <h1
            className="hero-word text-[2.25rem] sm:text-[3rem] font-bold leading-[1.1] tracking-tight text-center mt-6 sm:mt-8"
            style={{ animationDelay: "200ms" }}
          >
            <span className="text-text-dark">Wsparcie prawne</span>
            <br />
            <span className="text-primary">sektora IT/Tech</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-word text-[0.95rem] sm:text-lg text-text-medium leading-relaxed text-center mt-4 sm:mt-5 max-w-xs sm:max-w-sm"
            style={{ animationDelay: "400ms" }}
          >
            Kompleksowe wsparcie prawne dla firm technologicznych.
          </p>

          {/* CTA — duży, łatwy do tapnięcia (56px tall), full-width */}
          <div
            className="hero-word w-full max-w-xs sm:max-w-sm mt-7 sm:mt-9"
            style={{ animationDelay: "600ms" }}
          >
            <a
              href="#kontakt"
              className="flex items-center justify-center gap-2.5 w-full rounded-full bg-primary-dark py-4 sm:py-[18px] text-[0.95rem] sm:text-base font-semibold text-white shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
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
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Umów bezpłatną rozmowę
            </a>
          </div>

          {/* Google Reviews badge — mobile */}
          <a
            href="https://www.google.com/maps/place/IT+LEGAL+-+kompleksowa+obs%C5%82uga+prawna+IT%2FTech/@52.312786,21.0772321,18.25z/data=!4m6!3m5!1s0x60bfd80665dcaeb3:0x464c8ba42bfe793!8m2!3d52.312872!4d21.0774127!16s%2Fg%2F11tdch_wgg"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-word inline-flex items-center gap-2.5 mt-5"
            style={{ animationDelay: "800ms" }}
            aria-label="Opinie Google – ocena 5.0 na 5"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="flex-shrink-0">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FBBC05" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-semibold text-text-dark">5.0</span>
          </a>
        </div>

        {/* Person photo */}
        <div
          className="hero-word relative w-full flex justify-center mt-12 sm:mt-10 pointer-events-none"
          style={{ animationDelay: "300ms", maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}
          aria-hidden="true"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-primary/[0.05] blur-3xl" />
          <picture>
            <source srcSet="/portret.avif" type="image/avif" />
            <img
              src="/portret.jpg"
              alt=""
              width={1760}
              height={1916}
              fetchPriority="high"
              decoding="async"
              className="relative z-[1] w-[85%] max-w-[400px] sm:max-w-[460px] object-contain object-bottom drop-shadow-xl mx-auto"
            />
          </picture>
        </div>
      </div>

      {/* ===== DESKTOP HERO ===== */}
      {/* Lawyer photo — absolute positioned right side */}
      <div
        className="absolute right-0 bottom-0 top-0 w-[48%] xl:w-[44%] hidden lg:flex items-end justify-center pointer-events-none hero-word z-30"
        style={{ animationDelay: "300ms" }}
        aria-hidden="true"
      >
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

      {/* Floating stat badges — desktop only */}
      <HeroStats />


      {/* Desktop main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 w-full flex-1 hidden lg:flex items-center lg:pt-0 lg:pb-0">
        <div className="w-full">
          <div className="max-w-full lg:max-w-[52%] xl:max-w-[55%]">
            {/* Section label */}
            <p
              className="hero-word section-label mb-5"
              style={{ animationDelay: "100ms" }}
            >
              Kancelaria prawna
            </p>

            {/* Heading with staggered word reveal */}
            <h1 className="text-7xl xl:text-[5.25rem] font-bold leading-[1.06] tracking-tight">
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
              className="hero-word text-xl text-text-medium leading-relaxed max-w-lg"
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
        </div>
      </div>

      {/* Desktop scroll indicator + Google Reviews */}
      <div
        className="relative z-10 hidden lg:flex flex-col items-center pb-8 hero-word lg:pr-[48%] xl:pr-[44%]"
        style={{ animationDelay: "1500ms" }}
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 px-4 py-2 shadow-sm mb-5">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-amber-400"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-dark/70">
            10+ lat doświadczenia w IT
          </span>
        </div>
        <a
          href="#o-nas"
          className="flex flex-col items-center gap-2 text-text-light hover:text-primary transition-colors group"
          aria-label="Przewiń do sekcji O nas"
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
