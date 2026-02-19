import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { specializations } from "@/lib/data";
import {
  specArticles,
  ipBoxExtraSection,
} from "@/lib/specialization-articles";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return specializations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = specArticles.find((a) => a.slug === slug);
  if (!article) return {};

  const title = `${article.title} – IT Legal`;
  const description = article.intro.slice(0, 160);
  const url = `/specjalizacje/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "IT Legal",
      locale: "pl_PL",
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function SpecializationPage({ params }: Props) {
  const { slug } = await params;
  const article = specArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const spec = specializations.find((s) => s.slug === slug);
  const isIpBox = slug === "ip-box";

  const specName = spec
    ? [spec.title, spec.highlight].filter(Boolean).join(" ")
    : article.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: specName,
        description: article.intro,
        provider: { "@id": "https://it-legal.pl/#organization" },
        areaServed: { "@type": "Country", name: "Polska" },
        url: `https://it-legal.pl/specjalizacje/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona główna",
            item: "https://it-legal.pl",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Specjalizacje",
            item: "https://it-legal.pl/#specjalizacje",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: specName,
            item: `https://it-legal.pl/specjalizacje/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main id="main" className="min-h-screen bg-bg-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-to-b from-primary/[0.06] via-bg-light to-bg-light overflow-hidden">
        <div
          className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <ScrollReveal>
            <a
              href="/#specjalizacje"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors text-sm font-semibold mb-8 group"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Specjalizacje
            </a>
          </ScrollReveal>

          <ScrollReveal>
            <p className="section-label mb-4">
              {spec?.title || spec?.highlight}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark leading-tight">
              {article.title}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <ScrollReveal>
            <p className="text-text-medium text-lg leading-relaxed mb-10">
              {article.intro}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl font-bold text-text-dark mb-8">
              {article.listHeading}
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {article.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="glass rounded-xl p-6 sm:p-8 shadow-sm border border-transparent hover:border-primary/10 transition-colors duration-300">
                  <h3 className="text-base sm:text-lg font-bold text-text-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-medium text-[0.9rem] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Extra section for IP BOX */}
          {isIpBox && (
            <>
              <ScrollReveal>
                <h2 className="text-xl sm:text-2xl font-bold text-text-dark mt-14 mb-4">
                  {ipBoxExtraSection.heading}
                </h2>
                <p className="text-text-medium text-lg leading-relaxed mb-8">
                  {ipBoxExtraSection.intro}
                </p>
              </ScrollReveal>

              <div className="space-y-6">
                {ipBoxExtraSection.items.map((item, i) => (
                  <ScrollReveal key={`extra-${i}`} delay={i * 60}>
                    <div className="glass rounded-xl p-6 sm:p-8 shadow-sm border border-transparent hover:border-primary/10 transition-colors duration-300">
                      <h3 className="text-base sm:text-lg font-bold text-text-dark mb-2">
                        {item.title}
                      </h3>
                      <p className="text-text-medium text-[0.9rem] leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </>
          )}

          <ScrollReveal>
            <p className="text-text-medium text-lg leading-relaxed mt-12 mb-14">
              {article.outro}
            </p>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <div className="glass rounded-2xl p-8 sm:p-12 text-center shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-text-dark mb-3">
                Potrzebujesz wsparcia?
              </h2>
              <p className="text-text-medium mb-6 max-w-md mx-auto">
                Skontaktuj si&#281; z nami, aby om&oacute;wi&#263; szczeg&oacute;&#322;y
                wsp&oacute;&#322;pracy. Pierwsza konsultacja jest bezp&#322;atna.
              </p>
              <a
                href="/#kontakt"
                className="inline-flex items-center gap-2.5 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 group"
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
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
