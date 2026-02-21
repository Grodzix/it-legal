# Raport techniczny: Architektura e-commerce — wybór stacku i systemu koszykowego

> Dokument wewnętrzny — stan na luty 2026

---

## Spis treści

1. [Odrzucenie natywnego e-commerce Webflow](#1-odrzucenie-natywnego-e-commerce-webflow)
2. [Webflow CMS vs. Next.js + Cloudflare — warstwa wizualna](#2-webflow-cms-vs-nextjs--cloudflare--warstwa-wizualna)
3. [Rekomendacja stacku front-endowego](#3-rekomendacja-stacku-front-endowego)
4. [Odrzucenie Shopify jako systemu koszykowego](#4-odrzucenie-shopify-jako-systemu-koszykowego)
5. [Porównanie pozostałych systemów koszykowych](#5-porównanie-pozostałych-systemów-koszykowych)
6. [Rekomendacja systemu koszykowego](#6-rekomendacja-systemu-koszykowego)
7. [Rekomendowany stack i metodyka realizacji](#rekomendowany-stack-i-metodyka-realizacji)

---

## 1. Odrzucenie natywnego e-commerce Webflow

Webflow to potężne narzędzie (San Francisco, USA), które sprawdza się na rynkach, gdzie standardem jest płatność kartą kredytową. Polski e-commerce ma jednak specyficzne wymagania, których Webflow natywnie nie obsługuje. Poniżej trzy twarde bariery:

| # | Bariera | Opis |
|:---:|:---|:---|
| 1 | **Brak BLIK-a i szybkich przelewów** | Natywna integracja Webflow opiera się na Stripe — brak możliwości wyświetlenia BLIK-a czy PayU/Przelewy24 jako metod płatności w koszyku. |
| 2 | **Brak logistyki Paczkomatów** | Zamknięty system koszyka nie pozwala wstrzyknąć interaktywnej mapy InPost. Polski klient oczekuje wyboru paczkomatu — brak mapy = spadek konwersji. |
| 3 | **Eskalacja kosztów przy "łataniu"** | Próba obejścia ograniczeń zewnętrznymi wtyczkami (np. Memberstack) oznacza: abonament e-commerce Webflow (42 USD/mc) + 2 % prowizji + dodatkowe subskrypcje wtyczek. |

**Decyzja:** Natywny e-commerce Webflow odrzucony ze względów biznesowych. Sprzedaż opieramy na dedykowanym polskim rozwiązaniu koszykowym (patrz sekcja 4–6).

---

## 2. Webflow CMS vs. Next.js + Cloudflare — warstwa wizualna

Niezależnie od odrzucenia sklepu Webflow, platforma nadal może służyć jako **warstwa wizualna** (plan CMS, bez e-commerce). Poniżej porównanie z autorskim stackiem.

| Parametr | Webflow (plan CMS) | Next.js + Cloudflare |
|:---|:---|:---|
| **Hosting — koszt miesięczny** | 23 USD/mc (rocznie) lub 29 USD/mc | **0 zł** (darmowa infrastruktura Cloudflare) |
| **Koszty początkowe** | ok. 100 USD (gotowy szablon) | **0 zł** (kodowanie od zera) |
| **Zarządzanie treścią** | Zaawansowany edytor wizualny — drag & drop układu strony | Headless CMS (np. Sanity, darmowy plan) — edycja tekstu i zdjęć przez formularz |
| **Kontrola nad kodem** | Ograniczona (zamknięte środowisko no-code) | **Pełna** (100 % dostępu do kodu źródłowego) |
| **Wydajność / SEO** | Bardzo dobra | **Ekstremalnie wysoka** (pełna optymalizacja SSR/SSG w Next.js) |

Obie opcje pozwalają osiągnąć identyczny efekt wizualny, łącznie z zaawansowanymi animacjami. Różnica sprowadza się do modelu zarządzania treścią po wdrożeniu.

---

## 3. Rekomendacja stacku front-endowego

Wybór zależy od jednego pytania: **jak często klient będzie samodzielnie modyfikował stronę?**

### Scenariusz A — Webflow ma sens

Klient planuje **kilka razy w miesiącu** samodzielnie wchodzić do panelu: dodawać sekcje, przenosić obrazki, tworzyć nowe podstrony. Wtedy ~1 100 zł/rok za pełnoprawny edytor wizualny jest uzasadnionym kosztem.

### Scenariusz B — Next.js + Cloudflare (rekomendowany)

Strona ma „stać i wyglądać". Klient sporadycznie zmienia literówkę, cenę lub zdjęcie — raz na kwartał, może rzadziej. W tym scenariuszu:

- Budujemy w **Next.js na darmowym Cloudflare**.
- Podpinamy **Headless CMS** (np. Sanity) — prosty formularz do edycji tekstu i wgrywania zdjęć.
- Koszt utrzymania: **0 zł/mc**.
- Pełna kontrola techniczna, brak ograniczeń architektonicznych.

Klient nie dostaje edytora drag & drop, ale dostaje przejrzysty panel, w którym wpisuje nowy tekst lub wgrywa zdjęcie — strona aktualizuje się automatycznie.

---

---

## 4. Odrzucenie Shopify jako systemu koszykowego

Shopify oferuje czysty, minimalistyczny checkout i obsługuje BLIK/P24 — ale **nie przez Shopify Payments**, które nie jest dostępne dla firm zarejestrowanych w Polsce. Polscy sprzedawcy muszą korzystać z zewnętrznych bramek (Przelewy24, Stripe, Tpay), od których Shopify dodatkowo pobiera własną prowizję:

| Plan | Dodatkowa prowizja Shopify od zewnętrznej bramki |
|:---|:---|
| Basic | 2 % |
| Grow | 1 % |
| Advanced | 0,6 % |

To realny ukryty koszt doliczany **ponad** prowizję samej bramki płatniczej.

### Paczkomaty — twarde ograniczenie

Kluczową barierą jest **interaktywna mapa Paczkomatów InPost w checkoucie**. Należy rozróżnić dwie funkcje:

- **Carrier-Calculated Shipping (CCS)** — obliczanie stawek wysyłki od zewnętrznych przewoźników. Nawet z CCS (dostępnym od planu Grow) aplikacje InPost pokazują jedynie **listę punktów odbioru**, nie interaktywną mapę.
- **Interaktywna mapa InPost** w checkoucie — wymaga planu **Shopify Plus** (od 2 300 USD/mc). To twarde ograniczenie, nie opcjonalne.

| Plan Shopify | Cena | CCS (stawki przewoźników) | Interaktywna mapa InPost |
|:---|:---|:---|:---|
| Starter | ~20 zł/mc | Brak | Brak |
| Basic | ~156 zł/mc | Brak możliwości dokupienia | Brak |
| Grow | ok. 420 zł/mc (+ ok. 80 zł/mc za CCS) | Płatny dodatek (ok. 500 zł/mc łącznie); w subskrypcji rocznej CCS w cenie planu | Brak — tylko lista punktów |
| Advanced | 399 USD (~1 596 zł/mc) | Wbudowane natywnie | Brak |
| **Plus** | **od 2 300 USD (~9 200 zł/mc)** | **Wbudowane** | **Tak** |

Realny koszt Shopify z Paczkomatami ogranicza się więc do listy punktów (od ~500 zł/mc na planie Grow), a **interaktywna mapa wymaga planu Plus za ~9 200 zł/mc**. Przy takim rozstrzale cenowym Shopify nie konkuruje z polskimi rozwiązaniami koszykowymi — odpada z dalszego porównania.

Pozostałe parametry Shopify dla kontekstu: estetyka koszyka czysta i minimalistyczna, etykiety kurierskie wymagają wyższych planów.

---

## 5. Porównanie pozostałych systemów koszykowych

> Checkout podpinany pod zewnętrzny front-end

Zestawienie trzech realnych opcji, z uwzględnieniem wymogów polskiej logistyki (Paczkomaty, BLIK).

| Parametr | A: EasyCart (Starter) | B: 1koszyk (Darmowe) | C: Stripe Payment Links |
|:---|:---|:---|:---|
| **Abonament** | 99 zł/mc | 0 zł | 0 zł |
| **Prowizja platformy** | 3 % (Starter) | 6,9 % | Brak (tylko bramka) |
| **Prowizja bramki płatniczej** | ok. 1,5 % + 1 zł (Stripe) | Wliczona w 6,9 % | 1,5 % + 1 zł |
| **Łączny koszt prowizji** | **ok. 4,5 % + 1 zł** | **6,9 %** | **1,5 % + 1 zł** |
| **BLIK / P24** | Tak (bramka zewnętrzna) | Tak | Tak |
| **Mapa Paczkomatów** | Tak (wbudowana) | Tak (wbudowana) | Brak (własny kod) |
| **Etykiety kurierskie** | Tak (zewnętrzne integracje) | Tak (wbudowane) | Brak |
| **Estetyka koszyka** | Nowoczesny UX | Przestarzały | Czysty, minimalistyczny |
| **Opłaty ukryte** | Brak | 19 zł (weryfikacja) + 1 zł/wypłatę | Brak |

---

## 6. Rekomendacja systemu koszykowego → EasyCart

EasyCart to jedyna opcja łącząca **nowoczesny UX, pełną polską logistykę i rozsądny koszt** w jednym pakiecie:

| Argument | Szczegóły |
|:---|:---|
| **Paczkomaty** | Mapa wbudowana out-of-the-box — bez kombinowania z planami za setki dolarów |
| **BLIK + P24** | Dostępne od razu (bramka zewnętrzna) — pokrywa ~80 % preferencji płatniczych PL |
| **UX koszyka** | Nowoczesny, czysty interfejs — bezpośredni wpływ na konwersję |
| **Łączna prowizja** | ok. 4,5 % + 1 zł (3 % EasyCart + ok. 1,5 % + 1 zł Stripe) — wyraźnie niżej niż 6,9 % (1koszyk); przy rosnącym wolumenie różnica istotna |
| **Abonament** | 99 zł/mc — przewidywalny koszt vs. Shopify, gdzie InPost zaczyna się od kilkuset zł/mc |

Reszta opcji wymusza kompromis: 1koszyk jest tańszy kosztem jakości, Shopify droższy bez proporcjonalnej wartości, Stripe wymaga budowania logistyki od zera.

---

---

# Rekomendowany stack i metodyka realizacji

> **Next.js + Cloudflare + Sanity + EasyCart**

---

## Etap 1 — Fundamenty i baza treści (dni 1–2)

| Krok | Opis |
|:---|:---|
| **Inicjalizacja projektu** | Czysty projekt Next.js — pełna kontrola nad architekturą od pierwszego dnia. |
| **Konfiguracja Sanity (Headless CMS)** | Darmowe konto. Prosty, idiotoodporny schemat dla klienta: tytuł, opis oliwy, cena, zdjęcie. Klient nie ma fizycznej możliwości „rozjechania" designu. |
| **Spięcie frontu z CMS** | Zapytanie GROQ w Next.js zaciąga dane z Sanity. Zmiana ceny z 90 zł na 100 zł w panelu → strona aktualizuje się automatycznie. |

---

## Etap 2 — Warstwa wizualna i animacje (tygodnie 1–3)

Tutaj dzieje się to, za co klient realnie płaci — kodowanie warstwy premium.

| Krok | Opis |
|:---|:---|
| **Budowa interfejsu** | Sekcje w Tailwind CSS lub czystym CSS. Brak ograniczeń kreatorów — realizacja dokładnie według projektu graficznego. |
| **Animacje (winorośl)** | GSAP (ScrollTrigger) lub Framer Motion. Precyzyjna animacja rysowania ścieżki SVG — winorośl rośnie w tempie scrollowania, kontrola klatka po klatce. W Webflow debugowanie tego samego efektu kosztowałoby znacznie więcej czasu. |

---

## Etap 3 — Sprzedaż i logistyka (tydzień 4)

Strona wygląda — czas podpiąć kasę i zrzucić logistykę na zewnętrznego dostawcę.

| Krok | Opis |
|:---|:---|
| **Konfiguracja EasyCart** | Klient zakłada konto, podaje dane firmy (KRS/NIP), aktywuje płatności (Stripe/Tpay). |
| **Definicja produktu i logistyki** | W panelu EasyCart: produkt „Oliwa Włoska Premium", cena, stan magazynowy (np. 100 szt.), integracja InPost (Paczkomaty + kurier). |
| **Integracja z Next.js** | EasyCart generuje krótki skrypt JS + ID produktu. Skrypt do `layout.tsx`, atrybut wywołujący koszyk do przycisku „Kup teraz". |

---

## Etap 4 — Wdrożenie i testy bojowe (koniec tygodnia 4)

| Krok | Opis |
|:---|:---|
| **Deploy na Cloudflare Pages** | Repozytorium GitHub → darmowe Cloudflare Pages. Globalny CDN, ułamek sekundy ładowania, automatyczny SSL. |
| **Test end-to-end** | Wejście na stronę → „Kup" → widget EasyCart → wybór Paczkomatu z mapy → BLIK → kod testowy → weryfikacja zamówienia w panelu. |

---

## Etap 5 — Przekazanie klientowi (handoff)

Klient dostaje dwa narzędzia:

| Narzędzie | Rola | Częstotliwość użycia |
|:---|:---|:---|
| **Panel Sanity** | Edycja treści — poprawka literówki, zmiana ceny, nowe zdjęcie oliwy. | Sporadycznie |
| **Panel EasyCart** | Centrum operacyjne — lista zamówień, nadawanie przesyłek, drukowanie etykiet InPost, monitoring stanu magazynowego. | Codziennie |
