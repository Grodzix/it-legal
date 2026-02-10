import type { MetadataRoute } from "next";
import { specializations, knowledgeBaseData } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://it-legal.pl";

  const specPages = specializations.map((s) => ({
    url: `${base}/specjalizacje/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articlePages = knowledgeBaseData.posts.map((p) => ({
    url: `${base}/artykuly/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...specPages,
    ...articlePages,
  ];
}
