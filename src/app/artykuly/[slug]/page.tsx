import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { knowledgeBaseData } from "@/lib/data";
import { articleContents } from "@/lib/article-contents";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return knowledgeBaseData.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = knowledgeBaseData.posts.find((p) => p.slug === slug);
  if (!post) return {};

  const title = `${post.title} – IT Legal`;
  const description = post.excerpt.slice(0, 160);
  const url = `/artykuly/${slug}`;

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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = knowledgeBaseData.posts.find((p) => p.slug === slug);
  const content = articleContents[slug];
  if (!post || !content) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: "Paweł Sokołowski",
          "@id": "https://it-legal.pl/#person",
        },
        publisher: { "@id": "https://it-legal.pl/#organization" },
        mainEntityOfPage: `https://it-legal.pl/artykuly/${slug}`,
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
            name: "Baza wiedzy",
            item: "https://it-legal.pl/#baza-wiedzy",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://it-legal.pl/artykuly/${slug}`,
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
            <Link
              href="/#baza-wiedzy"
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
              Baza wiedzy
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {post.category}
              </span>
              <time className="text-sm text-text-light">{post.date}</time>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark leading-tight">
              {post.title}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          {/* Intro */}
          <ScrollReveal>
            <p className="text-text-medium text-lg leading-relaxed mb-12">
              {content.intro}
            </p>
          </ScrollReveal>

          {/* Sections */}
          <div className="space-y-12">
            {content.sections.map((section, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <h2 className="text-xl sm:text-2xl font-bold text-text-dark mb-4">
                  {section.heading}
                </h2>
                <p className="text-text-medium leading-relaxed mb-6">
                  {section.content}
                </p>
                {section.items && section.items.length > 0 && (
                  <div className="space-y-4">
                    {section.items.map((item, j) => (
                      <div
                        key={j}
                        className="glass rounded-xl p-6 shadow-sm border border-transparent hover:border-primary/10 transition-colors duration-300"
                      >
                        <p className="text-text-medium text-[0.9rem] leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>

          {/* Conclusion */}
          <ScrollReveal>
            <div className="mt-12 mb-10 rounded-2xl bg-gradient-to-b from-primary/[0.06] to-bg-light p-8 sm:p-10">
              <h2 className="text-xl font-bold text-text-dark mb-4">
                Podsumowanie
              </h2>
              <p className="text-text-medium text-lg leading-relaxed">
                {content.conclusion}
              </p>
            </div>
          </ScrollReveal>

          {/* Sources */}
          {content.sources && content.sources.length > 0 && (
            <ScrollReveal>
              <div className="mb-14">
                <h3 className="text-sm font-semibold text-text-dark mb-3">
                  Dodatkowe źródła wiedzy
                </h3>
                <ul className="space-y-1">
                  {content.sources.map((src, i) => (
                    <li key={i}>
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {src}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}

          {/* CTA */}
          <ScrollReveal>
            <div className="glass rounded-2xl p-8 sm:p-12 text-center shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-text-dark mb-3">
                Potrzebujesz wsparcia prawnego?
              </h2>
              <p className="text-text-medium mb-6 max-w-md mx-auto">
                Skontaktuj si&#281; z nami, aby om&oacute;wi&#263;
                szczeg&oacute;&#322;y wsp&oacute;&#322;pracy. Pierwsza
                konsultacja jest bezp&#322;atna.
              </p>
              <Link
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
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
