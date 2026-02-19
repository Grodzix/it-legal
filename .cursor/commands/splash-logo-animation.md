Zaimplementuj pixel-perfect animację splash screen z logo, które pojawia się na środku ekranu i płynnie przelatuje na swoje docelowe miejsce w headerze/navbarze.

## Wymagania

1. Znajdź komponent logo używany w headerze/navbarze
2. Znajdź lub utwórz komponent SplashScreen
3. Zaimplementuj animację zgodnie z poniższymi zasadami

## Architektura animacji

### Fazy

Overlay (biały tło) jest sterowany **wyłącznie przez CSS animation** — nie przez React state. React zarządza tylko logo SVG i usunięciem z DOM.

1. **mount** — overlay widoczny (CSS class `.splash-overlay`), logo niewidoczne (opacity: 0 inline)
2. **logo visible** — JS ustawia logo opacity: 1, logo na środku ekranu w powiększeniu
3. **logo animating** — logo przelatuje na pozycję headera (JS setTimeout + CSS transition). Równolegle overlay faduje przez CSS animation (niezależnie od JS).
4. **removed** — `setRemoved(true)` → splash unmountuje się, header logo przejmuje (single-frame swap)

### Timeline

- `0ms` — mount, blokada scroll, ukrycie header logo (`opacity: 0`), pomiar pozycji. Overlay opaque via CSS (`.splash-overlay` class).
- `~16ms` (rAF) — logo pojawia się (opacity 1 via JS) na środku ekranu w powiększeniu
- `300ms` — logo leci do headera (420ms CSS transition)
- `600ms` — overlay zaczyna CSS fade (niezależnie od JS hydration!)
- `~720ms` — animacja transform logo zakończona
- `800ms` — **de-transform**: zamiana `transform: translate()` na `top/left` positioning (eliminuje różnicę rendering path)
- `~1000ms` — overlay w pełni transparentny → content pod spodem widoczny → LCP
- `1400ms` — header logo `opacity: 1`, splash unmount (`setRemoved(true)`), odblokowanie scroll

## Krytyczne zasady (każda rozwiązuje konkretny bug)

### 0. Overlay MUSI fadować przez CSS animation, NIE przez React state (LCP killer)

Biały overlay (`fixed inset-0 z-[100] bg-white`) z `opacity: 1` sterowaną przez React state **blokuje LCP** — Lighthouse widzi biały ekran dopóki JS nie zhydratuje i nie zmieni stanu. Content pod spodem (hero h1) nie liczy się jako LCP bo jest zakryty opaque overlayem.

Overlay musi używać CSS `animation` zdefiniowanej w globals.css, która startuje od razu po załadowaniu CSS (niezależnie od hydration). React steruje tylko usunięciem z DOM po zakończeniu animacji.

```css
/* globals.css */
.splash-overlay {
  animation: splashFade 400ms ease-out 600ms forwards;
}

@keyframes splashFade {
  from { opacity: 1; }
  to { opacity: 0; pointer-events: none; }
}
```

```tsx
// ❌ React state steruje opacity — zależne od hydration, blokuje LCP
<div className="fixed inset-0 z-[100] bg-white"
  style={{
    opacity: isAnimating ? 0 : 1,
    transition: isAnimating ? "opacity 350ms ease-out 700ms" : "none",
  }}
/>

// ✅ CSS animation — startuje od razu, niezależnie od JS
<div className="splash-overlay fixed inset-0 z-[100] bg-white" />
```

**Timeline overlay vs logo:**
- 0–600ms: overlay opaque (logo pojawia się i zaczyna lecieć)
- 600–1000ms: overlay faduje przez CSS (hero content staje się widoczny ~800ms → LCP)
- 1400ms: React usuwa splash z DOM

Dodaj do `@media (prefers-reduced-motion: reduce)`:
```css
.splash-overlay {
  animation: none !important;
  opacity: 0 !important;
}
```

### 1. SVG splash MUSI być identyczne z SVG headera

Kopiuj DOKŁADNIE te same atrybuty SVG i path className. Różnice w rozmiarze natywnym, strokeWidth lub klasach powodują widoczny glitch przy swapie (pogrubienie, shadow, inna grubość kresek).

```tsx
// ❌ Splash SVG renderowane w innym rozmiarze niż header
<svg style={{ height: 120 }}> // 120px natywnie, potem CSS scale do 47%

// ✅ Splash SVG w natywnym rozmiarze headera, CSS scale w GÓRĘ na centrum
<svg className="h-14 w-auto"> // identyczne z headerem, scale(2.14) na wyświetlenie
```

### 2. ZERO nakładania dwóch logo

Header logo musi mieć `opacity: 0` przez cały czas trwania splasha. Pokaż je dopiero w momencie unmount splasha (ten sam setTimeout callback). Nawet chwilowe nakładanie SVG z `strokeOpacity < 1` daje widoczne pogrubienie/ściemnienie.

```tsx
// ❌ Dwa logo widoczne jednocześnie (crossfade)
setTimeout(() => { headerLogo.style.opacity = "1"; }, 700);
setTimeout(() => { setPhase("done"); }, 1400);

// ✅ Single-frame swap — show header + unmount splash w jednym callbacku
setTimeout(() => {
  headerLogo.style.opacity = "1";
  setPhase("done");
}, 1400);
```

### 3. NIE używaj translate(-50%) z procentami na finalnej pozycji

`translate(-50%, -50%)` z procentami przechodzi przez inną ścieżkę zaokrąglania pikseli niż layout engine. Chrome oblicza procent od border-box z kumulatywnym błędem zaokrąglania → 1px shift.

Zamiast tego: `fixed top-0 left-0` + `translate(Xpx, Ypx)` z absolutnymi pikselami z `getBoundingClientRect()`.

```tsx
// ❌ Procenty — różne zaokrąglanie niż layout engine
<div className="fixed top-1/2 left-1/2"
  style={{ transform: `translate(calc(-50% + ${offset}px), ...)` }}>

// ✅ Absolutne piksele — zero zaokrąglania procentowego
<svg className="fixed top-0 left-0"
  style={{ transform: `translate(${rect.left}px, ${rect.top}px)` }}>
```

### 4. NIE używaj wrapper div — pozycjonuj SVG bezpośrednio

SVG jako inline element w div tworzy baseline gap (~4px). To przesuwa `-50%` translate, bo operuje na wymiarze wrappera (60px), nie SVG (56px). SVG z `position: fixed` jest elementem blokowym — zero baseline gap.

```tsx
// ❌ Wrapper div z baseline gap
<div className="fixed ...">
  <svg className="h-14 w-auto">...</svg>
</div>

// ✅ SVG bezpośrednio pozycjonowane
<svg className="fixed top-0 left-0 h-14 w-auto" ref={svgRef}>...</svg>
```

### 5. De-transform po animacji (kluczowe dla pixel-perfect swap)

Po zakończeniu animacji CSS transform, zamień `transform: translate(target)` na `top: targetY; left: targetX; transform: none`. To przełącza rendering z transform engine na layout engine — ten sam path co header logo. Eliminuje sub-pixel różnicę między dwoma rendering pipeline'ami.

```tsx
const t2 = setTimeout(() => {
  const svg = svgRef.current;
  if (svg) {
    svg.style.transition = "none";
    svg.style.top = `${targetY}px`;
    svg.style.left = `${targetX}px`;
    svg.style.transform = "none";
  }
}, 800); // po zakończeniu animacji (300ms start + 420ms duration + bufor)
```

### 6. NIE używaj `will-change: transform`

Wymusza pre-rasteryzację bitmapy na stałej skali (Chromium bug). SVG jest rasteryzowane raz i GPU-skalowane zamiast re-rasteryzowane. Daje inne anti-aliasing niż header logo bez compositor layer.

### 7. Odwróć kierunek skalowania

Renderuj SVG w natywnym rozmiarze headera, skaluj w GÓRĘ na wyświetlenie centralne. Na końcu animacji `scale(1)` = natywny rozmiar = pixel-perfect match z header logo.

```tsx
// Pozycja centralna: duże logo na środku ekranu
const centerScale = SPLASH_CENTER_SIZE / headerSvgHeight;
`translate(${centerX}px, ${centerY}px) scale(${centerScale})`

// Pozycja docelowa: natywny rozmiar, dokładna pozycja headera
`translate(${rect.left}px, ${rect.top}px) scale(1)`
```

## Pomiar pozycji

```tsx
const headerSvg = headerLogo.querySelector("svg");
const rect = headerSvg.getBoundingClientRect();
const vw = document.documentElement.clientWidth;
const vh = document.documentElement.clientHeight;

const positions = {
  centerX: (vw - rect.width) / 2,   // SVG top-left X na środku viewportu
  centerY: (vh - rect.height) / 2,   // SVG top-left Y na środku viewportu
  targetX: rect.left,                 // dokładna pozycja header SVG
  targetY: rect.top,                  // z getBoundingClientRect
  centerScale: SPLASH_CENTER_SIZE / rect.height,
};
```

## Obsługa hash navigation

Jeśli URL ma hash (#sekcja), pomiń animację — ustaw phase na "done" natychmiast.

## Accessibility

Obsłuż `prefers-reduced-motion` — w globals.css:

```css
@media (prefers-reduced-motion: reduce) {
  .splash-overlay {
    animation: none !important;
    opacity: 0 !important;
  }
}
```

Dzięki temu overlay jest natychmiastowo transparentny → zero splash, zero opóźnienia contentu.

## Performance (Lighthouse)

Kluczowe pułapki, które obniżają score:

1. **Overlay sterowany React state blokuje LCP** — patrz zasada #0
2. **Nigdy nie ładuj ciężkich 3rd-party (Cal.com, embedy) eagerly** — użyj IntersectionObserver
3. **Preconnect** do zewnętrznych domen użytych w embedach (`<link rel="preconnect" href="...">`)
4. **Nie używaj `dynamic()` bez `{ ssr: false }` dla poniżej-foldu** — bez `ssr: false` chunk i tak jest ładowany w initial bundle
