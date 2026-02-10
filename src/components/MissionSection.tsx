import { aboutData } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const pillars = [
  {
    num: "01",
    title: "Kontrakty IT",
    desc: "Tworzenie, negocjowanie i audyt um\u00F3w wdrożeniowych, licencyjnych, SaaS, maintenance i outsourcingowych.",
  },
  {
    num: "02",
    title: "Ochrona IP & Danych",
    desc: "Prawo autorskie, znaki towarowe, RODO, polityki prywatno\u015Bci, umowy powierzenia danych osobowych.",
  },
  {
    num: "03",
    title: "Compliance",
    desc: "Zgodno\u015B\u0107 z regulacjami bran\u017Cowymi, audyty prawne, procedury wewn\u0119trzne, szkolenia dla zespo\u0142\u00F3w.",
  },
  {
    num: "04",
    title: "Negocjacje & Spory",
    desc: "Reprezentacja w negocjacjach kontraktowych, mediacja, rozwi\u0105zywanie spor\u00F3w technologicznych.",
  },
];

export default function MissionSection() {
  return (
    <section className="py-12 sm:py-16" aria-labelledby="mission-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* ── Header: heading + text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
          <ScrollReveal direction="left">
            <p className="section-label mb-4">{aboutData.sectionLabel}</p>
            <h2
              id="mission-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-text-dark"
            >
              {aboutData.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="lg:pt-12">
              {aboutData.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-text-medium leading-relaxed mb-5 last:mb-0 text-[1.05rem]"
                >
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ── Gradient divider ── */}
        <ScrollReveal>
          <div className="my-16 sm:my-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </ScrollReveal>

        {/* ── Numbered Pillars ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.num} delay={i * 100}>
              <div className="group">
                <div className="h-px w-full bg-primary/20 group-hover:bg-primary/50 transition-colors duration-300 mb-6" />
                <span className="text-[2.5rem] font-bold stat-gradient-text leading-none">
                  {pillar.num}
                </span>
                <h3 className="text-lg font-bold text-text-dark mt-4 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[0.9rem] text-text-medium leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
