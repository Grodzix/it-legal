import Link from "next/link";
import { specializations } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

function SpecIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    contract: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    cube: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    brain: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M9 2v3" />
        <path d="M15 2v3" />
        <path d="M9 19v3" />
        <path d="M15 19v3" />
        <path d="M2 9h3" />
        <path d="M2 15h3" />
        <path d="M19 9h3" />
        <path d="M19 15h3" />
      </svg>
    ),
    tax: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M8 7v10" />
        <path d="M12 7v10" />
        <path d="M16 7v10" />
        <path d="M2 12h20" />
      </svg>
    ),
    dots: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="5" r="1" fill="currentColor" />
        <circle cx="12" cy="19" r="1" fill="currentColor" />
      </svg>
    ),
  };

  return <>{icons[icon] || icons.dots}</>;
}

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function SpecializationsSection() {
  return (
    <section
      id="specjalizacje"
      className="py-12 sm:py-16 bg-bg-medium/50"
      aria-labelledby="spec-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="section-label mb-4">Specjalizacje</p>
          <h2
            id="spec-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark"
          >
            Kompleksowe wsparcie prawne
          </h2>
          <p className="mt-4 text-text-medium text-lg max-w-2xl mx-auto">
            Oferujemy pe&#322;en zakres us&#322;ug prawnych dedykowanych
            sektorowi IT/Tech
          </p>
        </ScrollReveal>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {specializations.map((spec, i) => {
            const title = spec.title
              ? `${spec.title} ${spec.highlight}`
              : spec.highlight;

            return (
              <ScrollReveal key={i} delay={i * 80}>
                <Link
                  href={`/specjalizacje/${spec.slug}`}
                  className="relative overflow-hidden rounded-xl border border-text-dark/[0.08] bg-gradient-to-b from-primary/[0.06] via-bg-light to-bg-light p-5 sm:p-7 flex flex-col h-[230px] group hover:border-primary/20 hover:shadow-lg transition-all duration-500 block"
                >
                  {/* Watermark icon */}
                  <div
                    className="absolute top-4 right-4 text-primary/[0.07] group-hover:text-primary/[0.14] transition-colors duration-500 pointer-events-none w-12 h-12 sm:w-14 sm:h-14 [&>svg]:w-full [&>svg]:h-full"
                    aria-hidden="true"
                  >
                    <SpecIcon icon={spec.icon} />
                  </div>

                  {/* Roman numeral */}
                  <span className="text-4xl sm:text-5xl font-heading stat-gradient-text opacity-25 group-hover:opacity-40 transition-opacity duration-500 leading-none select-none">
                    {roman[i]}
                  </span>

                  {/* Content pushed to bottom */}
                  <div className="mt-auto pt-5">
                    <h3 className="text-base sm:text-lg font-bold text-text-dark leading-snug mb-2">
                      {title}
                    </h3>
                    <p className="text-text-medium text-[0.8rem] leading-relaxed line-clamp-2">
                      {spec.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-[0.8rem] font-semibold mt-2 group-hover:gap-2 transition-all duration-300">
                      Czytaj
                      <svg
                        width="14"
                        height="14"
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
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}

          {/* CTA Card */}
          <ScrollReveal delay={8 * 80} className="sm:col-span-2 lg:col-span-1">
            <div className="relative overflow-hidden rounded-xl border border-primary/15 bg-gradient-to-b from-primary/[0.08] via-primary/[0.03] to-bg-light p-5 sm:p-7 flex flex-col items-center justify-center text-center h-[230px]">
              <span
                className="text-4xl sm:text-5xl font-heading stat-gradient-text opacity-15 leading-none select-none mb-5"
                aria-hidden="true"
              >
                ?
              </span>
              <p className="text-text-medium mb-6 text-[0.9rem] leading-relaxed max-w-xs">
                Szukasz wsparcia w&nbsp;innym obszarze prawa IT?
              </p>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2.5 bg-primary text-white font-semibold px-7 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 group/btn"
              >
                Skontaktuj si&#281;
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
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
