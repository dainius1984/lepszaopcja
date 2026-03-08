import { SITE_URL } from "../config/site";

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
      "Gabinet moksoterapii i tradycyjnej medycyny chińskiej w Wilkszynie k. Wrocławia. Zabiegi moksą, terapia meridianowa, akupunktura bez igieł, szkolenia z moksoterapii.",
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
