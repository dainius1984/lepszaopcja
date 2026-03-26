import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "../config/site";
import { PORADNIK_MOKSOTERAPII_PATH } from "../data/poradnikMoksoterapiiMeta.js";
import { KOMPENDIUM_ODZYWANIA_PATH } from "../data/kompendiumOdzywianiaMeta.js";
import { MOKSA_WROCLAW_PATH } from "../data/moksaWroclawPath.js";

export { MOKSA_WROCLAW_PATH };

/**
 * LocalBusiness schema for the clinic (Schema.org).
 * Wilkszyn coordinates approx: 51.0936° N, 17.0789° E (near Wrocław).
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Moksy — Moksoterapia i medycyna chińska",
    alternateName: "LepszaOpcja",
    description:
      "Domowa Akademia Moksy — mobilna moksoterapia TCM we Wrocławiu i okolicach, nauka praktyki w domu, warsztaty, boxy z moksa. Konsultacje i zabiegi — także Wilkszyn / Dolny Śląsk.",
    url: SITE_URL,
    telephone: "+48690532778",
    email: "kontakt@lepszaopcja.pl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Leśna 39",
      addressLocality: "Wilkszyn",
      postalCode: "55-330",
      addressRegion: "Dolnośląskie",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.0936,
      longitude: 17.0789,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Wrocław" },
      { "@type": "City", name: "Wilkszyn" },
      { "@type": "State", name: "Dolny Śląsk" },
    ],
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usługi moksoterapii i szkolenia",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Moksoterapia bezpośrednia" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Moksoterapia pośrednia" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Terapia cygarem moksowym" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Terapie meridianowe" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Course", name: "Szkolenia z moksoterapii" },
        },
      ],
    },
  };
}

/**
 * Course schemas for training offerings (Schema.org).
 */
export function getCourseSchemas() {
  const provider = {
    "@type": "LocalBusiness",
    name: "Moksy",
    url: SITE_URL,
  };

  const courses = [
    {
      name: "Wprowadzenie do moksoterapii",
      description:
        "Kompleksowy kurs dla początkujących: teoria TCM, system meridianów, bezpieczeństwo moksy oraz praktyczne zastosowanie trzech głównych technik.",
      duration: "P2D",
      numberOfCredits: 16,
    },
    {
      name: "Moksoterapia w praktyce klinicznej",
      description:
        "Protokoły pod konkretne schorzenia, ocena pacjenta, przeciwwskazania oraz włączenie moksy do codziennej praktyki terapeutycznej.",
      duration: "P3D",
      numberOfCredits: 24,
    },
    {
      name: "Moksa w zdrowiu kobiety",
      description:
        "Moduł ginekologiczny: nieregularne miesiączki, wsparcie płodności oraz opieka okołoporodowa w ujęciu klasycznym i współczesnym.",
      duration: "P2D",
      numberOfCredits: 16,
    },
  ];

  return courses.map((c) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description: c.description,
    provider,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      duration: c.duration,
    },
    ...(c.numberOfCredits && { numberOfCredits: c.numberOfCredits }),
  }));
}

/**
 * Article + BreadcrumbList dla długich przewodników (Schema.org).
 * @param {string} path - Ścieżka kanoniczna, np. "/poradnik/..."
 * @param {{ headline: string, description: string, articleSection: string, keywords: string[], datePublished?: string, dateModified?: string }} opts
 */
function buildGuideArticleSchemas(path, opts) {
  const {
    headline,
    description,
    articleSection,
    keywords,
    datePublished = "2026-03-01",
    dateModified = "2026-03-22",
  } = opts;
  const pageUrl = `${SITE_URL}${path}`;
  const publisher = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: DEFAULT_OG_IMAGE,
    },
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline,
    description,
    image: [DEFAULT_OG_IMAGE],
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher,
    datePublished: `${datePublished}T08:00:00+01:00`,
    dateModified: `${dateModified}T08:00:00+01:00`,
    inLanguage: "pl-PL",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: headline,
      description,
    },
    articleSection,
    keywords,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: headline,
        item: pageUrl,
      },
    ],
  };

  return [article, breadcrumb];
}

/**
 * @param {{ headline: string, description: string, datePublished?: string, dateModified?: string }} opts
 */
export function getPoradnikMoksoterapiiSchemas(opts) {
  const { headline, description, datePublished, dateModified } = opts;
  return buildGuideArticleSchemas(PORADNIK_MOKSOTERAPII_PATH, {
    headline,
    description,
    datePublished,
    dateModified,
    articleSection: "Moksoterapia",
    keywords: [
      "moksoterapia",
      "moksa w domu",
      "TCM",
      "wilgoć w organizmie",
      "Zusanli ST36",
      "Guanyuan CV4",
    ],
  });
}

/**
 * @param {{ headline: string, description: string, datePublished?: string, dateModified?: string }} opts
 */
export function getKompendiumOdzywianiaSchemas(opts) {
  const { headline, description, datePublished, dateModified } = opts;
  return buildGuideArticleSchemas(KOMPENDIUM_ODZYWANIA_PATH, {
    headline,
    description,
    datePublished,
    dateModified,
    articleSection: "Medycyna chińska — żywienie i styl życia",
    keywords: [
      "żywienie TCM",
      "Qi",
      "trawienie",
      "śledziona",
      "ciepłe posiłki",
      "rytm dobowy",
      "kompendium odżywiania",
    ],
  });
}

/** ItemList przewodników na stronie głównej (wewnętrzne linkowanie w SERP / zrozumienie struktury). */
/**
 * WebPage + MedicalTherapy (Service) + BreadcrumbList — strona „Moksa Wrocław”.
 * Dostawca powiązany z LocalBusiness przez @id.
 */
export function getMoksaWroclawSchemas() {
  const pageUrl = `${SITE_URL}${MOKSA_WROCLAW_PATH}`;
  const localBusinessId = `${SITE_URL}/#localbusiness`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Profesjonalna Moksoterapia we Wrocławiu — Moksa Wrocław",
    description:
      "Profesjonalna moksoterapia we Wrocławiu i okolicach. Tradycyjna Medycyna Chińska, zabiegi moksy, wsparcie odporności. Rezerwacja wizyty.",
    inLanguage: "pl-PL",
    isPartOf: {
      "@type": "WebSite",
      url: SITE_URL,
      name: SITE_NAME,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: DEFAULT_OG_IMAGE,
    },
    mainEntity: { "@id": `${pageUrl}#moksa-wroclaw-service` },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "@id": `${pageUrl}#moksa-wroclaw-service`,
    name: "Moksoterapia (moksa) — Wrocław",
    description:
      "Zabiegi moksoterapii w ujęciu TCM: ciepło moksy na punktach akupunkturowych, techniki pośrednie i bezpośrednie. Usługa skierowana do osób z Wrocławia i okolic.",
    url: pageUrl,
    provider: { "@id": localBusinessId },
    areaServed: [
      {
        "@type": "City",
        name: "Wrocław",
        containedInPlace: { "@type": "AdministrativeArea", name: "Dolny Śląsk" },
      },
    ],
    relevantSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Traditional Chinese Medicine",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Zabiegi",
        item: `${SITE_URL}/zabiegi`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Moksa Wrocław",
        item: pageUrl,
      },
    ],
  };

  return [webPage, service, breadcrumb];
}

export function getHomeGuidesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Przewodniki TCM — moksoterapia i żywienie",
    description:
      "Darmowe kompendia: poradnik moksoterapii w domu oraz zasady żywienia i stylu życia wg medycyny chińskiej.",
    numberOfItems: 2,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Poradnik moksoterapii — Ścieżka ciepła",
        url: `${SITE_URL}${PORADNIK_MOKSOTERAPII_PATH}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kompendium żywienia TCM — Rytm stołu",
        url: `${SITE_URL}${KOMPENDIUM_ODZYWANIA_PATH}`,
      },
    ],
  };
}
