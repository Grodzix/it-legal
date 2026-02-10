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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingData.tiers.map((tier, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div
                className={`rounded-2xl p-8 sm:p-9 h-full flex flex-col card-hover ${
                  tier.highlighted
                    ? "bg-primary text-white shadow-xl ring-2 ring-primary/20"
                    : "glass shadow-md"
                }`}
              >
                <h3
                  className={`text-xl font-bold ${
                    tier.highlighted ? "text-white" : "text-text-dark"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    tier.highlighted ? "text-white/80" : "text-text-medium"
                  }`}
                >
                  {tier.description}
                </p>

                <ul className="mt-8 space-y-3 flex-1">
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

                <a
                  href="#kontakt"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    tier.highlighted
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary text-white hover:bg-primary-dark"
                  }`}
                >
                  {tier.cta}
                  <svg
                    width="16"
                    height="16"
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
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <p className="text-sm text-text-medium">
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
