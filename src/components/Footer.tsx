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
          href: "https://it-legal.pl/polityka-prywatnosci.pdf",
          external: true,
        },
        {
          label: "Baza wiedzy",
          href: "#baza-wiedzy",
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
        {/* Heading */}
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl mb-16 sm:mb-20">
          Wsparcie prawne IT.
          <br />
          Z&nbsp;doświadczeniem.
          <br />
          Na najwyższym poziomie.
        </h2>

        {/* Divider */}
        <div className="h-px bg-text-dark/10 mb-10 sm:mb-14" />

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

        {/* Copyright */}
        <p className="text-xs text-text-medium">
          {siteConfig.owner} &copy; {year}
        </p>
      </div>
    </footer>
  );
}
