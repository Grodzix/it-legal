import type { MetadataRoute } from "next";

// DEMO: zwracamy pustą sitemapę — strona nie ma być indeksowana.
// Odkomentuj poniższy import i zawartość przed deployem produkcyjnym.
// import { specializations, knowledgeBaseData } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
