import { aboutData, teamData } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function AboutSection() {
  return (
    <section
      id="o-nas"
      className="py-24 sm:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <p className="section-label mb-4">{aboutData.sectionLabel}</p>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-text-dark"
            >
              {aboutData.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="glass rounded-2xl p-8 sm:p-10 shadow-md">
              {aboutData.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-text-medium leading-relaxed mb-4 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Founder / Team */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="flex flex-col items-center lg:items-start gap-8">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center glass shadow-lg">
                <span className="text-7xl font-bold text-primary/40">PS</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-text-dark text-center lg:text-left">
                  {teamData.name}
                </h3>
                <p className="text-primary font-medium mt-1 text-center lg:text-left">
                  {teamData.role}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {teamData.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:col-span-3">
            <div className="glass rounded-2xl p-8 sm:p-10 shadow-md">
              <p className="text-lg text-text-dark font-medium mb-6">
                {teamData.bio}
              </p>
              <ul className="space-y-4">
                {teamData.credentials.map((cred, i) => (
                  <li key={i} className="flex gap-3 text-text-medium">
                    <svg
                      width="20"
                      height="20"
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
                    <span className="leading-relaxed">{cred}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Umów konsultację z mec. Sokołowskim
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
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
