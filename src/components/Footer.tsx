import Logo from "./Logo";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark text-white/80 py-12 sm:py-16" role="contentinfo">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Logo + info */}
          <div className="flex flex-col gap-4">
            <div className="text-white">
              <Logo className="text-white [&_*]:text-white" />
            </div>
            <div className="flex flex-col gap-1 text-sm text-white/60">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:items-end gap-4">
            <div className="flex gap-6 text-sm">
              <a
                href="https://it-legal.pl/polityka-prywatnosci.pdf"
                className="text-white/60 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Polityka prywatności
              </a>
            </div>
            <p className="text-xs text-white/40">
              &copy; {year} {siteConfig.owner}. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
