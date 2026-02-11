---
name: Cloudflare integrations plan
overview: Integracja Cloudflare Turnstile (antyspam), Cloudflare Email Workers (email), Cloudflare Web Analytics oraz rate limiting na formularzu kontaktowym.
todos:
  - id: get-turnstile-keys
    content: "User: Utworzyc widget Turnstile w CF i podac Site Key + Secret Key"
    status: pending
  - id: setup-email-routing
    content: "User: Wlaczyc Email Routing w CF i zweryfikowac biuro@it-legal.pl jako destination"
    status: pending
  - id: get-cf-analytics
    content: "User: Dodac site w CF Web Analytics i podac token"
    status: pending
  - id: impl-turnstile
    content: Zaimplementowac Turnstile widget w formularzu + weryfikacje server-side
    status: pending
  - id: impl-email
    content: Zaimplementowac wysylke email przez CF Email Workers w server action
    status: pending
  - id: impl-analytics
    content: Dodac CF Web Analytics snippet do layout + zaktualizowac CSP
    status: pending
  - id: impl-rate-limit
    content: Dodac rate limiting do server action (5 req / 15 min / IP)
    status: pending
isProject: false
---

# Integracja Cloudflare: Turnstile, Email Workers, Analytics, Rate Limiting

## Co musisz zrobic w Cloudflare dashboard

### 1. Cloudflare Turnstile

1. [Cloudflare Dashboard > Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
2. **Add widget** > Nazwa: `it-legal`, Domena: `it-legal.pl`
3. Widget type: **Managed**
4. Skopiuj **Site Key** i **Secret Key** i daj mi oba

### 2. Cloudflare Email Routing

1. [Cloudflare Dashboard > it-legal.pl > Email > Email Routing](https://dash.cloudflare.com/?to=/:account/:zone/email/routing)
2. Wlacz **Email Routing** jesli jeszcze nie jest wlaczone
3. Dodaj **Destination address**: `biuro@it-legal.pl` (lub inny docelowy email)
4. Potwierdz adres klikajac link w mailu weryfikacyjnym
5. Daj mi znac jak gotowe (nie potrzebuje kluczy - uzyje binding w wrangler)

### 3. Cloudflare Web Analytics

1. [Cloudflare Dashboard > Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics)
2. Dodaj site `it-legal.pl`
3. Skopiuj **token** z JS snippet (wartosc `data-cf-beacon` / `token`)
4. Daj mi token

---

## Co ja zrobie po otrzymaniu danych

### Turnstile

- Dodam Turnstile widget do [src/components/ContactSection.tsx](src/components/ContactSection.tsx) (script embed + `cf-turnstile` div)
- Weryfikacja tokena server-side w [src/actions/contact.ts](src/actions/contact.ts) (POST `https://challenges.cloudflare.com/turnstile/v0/siteverify`)
- Secret key jako env var (`TURNSTILE_SECRET_KEY`)
- Zaktualizuje CSP w [public/_headers](public/_headers) o `challenges.cloudflare.com`

### Cloudflare Email Workers

- Zainstaluje `mimetext` (do budowania MIME wiadomosci)
- Dodam `send_email` binding do [wrangler.jsonc](wrangler.jsonc):
  ```jsonc
  "send_email": [{ "name": "EMAIL", "destination_address": "biuro@it-legal.pl" }]
  ```
- W [src/actions/contact.ts](src/actions/contact.ts) po walidacji wysle email uzywajac `cloudflare:email`:
  - Od: `formularz@it-legal.pl`
  - Do: `biuro@it-legal.pl` (przez binding)
  - Temat: "Nowe zgloszenie: {name}"
  - Tresc: dane z formularza
- Dostep do env przez `getCloudflareContext()` z `@opennextjs/cloudflare`
- Wygeneruje typy: `npx wrangler types`

### Cloudflare Web Analytics

- Dodam `<script>` z tokenem do [src/app/layout.tsx](src/app/layout.tsx)
- Zero-cookie, GDPR-friendly
- Zaktualizuje CSP o `static.cloudflareinsights.com`

### Rate limiting

- In-memory IP-based rate limiter w [src/actions/contact.ts](src/actions/contact.ts)
- 5 requestow / 15 minut per IP
- Na CF Workers `Map` jest per-isolate, wiec to nie jest bullet-proof, ale wystarczy na MVP

### Env vars do ustawienia po deployu

```
TURNSTILE_SECRET_KEY=xxx
```

Via: `npx wrangler secret put TURNSTILE_SECRET_KEY`
(Email Workers nie wymaga secrets - dziala przez binding)