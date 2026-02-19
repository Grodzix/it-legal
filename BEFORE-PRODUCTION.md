# Przed deployem produkcyjnym

Strona demo ma zablokowane indeksowanie na 4 warstwach. Przed deployem dla klienta **cofnij każdą z nich**.

---

## 1. `public/robots.txt`

Zamień całą zawartość na:

```
User-agent: *
Allow: /

Sitemap: https://it-legal.pl/sitemap.xml
```

## 2. `src/app/layout.tsx` — metadata.robots

Zmień blok `robots` z powrotem na:

```ts
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
},
```

## 3. `public/_headers`

Usuń tę linijkę:

```
X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex
```

## 4. `src/app/sitemap.ts`

Odkomentuj import i przywróć pełną zawartość:

```ts
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
```

---

## Weryfikacja po deployu

- [ ] Otwórz `https://it-legal.pl/robots.txt` — powinien zawierać `Allow: /`
- [ ] Otwórz `https://it-legal.pl/sitemap.xml` — powinien listować wszystkie URL-e
- [ ] Sprawdź `curl -I https://it-legal.pl` — **brak** nagłówka `X-Robots-Tag`
- [ ] Sprawdź źródło strony — `<meta name="robots" content="index, follow">`
- [ ] Zgłoś stronę do indeksowania w Google Search Console
