import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IT Legal – Kancelaria Prawna dla Sektora IT/Tech",
  description:
    "Kancelaria IT Legal specjalizuje się w obsłudze prawnej sektora IT/Tech. Umowy IT, ochrona IP, RODO, cloud computing, blockchain, AI. Ponad 10 lat doświadczenia, >1 mld zł obsłużonych kontraktów.",
  keywords: [
    "kancelaria prawna IT",
    "prawo IT",
    "umowy IT",
    "RODO",
    "ochrona danych osobowych",
    "własność intelektualna",
    "cloud computing prawo",
    "blockchain prawo",
    "AI prawo",
    "IP BOX",
    "radca prawny IT",
    "kancelaria technologiczna",
    "prawo nowych technologii",
    "Paweł Sokołowski",
  ],
  authors: [{ name: "IT Legal Paweł Sokołowski" }],
  creator: "IT Legal",
  publisher: "IT Legal Paweł Sokołowski",
  metadataBase: new URL("https://it-legal.pl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IT Legal – Kancelaria Prawna dla Sektora IT/Tech",
    description:
      "Kompleksowe wsparcie prawne dla firm IT/Tech. Umowy, IP, RODO, cloud, blockchain, AI. Ponad 10 lat doświadczenia.",
    url: "https://it-legal.pl",
    siteName: "IT Legal",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IT Legal – Kancelaria Prawna dla Sektora IT/Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Legal – Kancelaria Prawna dla Sektora IT/Tech",
    description:
      "Kompleksowe wsparcie prawne dla firm IT/Tech. Umowy, IP, RODO, cloud, blockchain, AI.",
    images: ["/og-image.png"],
  },
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://it-legal.pl/#organization",
      name: "IT Legal",
      legalName: "IT Legal Paweł Sokołowski",
      url: "https://it-legal.pl",
      email: "biuro@it-legal.pl",
      telephone: "+48537981165",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Warszawa",
        addressCountry: "PL",
      },
      sameAs: [],
    },
    {
      "@type": "LegalService",
      "@id": "https://it-legal.pl/#legalservice",
      name: "IT Legal – Kancelaria Prawna dla IT/Tech",
      description:
        "Kancelaria prawna specjalizująca się w obsłudze sektora IT/Tech. Umowy IT, ochrona własności intelektualnej, RODO, cloud computing, blockchain, AI.",
      provider: { "@id": "https://it-legal.pl/#organization" },
      areaServed: {
        "@type": "Country",
        name: "Polska",
      },
      serviceType: [
        "Umowy IT",
        "Własność intelektualna",
        "Cloud Computing",
        "RODO",
        "Blockchain",
        "AI & Big Data",
        "IP BOX",
      ],
      url: "https://it-legal.pl",
    },
    {
      "@type": "Person",
      "@id": "https://it-legal.pl/#person",
      name: "Paweł Sokołowski",
      jobTitle: "Radca Prawny",
      worksFor: { "@id": "https://it-legal.pl/#organization" },
      description:
        "Radca prawny z ponad 10-letnim doświadczeniem w branży IT/Tech. Obsłużył kontrakty o łącznej wartości ponad 1 mld zł.",
      knowsAbout: [
        "Prawo IT",
        "Umowy wdrożeniowe",
        "Własność intelektualna",
        "RODO",
        "Cloud computing",
        "Blockchain",
        "Sztuczna inteligencja",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://it-legal.pl/#website",
      url: "https://it-legal.pl",
      name: "IT Legal",
      publisher: { "@id": "https://it-legal.pl/#organization" },
      inLanguage: "pl-PL",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#E8ECF0" />
        {/* Skip reveal animations when landing on a hash anchor from a subpage */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(location.hash){document.documentElement.classList.add('hash-nav')}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${dmSerif.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Przejdź do treści
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
