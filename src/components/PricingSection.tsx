import { pricingData } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function PricingSection() {
  return (
    <section
      id="cennik"
      className="py-12 sm:py-16"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="section-label mb-4">{pricingData.sectionLabel}</p>
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark"
          >
            {pricingData.heading}
          </h2>
          <p className="mt-4 text-text-medium text-lg max-w-2xl mx-auto">
            {pricingData.subheading}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {pricingData.tiers.map((tier, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div
                className={`rounded-2xl p-8 sm:p-9 h-full flex flex-col card-hover ${
                  tier.highlighted
                    ? "bg-primary text-white shadow-xl ring-2 ring-primary/20"
                    : "glass shadow-md"
                }`}
              >
                {/* Name + Price — always at top so prices align across cards */}
                <h3
                  className={`text-xl font-bold ${
                    tier.highlighted ? "text-white" : "text-text-dark"
                  }`}
                >
                  {tier.name}
                </h3>

                {tier.price && (
                  <div className="mt-3">
                    <span
                      className={`text-3xl font-bold ${
                        tier.highlighted ? "text-white" : "text-text-dark"
                      }`}
                    >
                      {tier.price}
                    </span>
                    {tier.priceSuffix && (
                      <span
                        className={`block text-sm mt-1 ${
                          tier.highlighted ? "text-white/70" : "text-text-light"
                        }`}
                      >
                        {tier.priceSuffix}
                      </span>
                    )}
                  </div>
                )}

                {tier.description && (
                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      tier.highlighted ? "text-white/80" : "text-text-medium"
                    }`}
                  >
                    {tier.description}
                  </p>
                )}

                {tier.features && tier.features.length > 0 && (
                  <ul className="mt-6 space-y-3 flex-1">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`flex-shrink-0 mt-0.5 ${
                            tier.highlighted ? "text-white/90" : "text-primary"
                          }`}
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span
                          className={`text-sm leading-relaxed ${
                            tier.highlighted ? "text-white/90" : "text-text-medium"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Spacer when no features to push CTA to bottom */}
                {(!tier.features || tier.features.length === 0) && (
                  <div className="flex-1" />
                )}

                {tier.calLink ? (
                  <button
                    data-cal-link={tier.calLink}
                    data-cal-namespace={tier.calNamespace}
                    data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all cursor-pointer ${
                      tier.highlighted
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {tier.cta}
                  </button>
                ) : (
                  <a
                    href="#formularz"
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                      tier.highlighted
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    {tier.cta}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <p className="text-sm text-text-medium">
            {pricingData.footnote}.{" "}
            Każda wycena jest indywidualna i zależy od zakresu oraz
            złożoności sprawy.{" "}
            <a href="#kontakt" className="text-primary font-medium hover:underline">
              Skontaktuj się
            </a>{" "}
            po szczegóły.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
