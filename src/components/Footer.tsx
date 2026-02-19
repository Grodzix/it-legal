import Logo from "./Logo";
import { siteConfig, navLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerColumns = [
    {
      title: "Nawigacja",
      links: navLinks.map((l) => ({
        label: l.label,
        href: l.href,
      })),
    },
    {
      title: "Kontakt",
      links: [
        {
          label: siteConfig.email,
          href: `mailto:${siteConfig.email}`,
        },
        {
          label: siteConfig.phone,
          href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
        },
        {
          label: siteConfig.address,
          href: undefined,
        },
      ],
    },
    {
      title: "Zasoby",
      links: [
        {
          label: "Polityka prywatności",
          href: "/polityka-prywatnosci.pdf",
        },
        {
          label: "Baza wiedzy",
          href: "/#baza-wiedzy",
        },
      ],
    },
  ] as const;

  return (
    <footer
      className="bg-bg-medium/50 text-text-dark pt-20 sm:pt-28 pb-8 sm:pb-10 border-t border-text-dark/5"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading + Google Reviews */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16 mb-10 sm:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl">
            Wsparcie prawne IT.
            <br />
            Z&nbsp;doświadczeniem.
            <br />
            Na najwyższym poziomie.
          </h2>

          <a
            href="https://www.google.com/maps/place/IT+LEGAL+-+kompleksowa+obs%C5%82uga+prawna+IT%2FTech/@52.312786,21.0772321,18.25z/data=!4m6!3m5!1s0x60bfd80665dcaeb3:0x464c8ba42bfe793!8m2!3d52.312872!4d21.0774127!16s%2Fg%2F11tdch_wgg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-3 group"
            aria-label="Opinie Google – ocena 5.0 na 5"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="flex-shrink-0">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#FBBC05" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-base font-bold text-text-dark">5.0</span>
            </div>
            <span className="text-xs text-text-medium group-hover:text-primary transition-colors">
              Opinie Google &rarr;
            </span>
          </a>
        </div>

        {/* Google Map — full-width */}
        <div className="overflow-hidden rounded-2xl border border-text-dark/10 shadow-sm mb-10 sm:mb-14">
          <iframe
            src="https://maps.google.com/maps?q=IT+LEGAL+-+kompleksowa+obs%C5%82uga+prawna+IT%2FTech,+Warszawa&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="280"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokalizacja kancelarii IT Legal na mapie Google"
            aria-label="Mapa Google pokazująca lokalizację kancelarii"
          />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-16 mb-20 sm:mb-28">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-text-dark mb-4">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={link.href}
                        className="text-sm text-text-medium hover:text-text-dark transition-colors"
                        {...("external" in link && link.external
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span className="text-sm text-text-medium">
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Logo */}
        <div className="mb-6">
          <Logo className="text-text-dark [&_svg]:h-16 [&_svg]:w-auto" />
        </div>

        {/* Bottom divider */}
        <div className="h-px bg-text-dark/10 mb-4" />

        {/* Company info & Copyright */}
        <p className="text-xs text-text-medium">
          {siteConfig.owner} &bull; NIP: {siteConfig.nip} &bull; REGON: {siteConfig.regon}
        </p>
        <p className="text-xs text-text-medium mt-1">
          &copy; {year} {siteConfig.name}. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
