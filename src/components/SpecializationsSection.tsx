import { specializations } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

function SpecIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    contract: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    shield: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    cloud: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    lock: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    cube: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    brain: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.9 2-2 2h-4a2 2 0 0 1-2-2 4 4 0 0 1 4-4z" />
        <path d="M12 8v14" />
        <path d="M8 12a4 4 0 0 0-4 4c0 2 2 4 4 4" />
        <path d="M16 12a4 4 0 0 1 4 4c0 2-2 4-4 4" />
        <circle cx="9" cy="14" r="1" fill="currentColor" />
        <circle cx="15" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
    tax: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M8 7v10" />
        <path d="M12 7v10" />
        <path d="M16 7v10" />
        <path d="M2 12h20" />
      </svg>
    ),
    dots: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="5" r="1" fill="currentColor" />
        <circle cx="12" cy="19" r="1" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
      {icons[icon] || icons.dots}
    </div>
  );
}

export default function SpecializationsSection() {
  return (
    <section
      id="specjalizacje"
      className="py-24 sm:py-32 bg-bg-medium/50"
      aria-labelledby="spec-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="section-label mb-4">Specjalizacje</p>
          <h2
            id="spec-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark"
          >
            Kompleksowe wsparcie prawne
          </h2>
          <p className="mt-4 text-text-medium text-lg max-w-2xl mx-auto">
            Oferujemy pełen zakres usług prawnych dedykowanych sektorowi IT/Tech
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal-stagger">
          {specializations.map((spec, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="glass rounded-2xl p-6 sm:p-7 h-full card-hover cursor-default group">
                <SpecIcon icon={spec.icon} />
                <h3 className="mt-5 text-lg font-semibold text-text-dark group-hover:text-primary transition-colors">
                  {spec.title}{" "}
                  <span className="text-primary">{spec.highlight}</span>
                </h3>
                <p className="mt-3 text-sm text-text-medium leading-relaxed">
                  {spec.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-primary-dark transition-all hover:shadow-xl"
          >
            Zapytaj o szczegóły
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
