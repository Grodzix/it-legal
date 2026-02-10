export const siteConfig = {
  name: "IT Legal",
  tagline: "Kancelaria prawna dla IT",
  url: "https://it-legal.pl",
  email: "biuro@it-legal.pl",
  phone: "+48 537 981 165",
  phoneDisplay: "537 981 165",
  address: "Warszawa",
  owner: "IT Legal Paweł Sokołowski",
} as const;

export const navLinks = [
  { label: "O nas", href: "#o-nas" },
  { label: "Specjalizacje", href: "#specjalizacje" },
  { label: "Cennik", href: "#cennik" },
  { label: "Baza wiedzy", href: "#baza-wiedzy" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const heroData = {
  heading: "Wsparcie prawne sektora IT/Tech",
  subheading:
    "Nasza kancelaria specjalizuje się w obsłudze rynku IT/Tech. Świadczymy kompleksowe wsparcie prawne, na najwyższym poziomie.",
  ctaPrimary: "Skontaktuj się",
  ctaSecondary: "Poznaj specjalizacje",
} as const;

export const trustStats = [
  { value: 10, suffix: "+", label: "Lat doświadczenia", prefix: "" },
  { value: 1, suffix: " mld zł", label: "Wartość kontraktów", prefix: ">" },
  { value: 30, suffix: "+", label: "Firm z Top 100", prefix: "" },
] as const;

export const aboutData = {
  sectionLabel: "O nas",
  heading: "Naszą misją jest dbanie o bezpieczeństwo prawne klientów",
  paragraphs: [
    "Pomagamy przedsiębiorcom IT/Tech: firmom, start-upom, programistom. Dostarczamy kompleksowe rozwiązania prawne w zakresie wszelkich aspektów prawa cyfrowego, prawa autorskiego, ochrony danych osobowych, kontraktów technologicznych, zgodności z regulacjami branżowymi, compliance.",
    "Pomagamy w negocjowaniu i tworzeniu umów, regulaminów, ochronie własności intelektualnej, rozwiązywaniu sporów. Naszym celem jest zapewnienie bezpiecznego i zgodnego z prawem środowiska dla funkcjonowania nowoczesnego biznesu.",
  ],
} as const;

export interface Specialization {
  title: string;
  highlight: string;
  description: string;
  icon: string;
  slug: string;
}

export const specializations: Specialization[] = [
  {
    title: "Umowy",
    highlight: "IT",
    description:
      "Opracowywanie oraz negocjowanie wszelkich umów związanych z tworzeniem, rozwojem, obrotem, utrzymaniem oprogramowania, w tym umów wdrożeniowych, maintenance, rozwojowych.",
    icon: "contract",
    slug: "umowy-it",
  },
  {
    title: "Własność Intelektualna (IP)",
    highlight: "oraz know-how",
    description:
      "Audyty w zakresie stanu ochrony własności intelektualnej organizacji; przygotowywanie umów odnoszących się do obrotu prawami autorskimi oraz umów licencyjnych.",
    icon: "shield",
    slug: "wlasnosc-intelektualna",
  },
  {
    title: "Cloud",
    highlight: "Computing",
    description:
      "Obsługa prawna procesów eksploatacji chmury obliczeniowej, w tym przygotowywanie kontraktów na korzystanie z zasobów chmurowych w modelach SaaS, IaaS, PaaS.",
    icon: "cloud",
    slug: "cloud-computing",
  },
  {
    title: "Dane",
    highlight: "Osobowe",
    description:
      "Audyty zgodności z RODO; opracowywanie dokumentacji, procedur i procesów zapewniających zgodność z RODO; przygotowywanie umów związanych z przetwarzaniem danych osobowych.",
    icon: "lock",
    slug: "dane-osobowe",
  },
  {
    title: "",
    highlight: "Blockchain",
    description:
      "Pomoc w adaptacji modeli biznesowych opartych na technologii blockchain do obowiązujących wymogów prawnych; wsparcie w zakresie obowiązków prawno-podatkowych.",
    icon: "cube",
    slug: "blockchain",
  },
  {
    title: "AI",
    highlight: "& Big Data",
    description:
      "Doradztwo w zakresie zapewnienia zgodności systemów opartych o sztuczną inteligencję oraz Big Data z wymaganiami prawnymi, w tym regulacjami ochrony danych.",
    icon: "brain",
    slug: "ai-big-data",
  },
  {
    title: "IP BOX",
    highlight: "/ 50% KUP",
    description:
      "Wsparcie w procesie prawidłowej implementacji rozwiązań prawno-podatkowych adresowanych do sektora IT, pozwalających na optymalizację kosztów.",
    icon: "tax",
    slug: "ip-box",
  },
  {
    title: "",
    highlight: "Inne",
    description:
      "Zagadnienia prawne mogące wyniknąć w toku działalności operacyjnej firm technologicznych.",
    icon: "dots",
    slug: "inne",
  },
];

export const teamData = {
  sectionLabel: "Zespół",
  name: "Paweł Sokołowski",
  role: "Radca Prawny",
  bio: "Radca prawny z ponad 10-letnim doświadczeniem w branży IT/Tech.",
  credentials: [
    "Doradzał przy wdrożeniach złożonych, wielomilionowych systemów informatycznych w największych polskich przedsiębiorstwach: bankach, towarzystwach ubezpieczeniowych, telekomach, jednostkach administracji publicznej.",
    "Pracował z ponad 30 firmami z pierwszej 100 największych polskich spółek.",
    "Łączna wartość obsłużonych kontraktów: >1 mld zł.",
    "Doświadczenie w kompleksowej obsłudze prawnej giganta technologicznego z USA.",
    "Współautor opracowania \u201EPolishCloud2.0\u201D dla polskiego sektora bankowego, w ramach Związku Banków Polskich.",
    "Członek Grupy Roboczej AI w Ministerstwie Cyfryzacji oraz komitetów tematycznych w Polskiej Izbie Informatyki i Telekomunikacji.",
  ],
  badges: [
    "10+ lat w IT/Tech",
    ">1 mld zł kontraktów",
    "PolishCloud 2.0",
    "Grupa Robocza AI",
  ],
} as const;

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** URL logo firmy — wymaga zgody na wykorzystanie znaku towarowego */
  logo?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "To była dla mnie zawsze ogromna przyjemność pracować z Pawłem. To, co wyróżnia Pawła, to biznesowe podejście do prawniczych tematów i orientacja na cel. Paweł zawsze stara się zrozumieć istotę problemu i znaleźć najprostsze i najbardziej adekwatne rozwiązanie. Paweł jest jednym z najbardziej błyskotliwych prawników z jakimi miałem okazję pracować.",
    author: "Mateusz Gintrowski",
    role: "Co-founder, Chief Growth Officer",
    company: "Quantee Sp. z o.o.",
  },
  {
    quote:
      "Stanowi istotne praktyczne wsparcie dla biznesu w zakresie zagadnień prawnych. Szybkość działania, rzetelność, wnikliwość. Błyskotliwa inteligencja i nieszablonowe pomysły generowane szybko, często pod presją sytuacyjną, sprawiają, że można mu powierzyć najtrudniejsze tematy i klientów. Godny zaufania – swoim działaniem dobrze wpasowuje się w definicję pojęcia trusted advisor.",
    author: "Alicja Wiecka",
    role: "Wieloletnia CEO",
    company: "SAS Institute Polska",
  },
  {
    quote:
      "Pawła cechuje myślenie out of the box, duża kreatywność w proponowaniu rozwiązań złożonych problemów prawnych. Współpraca z nim przebiega sprawnie i profesjonalnie. Jest bardzo dobrym negocjatorem. Potrafi umiejętnie osadzać zagadnienia biznesowe w obowiązujące ramy prawne. Zaletą Pawła jest posługiwanie się prostym, klarownym, przejrzystym językiem.",
    author: "Adam Bartos",
    role: "Prezes Zarządu",
    company: "SCS Expert sp. z o.o.",
  },
  {
    quote:
      "Paweł to świetny doradca. Zaangażowany. Zawsze dawał mi poczucie komfortu pracy z profesjonalistą, dla którego interes klienta jest w centrum uwagi. Profesjonalista, kompetentny, duża wiedza, wnikliwość, analityczny umysł, dobry negocjator, praktyk, szybkość działania, rzetelność, nieszablonowość.",
    author: "Marek Frysz",
    role: "Dyrektor Departamentu Rozwoju Biznesu",
    company: "Gabos Software sp. z o.o.",
  },
  {
    quote:
      "Praca z Pawłem to była czysta przyjemność zawodowa z uwagi na idealne połączenie jego kompetencji prawnych z kreatywnością i nieszablonowym myśleniem. Duża wiedza, doświadczenie, dobre rozumienie biznesu, sprawność intelektualna. Polecam Pawła jako radcę prawnego!",
    author: "Robert Korn",
    role: "Business Development Director",
    company: "PwC",
  },
];

export interface PricingTier {
  name: string;
  description: string;
  price?: string;
  priceSuffix?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export const pricingData = {
  sectionLabel: "Cennik",
  heading: "Transparentne zasady współpracy",
  subheading:
    "Oferujemy elastyczne modele rozliczeń dostosowane do potrzeb Twojego biznesu.",
  tiers: [
    {
      name: "Rozmowa o współpracy",
      description: "Poznajmy się i omówmy Twoje potrzeby prawne",
      price: "Bezpłatna",
      features: [
        "Wstępna analiza potrzeb",
        "Omówienie zakresu współpracy",
        "Propozycja modelu rozliczeń",
        "Bez zobowiązań",
      ],
      cta: "Umów rozmowę",
    },
    {
      name: "Standard express",
      description:
        "Szybka i rzetelna porada prawna w krótkim czasie. Konkretna odpowiedź radcy prawnego na Twoje pytania przez telefon.",
      price: "120 zł",
      priceSuffix: "/ 30 min konsultacji",
      features: [
        "Szybki kontakt z prawnikiem",
        "Natychmiastowa odpowiedź na pytania",
        "Rozwiązanie drobnych problemów prawnych",
      ],
      cta: "Umów konsultację",
    },
    {
      name: "Standard",
      description:
        "Profesjonalne wsparcie przy jednorazowym zagadnieniu prawnym, np. kompleksowa analiza umowy wraz z komentarzem, wskazaniem ryzyk oraz propozycją alternatywnego wordingu.",
      price: "199 zł",
      priceSuffix: "/ 1h konsultacji",
      features: [
        "Szczegółowe omówienie Twojej sprawy",
        "Odpowiedzi na wszystkie pytania",
        "Indywidualna konsultacja z prawnikiem",
        "Rekomendacje dalszych działań",
      ],
      cta: "Umów konsultację",
      highlighted: true,
    },
    {
      name: "Projekt lub abonament",
      description:
        "Obsługa konkretnego projektu, transakcji lub stała obsługa prawna Twojej firmy",
      price: "Indywidualnie",
      priceSuffix: "porozmawiajmy o szczegółach",
      features: [
        "Dedykowany prawnik",
        "Przygotowanie / negocjacja umów",
        "Wsparcie do zakończenia projektu",
        "Ryczałt lub stawka godzinowa",
        "Audyty i przeglądy prawne",
      ],
      cta: "Zapytaj o wycenę",
    },
  ] as PricingTier[],
  footnote: "Wszystkie ceny netto",
} as const;

export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
}

export const knowledgeBaseData = {
  sectionLabel: "Baza wiedzy",
  heading: "Artykuły i poradniki",
  subheading: "Praktyczna wiedza prawna dla sektora IT/Tech.",
  posts: [
    {
      title: "Ochrona Danych Osobowych w Firmie IT: Kluczowe Aspekty Prawne",
      excerpt:
        "Firmy IT odgrywają kluczową rolę w dzisiejszym cyfrowym świecie, przetwarzając ogromne ilości danych osobowych. Wraz z rosnącą ilością danych, rośnie również znaczenie ich ochrony.",
      category: "Dane osobowe",
      date: "25 czerwca 2024",
      slug: "ochrona-danych-osobowych-w-firmie-it-kluczowe-aspekty-prawne",
    },
    {
      title:
        "Umowy IT: Przewodnik po Rodzajach Umów, Kluczowych Klauzulach i Ochronie Praw Autorskich",
      excerpt:
        "W dzisiejszych czasach dynamicznie rozwijającej się technologii, umowy IT odgrywają kluczową rolę w relacjach biznesowych. Warto zrozumieć, jakie są rodzaje tych umów.",
      category: "Kontrakty IT",
      date: "30 maja 2024",
      slug: "umowy-it-przewodnik-po-rodzajach-umow-kluczowych-klauzulach",
    },
    {
      title: "Ochrona Kodów: Prawo Autorskie a Oprogramowanie Komputerowe",
      excerpt:
        "W dzisiejszym cyfrowym świecie, oprogramowanie komputerowe odgrywa kluczową rolę w wielu aspektach życia codziennego i działalności gospodarczej. Z tego powodu ochrona praw autorskich do oprogramowania staje się coraz ważniejsza.",
      category: "Kontrakty IT",
      date: "20 maja 2024",
      slug: "ochrona-kodow-prawo-autorskie-a-oprogramowanie-komputerowe",
    },
    {
      title:
        "Podatkowe Puzzle w IT: Jak Zarządzać Obowiązkami Podatkowymi w Branży Technologicznej",
      excerpt:
        "Branża IT, charakteryzująca się dynamicznym rozwojem i innowacyjnością, stoi przed wieloma wyzwaniami podatkowymi. Zrozumienie i prawidłowe stosowanie przepisów podatkowych jest kluczowe dla firm działających w sektorze technologicznym.",
      category: "IP box / 50% KUP",
      date: "10 maja 2024",
      slug: "podatkowe-puzzle-w-it-jak-zarzadzac-obowiazkami-podatkowymi",
    },
    {
      title:
        "Chmura obliczeniowa pod lupą prawną: Jak zabezpieczyć dane i prywatność w erze cyfrowej",
      excerpt:
        "Chmura obliczeniowa stała się nieodłącznym elementem współczesnych systemów IT, oferując przedsiębiorstwom elastyczność, skalowalność i oszczędności kosztów. Jednakże, wraz z jej popularnością, pojawiają się liczne wyzwania prawne.",
      category: "Cloud computing",
      date: "1 maja 2024",
      slug: "chmura-obliczeniowa-pod-lupa-prawna",
    },
    {
      title: "Blockchain i prawo: Jak prawo nadąża za technologią?",
      excerpt:
        "Blockchain, znany głównie jako technologia stojąca za kryptowalutami, takimi jak Bitcoin, znajduje coraz szersze zastosowanie w różnych dziedzinach, od finansów po logistykę i administrację publiczną.",
      category: "Blockchain",
      date: "20 kwietnia 2024",
      slug: "blockchain-i-prawo-jak-prawo-nadaza-za-technologia",
    },
    {
      title: "Start w IT: Jak Założyć Firmę Technologiczną w Polsce",
      excerpt:
        "Zakładanie firmy IT w Polsce to proces, który wymaga zrozumienia i przestrzegania wielu aspektów prawnych. Przepisy regulujące zakładanie i prowadzenie działalności gospodarczej mają na celu zapewnienie, że firma będzie działać zgodnie z prawem.",
      category: "Prawo pracy",
      date: "10 kwietnia 2024",
      slug: "start-w-it-jak-zalozyc-firme-technologiczna-w-polsce",
    },
  ] as BlogPost[],
};

export const contactData = {
  sectionLabel: "Kontakt",
  heading: "Skontaktuj się z nami",
  subheading: "Umów bezpłatną konsultację. Odpowiemy w ciągu 24 godzin.",
  rodoText:
    "Wyrażam zgodę na przetwarzanie danych osobowych przez Administratora IT Legal Paweł Sokołowski z siedzibą w Warszawie.",
} as const;
