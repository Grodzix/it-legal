import { teamData } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "10+", label: "Lat doświadczenia w IT/Tech" },
  { value: ">1 mld", unit: "zł", label: "Wartość obsłużonych kontraktów" },
  { value: "30+", label: "Firm z pierwszej 100 największych polskich spółek" },
];

const credentials = [
  "Wdrożenia złożonych systemów IT w bankach, ubezpieczeniach, telekomach i administracji publicznej",
  "Kompleksowa obsługa prawna giganta technologicznego z USA",
  "Współautor opracowania \u201EPolishCloud 2.0\u201D \u2014 Związek Banków Polskich",
  "Członek Grupy Roboczej AI \u2014 Ministerstwo Cyfryzacji & PIIT",
];

export default function AboutSection() {
  return (
    <section
      id="o-nas"
      className="py-16 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* ── Founder — Achievement Grid ── */}
        <div>
          <ScrollReveal>
            <div className="text-center mb-12">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold stat-gradient-text leading-tight">
                {teamData.name}
              </h3>
              <p className="text-primary font-semibold mt-3 text-lg tracking-wide uppercase">
                {teamData.role}
              </p>

            </div>
          </ScrollReveal>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="glass rounded-2xl p-6 sm:p-8 card-hover shadow-sm text-center h-full flex flex-col justify-center">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold stat-gradient-text leading-none">
                    {s.value}
                    {s.unit && (
                      <span className="text-xl sm:text-2xl ml-1">{s.unit}</span>
                    )}
                  </p>
                  <p className="text-sm text-text-medium mt-3 leading-snug">
                    {s.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Credentials */}
          <ScrollReveal>
            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl mx-auto">
              {credentials.map((cred, i) => (
                <li key={i} className="flex gap-3 text-text-medium">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 mt-0.5 text-primary"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="leading-relaxed text-[0.9rem]">{cred}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mt-12">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2.5 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
              >
                Umów konsultację
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
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
