export interface SpecArticle {
  slug: string;
  title: string;
  intro: string;
  listHeading: string;
  items: { title: string; text: string }[];
  outro: string;
}

export const specArticles: SpecArticle[] = [
  {
    slug: "umowy-it",
    title: "Umowy IT",
    intro: "W dynamicznym środowisku branży IT, odpowiednie przygotowanie i negocjowanie umów związanych z tworzeniem, rozwojem, obrotem i utrzymaniem oprogramowania jest kluczowe dla zapewnienia sukcesu projektów technologicznych. Nasza kancelaria specjalizuje się w kompleksowej obsłudze prawnej umów IT, oferując wsparcie na każdym etapie procesu kontraktowego.",
    listHeading: "Nasze usługi w zakresie umów IT obejmują:",
    items: [
      {
        title: "Opracowywanie i negocjowanie umów wdrożeniowych",
        text: "Wspieramy klientów w tworzeniu i negocjowaniu umów wdrożeniowych, które obejmują pełen zakres działań związanych z implementacją systemów informatycznych, od analizy wymagań po końcowe wdrożenie. Dbamy o to, aby umowy były precyzyjnie sformułowane, chroniły interesy naszych klientów i minimalizowały ryzyko prawne.",
      },
      {
        title: "Umowy maintenance (utrzymaniowe)",
        text: "Oferujemy wsparcie w przygotowaniu umów maintenance, które zapewniają odpowiednią opiekę nad systemami IT po ich wdrożeniu. Dbamy o to, aby umowy te obejmowały wszystkie niezbędne aspekty, takie jak aktualizacje, wsparcie techniczne, naprawa błędów oraz zarządzanie zmianami.",
      },
      {
        title: "Umowy rozwojowe",
        text: "Pomagamy w tworzeniu umów dotyczących dalszego rozwoju oprogramowania, w tym umów dotyczących dostosowania, rozbudowy funkcjonalności oraz integracji z innymi systemami. Zapewniamy, że umowy te są zgodne z obowiązującymi przepisami prawa oraz spełniają potrzeby biznesowe naszych klientów.",
      },
      {
        title: "Wsparcie prawne we wszystkich aspektach procesu wdrażania systemów informatycznych",
        text: "Nasza obsługa prawna obejmuje każdy etap procesu wdrażania systemów IT, od wstępnej analizy wymagań, przez fazę projektowania, po końcowe testy i wdrożenie. Dbamy o to, aby każdy krok był zgodny z prawem i aby wszelkie ryzyka prawne były minimalizowane.",
      },
      {
        title: "Obsługa prawna innych kategorii umów IT",
        text: "Wspieramy naszych klientów także w zakresie przygotowywania i negocjacji innych typów umów IT, takich jak umowy licencyjne, umowy na outsourcing usług IT, umowy na świadczenie usług chmurowych oraz umowy o poufności (NDA). Nasze rozwiązania są dostosowane do specyfiki działalności każdej firmy, zapewniając pełną ochronę prawną.",
      },
    ],
    outro:
      "Nasze podejście do kontraktów IT łączy dogłębną wiedzę prawniczą z rozumieniem specyfiki branży technologicznej, co pozwala nam oferować rozwiązania, które skutecznie zabezpieczają interesy naszych klientów.",
  },
  {
    slug: "wlasnosc-intelektualna",
    title: "Własność Intelektualna (IP) oraz know-how",
    intro: "Własność intelektualna stanowi jeden z najcenniejszych zasobów nowoczesnych przedsiębiorstw, zwłaszcza w branży IT i technologii. Chronienie innowacji, twórczości oraz wiedzy stanowi fundament bezpieczeństwa i przewagi konkurencyjnej. Nasza kancelaria oferuje kompleksowe wsparcie prawne w zakresie ochrony własności intelektualnej oraz zarządzania zasobami know-how, pomagając firmom w skutecznej ochronie ich kluczowych aktywów.",
    listHeading:
      "Nasze usługi w zakresie własności intelektualnej i know-how obejmują:",
    items: [
      {
        title: "Audyt ochrony własności intelektualnej",
        text: "Przeprowadzamy audyty w zakresie stanu ochrony własności intelektualnej w organizacji. Ocenimy, w jakim stopniu Twoje patenty, znaki towarowe, prawa autorskie i inne formy własności intelektualnej są chronione, a także doradzimy, jakie kroki należy podjąć, aby zoptymalizować ochronę tych zasobów.",
      },
      {
        title:
          "Przygotowywanie umów dotyczących obrotu prawami autorskimi i licencjami",
        text: "Oferujemy kompleksowe usługi w zakresie tworzenia i negocjowania umów związanych z obrotem prawami autorskimi oraz licencjami. Zapewniamy, że Twoje umowy będą zgodne z przepisami prawa, chroniąc jednocześnie Twoje interesy w transakcjach dotyczących praw własności intelektualnej.",
      },
      {
        title: "Doradztwo przy optymalizacji zarządzania zasobem know-how",
        text: "Know-how to unikalna wiedza, która często stanowi tajemnicę przedsiębiorstwa. Doradzamy, jak skutecznie zarządzać tym zasobem, aby zabezpieczyć go przed nieuprawnionym ujawnieniem i wykorzystaniem. Pomagamy w tworzeniu odpowiednich umów o poufności (NDA), regulaminów wewnętrznych, a także w zarządzaniu ryzykiem związanym z wyciekiem informacji.",
      },
      {
        title: "Rejestracja i ochrona znaków towarowych i patentów",
        text: "Wspieramy firmy w procesie rejestracji znaków towarowych, wzorów przemysłowych oraz patentów zarówno na poziomie krajowym, jak i międzynarodowym. Nasze usługi obejmują przygotowanie niezbędnej dokumentacji, prowadzenie postępowań rejestrowych oraz doradztwo w sprawach związanych z ochroną przed naruszeniami.",
      },
      {
        title:
          "Rozwiązywanie sporów dotyczących własności intelektualnej",
        text: "Reprezentujemy klientów w sporach prawnych dotyczących naruszeń własności intelektualnej, zarówno na etapie przedsądowym, jak i w postępowaniach sądowych. Wspieramy także w mediacjach i negocjacjach mających na celu polubowne rozwiązanie konfliktów.",
      },
    ],
    outro:
      "Nasze podejście do ochrony własności intelektualnej i zarządzania know-how łączy dogłębną wiedzę prawniczą z praktycznym doświadczeniem, co pozwala nam oferować rozwiązania, które skutecznie zabezpieczają interesy naszych klientów.",
  },
  {
    slug: "cloud-computing",
    title: "Cloud Computing",
    intro: "Współczesne firmy coraz częściej korzystają z rozwiązań chmurowych, aby zwiększyć efektywność, skalowalność i bezpieczeństwo swoich operacji. Jednakże, przenoszenie danych oraz procesów biznesowych do chmury wiąże się z szeregiem wyzwań prawnych, które wymagają szczegółowego podejścia. Nasza kancelaria specjalizuje się w obsłudze prawnej procesów eksploatacji chmury obliczeniowej, oferując wsparcie na każdym etapie korzystania z zasobów chmurowych.",
    listHeading: "Nasze usługi w zakresie cloud computing obejmują:",
    items: [
      {
        title:
          "Przygotowywanie kontraktów na korzystanie z zasobów chmurowych",
        text: "Oferujemy kompleksowe wsparcie w przygotowywaniu i negocjowaniu kontraktów związanych z korzystaniem z usług chmurowych w różnych modelach, takich jak Software as a Service (SaaS), Infrastructure as a Service (IaaS), oraz Platform as a Service (PaaS). Dbamy o to, aby Twoje umowy były jasne, precyzyjne i chroniły Twoje interesy, jednocześnie zapewniając zgodność z przepisami prawa.",
      },
      {
        title:
          "Doradztwo prawne w zakresie spełniania wymogów regulacyjnych",
        text: "Pomagamy firmom w spełnianiu wymogów regulacyjnych związanych z przetwarzaniem danych w chmurze. Nasze usługi obejmują doradztwo dotyczące zgodności z wytycznymi Komisji Nadzoru Finansowego (KNF) oraz innymi regulacjami krajowymi i międzynarodowymi, w tym w kontekście tzw. komunikatu \u201Echmurowego\u201D KNF, który nakłada konkretne obowiązki na instytucje finansowe korzystające z chmury.",
      },
      {
        title: "Bezpieczeństwo i prywatność danych w chmurze",
        text: "Zajmujemy się doradztwem prawnym w zakresie bezpieczeństwa danych w środowiskach chmurowych, pomagając w identyfikacji i zarządzaniu ryzykiem związanym z przetwarzaniem danych osobowych oraz innych wrażliwych informacji w chmurze. Wspieramy w tworzeniu i wdrażaniu polityk bezpieczeństwa, audytach zgodności oraz przygotowywaniu odpowiednich zapisów umownych.",
      },
      {
        title: "Zarządzanie ryzykiem i odpowiedzialnością",
        text: "Pomagamy firmom w identyfikacji potencjalnych ryzyk związanych z korzystaniem z chmury obliczeniowej i doradzamy, jak najlepiej zabezpieczyć się przed możliwymi problemami, takimi jak awarie usług chmurowych, utrata danych, czy problemy z dostępnością.",
      },
    ],
    outro:
      "Nasze usługi w zakresie cloud computing są skierowane do firm, które chcą w pełni wykorzystać potencjał chmury obliczeniowej, zapewniając jednocześnie pełną zgodność z regulacjami i bezpieczeństwo operacyjne.",
  },
  {
    slug: "dane-osobowe",
    title: "Dane Osobowe",
    intro: "W dobie cyfryzacji ochrona danych osobowych staje się kluczowym elementem prowadzenia działalności gospodarczej, szczególnie w sektorze IT. Nasza kancelaria oferuje kompleksowe wsparcie prawne w zakresie zgodności z RODO oraz innymi przepisami dotyczącymi ochrony prywatności, pomagając firmom w zarządzaniu ryzykiem związanym z przetwarzaniem danych osobowych.",
    listHeading: "Nasze usługi w zakresie ochrony danych osobowych obejmują:",
    items: [
      {
        title: "Audyt zgodności z RODO",
        text: "Przeprowadzamy szczegółowe audyty, aby ocenić stopień zgodności Twojej organizacji z wymogami RODO. Wskazujemy obszary wymagające poprawy i proponujemy konkretne działania naprawcze, które pomogą uniknąć sankcji oraz zbudować zaufanie klientów.",
      },
      {
        title: "Tworzenie dokumentacji i procedur RODO",
        text: "Opracowujemy pełną dokumentację zgodną z RODO, w tym polityki ochrony danych, klauzule informacyjne, procedury zgłaszania naruszeń oraz procedury związane z realizacją praw osób, których dane dotyczą. Nasze rozwiązania są dostosowane do specyfiki działalności Twojej firmy, zapewniając zgodność z przepisami oraz efektywność operacyjną.",
      },
      {
        title:
          "Negocjacje i przygotowywanie umów dotyczących danych osobowych",
        text: "Przygotowujemy i negocjujemy umowy dotyczące przetwarzania danych osobowych, takie jak umowy o powierzenie przetwarzania danych, oraz umowy o udostępnianie danych. Dbamy o to, aby każda umowa była zgodna z wymogami RODO oraz chroniła interesy Twojej firmy.",
      },
      {
        title: "Doradztwo w zakresie międzynarodowego transferu danych",
        text: "Wspieramy firmy w procesie transferu danych osobowych poza Europejski Obszar Gospodarczy (EOG), pomagając w spełnieniu wymogów prawnych oraz minimalizacji ryzyka związanego z międzynarodowym przepływem danych.",
      },
      {
        title:
          "Reprezentacja w postępowaniach przed organami nadzorczymi",
        text: "Reprezentujemy klientów w postępowaniach przed organami nadzorczymi, takimi jak Urząd Ochrony Danych Osobowych (UODO). Wspieramy także w przygotowywaniu odpowiedzi na zapytania organów oraz w procesach związanych z kontrolami.",
      },
    ],
    outro:
      "Nasze usługi w zakresie ochrony danych osobowych zapewniają Twojej firmie bezpieczeństwo prawne oraz pomagają w budowaniu zaufania wśród klientów i partnerów biznesowych.",
  },
  {
    slug: "blockchain",
    title: "Blockchain",
    intro: "Technologia blockchain, będąca fundamentem innowacji takich jak kryptowaluty czy inteligentne kontrakty, przynosi ze sobą rewolucyjne możliwości dla wielu sektorów gospodarki. Jednakże, ze względu na swój nowatorski charakter, blockchain stawia przed przedsiębiorcami szereg wyzwań prawnych i regulacyjnych. Nasza kancelaria oferuje kompleksowe wsparcie prawne w adaptacji modeli biznesowych opartych na blockchain do obowiązujących przepisów prawa.",
    listHeading: "Nasze usługi w zakresie technologii blockchain obejmują:",
    items: [
      {
        title: "Adaptacja modeli biznesowych do wymogów prawnych",
        text: "Pomagamy firmom działającym w oparciu o technologię blockchain w dostosowaniu ich działalności do obowiązujących przepisów prawnych, minimalizując ryzyko prawne i zapewniając zgodność z regulacjami na rynku krajowym oraz międzynarodowym. Doradzamy w kwestiach związanych z tworzeniem i wdrażaniem innowacyjnych rozwiązań technologicznych, takich jak tokenizacja aktywów, inteligentne kontrakty oraz zdecentralizowane finanse (DeFi).",
      },
      {
        title:
          "Prawo i podatki w obrocie dobrami materialnymi opartymi na blockchain",
        text: "Oferujemy wsparcie w prawidłowej aplikacji obowiązków prawnych i prawno-podatkowych związanych z obrotem dobrami materialnymi opartymi na technologii blockchain, w tym kryptowalutami. Nasze usługi obejmują doradztwo w zakresie ewidencjonowania transakcji, zgodności z przepisami dotyczącymi przeciwdziałania praniu pieniędzy (AML), oraz rozliczeń podatkowych.",
      },
      {
        title: "Regulacje dotyczące emisji tokenów (ICO, STO)",
        text: "Wspieramy przedsiębiorstwa w procesie przygotowania i przeprowadzania emisji tokenów (ICO, STO), dbając o spełnienie wymogów prawnych i regulacyjnych. Pomagamy w tworzeniu dokumentacji, w tym white papers, oraz w uzyskiwaniu niezbędnych zezwoleń od organów regulacyjnych.",
      },
      {
        title: "Bezpieczeństwo i ochrona danych w blockchain",
        text: "Doradzamy w zakresie bezpieczeństwa oraz ochrony danych w projektach blockchain, w tym w kwestiach związanych z prywatnością, anonimizacją danych, oraz zarządzaniem danymi osobowymi w zdecentralizowanych systemach.",
      },
      {
        title: "Reprezentacja w sporach i mediacje",
        text: "Reprezentujemy klientów w sporach prawnych związanych z technologią blockchain, zarówno na etapie przedsądowym, jak i w postępowaniach sądowych oraz arbitrażowych. Wspieramy także w mediacjach oraz negocjacjach, pomagając rozwiązać konflikty w sposób szybki i efektywny.",
      },
    ],
    outro:
      "Nasza specjalizacja w obszarze blockchain łączy głęboką wiedzę prawniczą z unikalnym zrozumieniem nowoczesnych technologii, co pozwala nam oferować rozwiązania skrojone na miarę potrzeb naszych klientów.",
  },
  {
    slug: "ai-big-data",
    title: "AI & Big Data",
    intro: "W erze transformacji cyfrowej, sztuczna inteligencja (AI) oraz analiza dużych zbiorów danych (Big Data) stają się fundamentem innowacji i konkurencyjności w wielu branżach, w tym w sektorze IT. Jednak dynamiczny rozwój tych technologii wiąże się również z nowymi wyzwaniami prawnymi, które wymagają specjalistycznej wiedzy i dostosowania do zmieniających się regulacji.",
    listHeading: "Nasze usługi w zakresie AI i Big Data obejmują:",
    items: [
      {
        title: "Zgodność z regulacjami prawnymi",
        text: "Doradzamy w zakresie zapewnienia zgodności systemów funkcjonujących w oparciu o AI oraz Big Data z obowiązującymi przepisami prawa. Skupiamy się na spełnieniu wymagań stawianych przez prawo krajowe i międzynarodowe, aby Twoje technologie były w pełni legalne i bezpieczne.",
      },
      {
        title: "Ochrona danych osobowych",
        text: "Zajmujemy się analizą zgodności działań związanych z przetwarzaniem danych osobowych w projektach AI i Big Data z RODO oraz innymi przepisami dotyczącymi ochrony prywatności. Nasze usługi obejmują audyty zgodności, przygotowywanie polityk prywatności, oraz wsparcie w razie incydentów związanych z naruszeniem danych.",
      },
      {
        title: "Zarządzanie ryzykiem i etyka AI",
        text: "Pomagamy firmom identyfikować i zarządzać ryzykami prawnymi związanymi z wdrażaniem systemów AI, w tym ryzykami związanymi z algorytmiczną dyskryminacją, przejrzystością i odpowiedzialnością. Doradzamy także w kwestiach etycznych, zapewniając, że technologie AI są rozwijane i stosowane zgodnie z najlepszymi praktykami oraz standardami branżowymi.",
      },
      {
        title: "Zgodność z regulacjami dotyczącymi ochrony konsumentów",
        text: "Systemy AI i Big Data, które oddziałują na konsumentów, muszą być zgodne z regulacjami dotyczącymi ochrony konsumentów. Pomagamy w identyfikacji potencjalnych zagrożeń i w zapewnieniu, że Twoje działania spełniają wszystkie wymogi prawne.",
      },
      {
        title: "Doradztwo w zakresie wykorzystania danych",
        text: "Wspieramy firmy w tworzeniu i wdrażaniu strategii dotyczących wykorzystania danych, w tym w zakresie zbierania, przetwarzania i analizowania danych z uwzględnieniem obowiązujących regulacji prawnych.",
      },
    ],
    outro:
      "Nasze usługi w zakresie AI i Big Data są skierowane do firm, które chcą w pełni wykorzystać potencjał nowoczesnych technologii, jednocześnie minimalizując ryzyko prawne i zapewniając zgodność z przepisami.",
  },
  {
    slug: "ip-box",
    title: "IP BOX / 50% KUP",
    intro: "Nasza kancelaria specjalizuje się w doradztwie prawno-podatkowym dla firm z sektora IT, które chcą skorzystać z dostępnych narzędzi optymalizacji podatkowej, takich jak IP BOX czy 50% koszty uzyskania przychodu (KUP).",
    listHeading: "IP BOX",
    items: [
      {
        title: "Analiza kwalifikacji dochodów",
        text: "Weryfikujemy, czy Twoje dochody spełniają kryteria do objęcia preferencją IP BOX.",
      },
      {
        title: "Optymalizacja struktury podatkowej",
        text: "Pomagamy w restrukturyzacji i zarządzaniu prawami własności intelektualnej w sposób, który maksymalizuje korzyści z IP BOX.",
      },
      {
        title: "Przygotowanie dokumentacji",
        text: "Kompleksowe wsparcie w przygotowaniu dokumentacji niezbędnej do skorzystania z IP BOX, w tym prowadzenie ewidencji IP oraz sporządzanie niezbędnych wniosków do urzędów skarbowych.",
      },
    ],
    outro:
      "Nasze usługi w zakresie IP BOX i 50% KUP są dostosowane do specyfiki sektora IT, co pozwala na maksymalizację korzyści finansowych przy jednoczesnym zachowaniu pełnej zgodności z obowiązującymi przepisami.",
  },
  {
    slug: "inne",
    title: "Inne",
    intro: "W dynamicznie zmieniającym się środowisku technologicznym, każda firma potrzebuje solidnego wsparcia prawnego, aby bezpiecznie nawigować przez skomplikowane kwestie prawne związane z ich działalnością operacyjną. Nasza kancelaria prawna specjalizuje się w dostarczaniu precyzyjnych, skrojonych na miarę rozwiązań, które są niezbędne, by zapewnić zgodność z przepisami oraz zabezpieczyć interesy Twojej firmy.",
    listHeading: "Nasze kluczowe obszary specjalizacji obejmują:",
    items: [
      {
        title: "Prawo handlowe i kontrakty IT",
        text: "Wspieramy Twoją firmę w tworzeniu i negocjacji umów kluczowych dla działalności IT, w tym umów wdrożeniowych, serwisowych, licencyjnych oraz umów outsourcingowych. Dbamy o to, aby każdy kontrakt chronił Twoje interesy, jednocześnie zapewniając przejrzystość i zgodność z obowiązującymi przepisami.",
      },
      {
        title: "Compliance i ochrona danych osobowych",
        text: "Zapewniamy kompleksowe wsparcie w zakresie zgodności z RODO oraz innymi przepisami dotyczącymi ochrony danych. Nasze usługi obejmują audyty, tworzenie polityk ochrony danych, oraz doradztwo w sytuacjach kryzysowych związanych z naruszeniem bezpieczeństwa danych.",
      },
      {
        title: "Prawa własności intelektualnej i autorskie",
        text: "Wspieramy Twoją firmę w ochronie innowacji, technologii i twórczości, zabezpieczając prawa autorskie, patenty, oraz znaki towarowe. Nasze usługi obejmują także doradztwo w sprawach dotyczących licencji na oprogramowanie oraz transakcji związanych z własnością intelektualną.",
      },
      {
        title: "Doradztwo prawne dla startupów i firm technologicznych",
        text: "Rozumiemy specyfikę sektora technologicznego, dlatego oferujemy dedykowane usługi prawne, które wspierają rozwój innowacyjnych projektów. Pomagamy w zakładaniu spółek, pozyskiwaniu finansowania, oraz doradzamy w kwestiach związanych z własnością intelektualną i ochroną danych.",
      },
      {
        title: "Wsparcie w zakresie prawa pracy dla branży IT",
        text: "Doradzamy w kwestiach zatrudnienia specjalistów IT, przygotowujemy umowy o pracę oraz umowy B2B, dbając o ochronę interesów zarówno pracodawcy, jak i pracownika. Pomagamy także w rozwiązywaniu sporów pracowniczych oraz w sprawach dotyczących ochrony tajemnic przedsiębiorstwa.",
      },
    ],
    outro:
      "Nasze usługi są skierowane do firm, które chcą skupić się na innowacjach i rozwoju, mając pewność, że ich działania są zgodne z prawem, a ryzyko prawne jest minimalizowane.",
  },
];

/* IP BOX has extra section for 50% KUP */
export const ipBoxExtraSection = {
  heading: "50% Koszty Uzyskania Przychodu (KUP)",
  intro:
    "50% KUP to specjalna forma ulgi podatkowej dla osób zatrudnionych na umowach o dzieło lub umowach o pracę, która pozwala na znaczne obniżenie podstawy opodatkowania dla twórców, takich jak programiści, inżynierowie oprogramowania czy inne osoby zajmujące się działalnością twórczą w branży IT.",
  items: [
    {
      title: "Wdrożenie 50% KUP",
      text: "Pomagamy w prawidłowym wdrożeniu 50% KUP w Twojej firmie, zapewniając zgodność z przepisami oraz minimalizując ryzyko sporów z organami podatkowymi.",
    },
    {
      title: "Audyt zgodności",
      text: "Przeprowadzamy audyty, aby upewnić się, że wszystkie umowy i wynagrodzenia spełniają wymagania do stosowania 50% KUP.",
    },
    {
      title: "Reprezentacja w kontaktach z urzędami",
      text: "Reprezentujemy Twoją firmę w sprawach związanych z interpretacją przepisów oraz w przypadku kontroli podatkowych.",
    },
  ],
};
