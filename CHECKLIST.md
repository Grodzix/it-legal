# Pre-Launch Checklist — Next.js + Cloudflare

> **Template:** Przy każdym nowym projekcie skopiuj ten plik i odhaczaj `[x]` punkt po punkcie.

---

## 1. SEO i Meta

- [ ] Unikalne `<title>` na każdej stronie (50–60 znaków)
- [ ] Unikalne `<meta name="description">` na każdej stronie (150–160 znaków)
- [ ] Open Graph: `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`
- [ ] Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Canonical URL (`<link rel="canonical">`) na każdej stronie
- [ ] Structured Data / JSON-LD (Organization, LocalBusiness, BreadcrumbList, FAQ — zależnie od strony)
- [ ] `robots.txt` — poprawny, nie blokuje ważnych zasobów
- [ ] `sitemap.xml` — dynamiczny, zawiera wszystkie publiczne strony
- [ ] Hreflang (jeśli strona wielojęzyczna)
- [ ] Jedno `<h1>` na stronę, poprawna hierarchia nagłówków (h1 → h2 → h3, bez przeskoków)
- [ ] Alt text na wszystkich obrazkach (opisowy, nie keyword-stuffing)
- [ ] Czyste, opisowe URLe (bez `?id=123`, kebab-case)
- [ ] Favicon `.ico` + `apple-touch-icon` + `manifest.json`

---

## 2. Standardowe pliki i well-known URIs

- [ ] `/.well-known/security.txt` — RFC 9116: Contact, Expires, Preferred-Languages, Canonical
- [ ] `robots.txt` — obecny i poprawny (patrz sekcja SEO)
- [ ] `sitemap.xml` — obecny i aktualny (patrz sekcja SEO)
- [ ] `site.webmanifest` / `manifest.json` — name, short_name, icons, theme_color, background_color, display
- [ ] `browserconfig.xml` — msapplication-TileColor, TileImage
- [ ] `favicon.ico` + `apple-touch-icon.png` + favicony w rozmiarach: 16, 32, 192, 512

**DNS TXT records:**

- [ ] SPF record — jeśli domena wysyła maile (formularze, powiadomienia)
- [ ] DKIM — podpis kryptograficzny maili
- [ ] DMARC — polityka obsługi maili niespełniających SPF/DKIM
- [ ] CAA record — określenie dozwolonych CA dla certyfikatów SSL

---

## 3. Performance

- [ ] Lighthouse Performance score: cel ≥ 95
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Obrazki: format WebP/AVIF, `next/image` z lazy loading, responsive `srcset`
- [ ] Fonty: `font-display: swap`, preload krytycznych fontów, self-hosting (nie Google Fonts CDN)
- [ ] Bundle analysis — brak niepotrzebnych zależności (`@next/bundle-analyzer`)
- [ ] Minifikacja CSS/JS (automatyczne w Next.js production build)
- [ ] Kompresja Brotli/gzip (Cloudflare domyślnie)
- [ ] Cache headers na statycznych assetach (plik `_headers` lub `_routes.json` w Cloudflare)
- [ ] Preconnect do zewnętrznych domen (`<link rel="preconnect">`)
- [ ] Brak render-blocking resources
- [ ] Lazy loading komponentów below-the-fold (`next/dynamic`)

---

## 4. Bezpieczeństwo — nagłówki HTTP

- [ ] HTTPS wymuszone (redirect HTTP → HTTPS)
- [ ] `Strict-Transport-Security` (HSTS): `max-age=31536000; includeSubDomains; preload`
- [ ] `Content-Security-Policy` — restrykcyjne, dostosowane do potrzeb strony
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY` lub `SAMEORIGIN` (albo CSP `frame-ancestors`)
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Permissions-Policy` — wyłączenie niepotrzebnych API (camera, microphone, geolocation, itp.)
- [ ] `X-XSS-Protection: 0` (przestarzały, CSP go zastępuje — ustawić na 0 żeby nie interferował)

---

## 5. Bezpieczeństwo — aplikacja

- [ ] Brak wrażliwych danych w kodzie klienckim (klucze API, tokeny, sekrety)
- [ ] Zmienne env poprawnie skonfigurowane (`.env.local` nie commitowane do repo)
- [ ] Input sanitization na serwerze (Server Actions / API routes)
- [ ] Rate limiting na API routes / Server Actions
- [ ] CORS skonfigurowany poprawnie (jeśli API)
- [ ] Cookie flags: `Secure`, `HttpOnly`, `SameSite=Strict` lub `Lax`
- [ ] Subresource Integrity (SRI) na zewnętrznych skryptach
- [ ] Brak `dangerouslySetInnerHTML` bez sanitizacji (lub z biblioteką typu DOMPurify)
- [ ] Dependency audit: `npm audit` bez krytycznych/wysokich vulnerabilities

---

## 6. Formularze

- [ ] Ochrona antyspamowa: Cloudflare Turnstile / honeypot / oba
- [ ] Walidacja server-side (nie tylko client-side!)
- [ ] Walidacja client-side z czytelnymi komunikatami błędów (po polsku)
- [ ] Feedback sukcesu po wysłaniu (toast / zmiana stanu formularza)
- [ ] Rate limiting na endpoint formularza
- [ ] Powiadomienie email po otrzymaniu zgłoszenia
- [ ] Zapis zgłoszeń jako backup (DB, KV, lub email)
- [ ] Checkbox zgody na przetwarzanie danych osobowych (RODO) przy formularzach kontaktowych

---

## 7. Dostępność (a11y)

- [ ] WCAG 2.1 AA compliance (minimum)
- [ ] Nawigacja klawiaturą działa poprawnie (Tab, Shift+Tab, Enter, Escape)
- [ ] Focus indicators widoczne (nie usuwać `outline` bez zamiennika)
- [ ] Kontrast kolorów ≥ 4.5:1 (normalny tekst), ≥ 3:1 (duży tekst / UI)
- [ ] ARIA labels na interaktywnych elementach bez widocznego tekstu
- [ ] Skip navigation link (`Przejdź do treści`)
- [ ] Wszystkie pola formularzy z powiązanym `<label>`
- [ ] Poprawna hierarchia nagłówków (bez przeskoków)
- [ ] `prefers-reduced-motion` obsłużone (wyłączenie/redukcja animacji)
- [ ] Test screen readerem (NVDA na Windows, VoiceOver na macOS/iOS)
- [ ] `lang="pl"` na `<html>` (lub odpowiedni język)

---

## 8. Prawne i compliance

- [ ] Polityka prywatności — RODO-compliant, z wymaganymi klauzulami
- [ ] Regulamin (jeśli e-commerce / SaaS / aplikacja z rejestracją)
- [ ] Informacja o cookies + mechanizm consent (cookie banner z możliwością odmowy)
- [ ] Dane firmy w stopce: nazwa, NIP, adres siedziby (wymóg prawny w PL)
- [ ] Klauzula informacyjna RODO przy formularzach kontaktowych
- [ ] **Audyt praw autorskich**: obrazki (licencje stockowe), fonty (licencje), treści (brak plagiatu)
- [ ] Licencje bibliotek open-source — sprawdzić kompatybilność (MIT, Apache OK; GPL uwaga)
- [ ] Copyright notice w stopce z aktualnym rokiem

---

## 9. Cross-browser i urządzenia

- [ ] Chrome (desktop + Android)
- [ ] Firefox (desktop)
- [ ] Safari (desktop macOS + iOS)
- [ ] Edge (desktop)
- [ ] Samsung Internet (mobile)
- [ ] Responsive: mobile 375px+, tablet 768px+, desktop 1280px+
- [ ] Test na prawdziwych urządzeniach (nie tylko Chrome DevTools)
- [ ] Dark mode (jeśli obsługiwany — test spójności)
- [ ] Print stylesheet (jeśli potrzebny — np. artykuły, oferty)

---

## 10. Infrastruktura i deployment

- [ ] SSL certyfikat ważny (Cloudflare — automatyczny, ale sprawdzić)
- [ ] DNS poprawnie skonfigurowany (A/AAAA/CNAME, propagacja OK)
- [ ] Redirect www → non-www (lub odwrotnie) — konsekwentnie, jeden wariant
- [ ] Trailing slash — konsekwentna strategia (`trailingSlash` w `next.config.ts`)
- [ ] Custom 404 page (ładna, z linkiem do strony głównej)
- [ ] Custom 500 / error page
- [ ] Cloudflare: caching rules, security level, WAF rules
- [ ] CI/CD pipeline skonfigurowany (GitHub Actions → Cloudflare Workers)
- [ ] Environment variables ustawione w produkcji (Cloudflare dashboard / wrangler)
- [ ] Preview deployments działające (PR preview)

---

## 11. QA — kontrola jakości

- [ ] Broken links scan — całe site (narzędzie: linkchecker, Screaming Frog, lub online)
- [ ] Sprawdzenie pisowni i literówek
- [ ] Brak błędów w konsoli przeglądarki (JS errors, 404, mixed content)
- [ ] Wszystkie linki wewnętrzne działają
- [ ] Linki zewnętrzne otwierają się w nowej karcie (`target="_blank"` z `rel="noopener"`)
- [ ] Formularze przetestowane end-to-end (wysłanie, walidacja, feedback, email)
- [ ] Linki `tel:` i `mailto:` działają poprawnie
- [ ] Wszystkie obrazki się ładują (brak 404)
- [ ] Fonty się ładują poprawnie (brak FOUT/FOIT)
- [ ] Animacje płynne (60fps, brak janku)
- [ ] Brak layout shifts (CLS = 0 idealnie)

---

## 12. Analytics i monitoring

- [ ] Analytics zainstalowane i działające (Plausible / Umami / GA4)
- [ ] Google Search Console — site zweryfikowany, sitemap zgłoszony
- [ ] Uptime monitoring (Cloudflare Health Checks / UptimeRobot / Better Stack)
- [ ] Error tracking (Sentry / LogRocket)
- [ ] Web Vitals monitoring (w analytics lub Chrome UX Report)

---

## 13. Pre-launch — final check

- [ ] Lighthouse audit: Performance, Accessibility, Best Practices, SEO — wszystkie ≥ 95
- [ ] PageSpeed Insights test (mobile + desktop)
- [ ] Rich Results Test (Google) — jeśli są Structured Data
- [ ] Social media preview test (og:image, Twitter Card — użyć opengraph.xyz lub podobne)
- [ ] `robots.txt` NIE blokuje produkcji (częsty błąd po developmencie z `Disallow: /`)
- [ ] `noindex` usunięte z produkcji (meta tag i header)
- [ ] Sitemap zgłoszony do Google Search Console
- [ ] Backup DNS / rollback plan gotowy
- [ ] Smoke test na produkcji po deployu (przejść kluczowe ścieżki ręcznie)
