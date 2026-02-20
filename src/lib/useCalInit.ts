"use client";

import { useEffect, type RefObject } from "react";
import { siteConfig } from "./data";

let initialized = false;

function initCal() {
  if (initialized) return;
  initialized = true;

  const w = window as any;
  if (w.Cal) return;

  (function (C: any, A: string, L: string) {
    const p = function (a: any, ar: any) {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function (...args: any[]) {
        const cal = C.Cal;
        const ar = args;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function (...a: any[]) {
            p(api, a);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(window, `${siteConfig.calOrigin}/embed/embed.js`, "init");

  const calUi = {
    theme: "light" as const,
    cssVarsPerTheme: { light: { "cal-brand": "#4985C9" } },
    hideEventTypeDetails: false,
    layout: "month_view" as const,
  };

  w.Cal("init", siteConfig.calNamespace, { origin: siteConfig.calOrigin });
  w.Cal.ns[siteConfig.calNamespace]("ui", calUi);

  w.Cal("init", "konsultacja-express", { origin: siteConfig.calOrigin });
  w.Cal.ns["konsultacja-express"]("ui", calUi);

  w.Cal("init", "standard", { origin: siteConfig.calOrigin });
  w.Cal.ns["standard"]("ui", calUi);
}

export function useCalInit(
  ref: RefObject<HTMLElement | null>,
  rootMargin = "200px"
) {
  useEffect(() => {
    if (initialized) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          initCal();
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
}
