"use client";

import { useState } from "react";
import Link from "next/link";
import { knowledgeBaseData } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const INITIAL_COUNT = 2;

export default function KnowledgeBaseSection() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const posts = knowledgeBaseData.posts;
  const hasMore = visibleCount < posts.length;

  return (
    <section
      id="baza-wiedzy"
      className="py-12 sm:py-16 bg-bg-medium/50"
      aria-labelledby="kb-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="section-label mb-4">
            {knowledgeBaseData.sectionLabel}
          </p>
          <h2
            id="kb-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark"
          >
            {knowledgeBaseData.heading}
          </h2>
          <p className="mt-4 text-text-medium text-lg max-w-2xl mx-auto">
            {knowledgeBaseData.subheading}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {posts.slice(0, visibleCount).map((post, i) => (
            <ScrollReveal key={post.slug} delay={i < INITIAL_COUNT ? i * 120 : 0}>
              <Link href={`/artykuly/${post.slug}`} className="block h-full">
                <article className="glass rounded-2xl p-8 sm:p-9 h-full flex flex-col card-hover group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {post.category}
                    </span>
                    <time className="text-xs text-text-light" dateTime={post.date}>
                      {post.date}
                    </time>
                  </div>
                  <h3 className="text-lg font-semibold text-text-dark group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-text-medium leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-6 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    Czytaj więcej
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
                  </span>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount(posts.length)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-8 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              Załaduj więcej
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
