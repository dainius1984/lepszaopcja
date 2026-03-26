import { Helmet } from "react-helmet-async";
import { SITE_URL, SITE_NAME, TITLE_SUFFIX, DEFAULT_OG_IMAGE } from "../config/site";

const DEFAULT_DESCRIPTION =
  "Gabinet moksoterapii i medycyny chińskiej w Wilkszynie k. Wrocławia. Zabiegi moksą, terapia meridianowa, szkolenia z moksoterapii. Ul. Leśna 39.";

/**
 * Reusable SEO component: document title, meta description, keywords,
 * canonical URL, Open Graph (Facebook/LinkedIn), and Twitter Card tags.
 *
 * @param {string} title - Page title (prefixed with site name / suffix)
 * @param {string} [description] - Meta description
 * @param {string} [keywords] - Meta keywords (comma-separated)
 * @param {string} [url] - Canonical URL path (e.g. "/zabiegi") or full URL; defaults to SITE_URL + pathname
 * @param {string} [image] - OG/Twitter image URL
 * @param {string} [type] - og:type (default "website")
 * @param {boolean} [omitTitleSuffix] - if true, use `title` as the full document title (no automatic suffix)
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  url,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  omitTitleSuffix = false,
}) {
  const fullTitle =
    title && omitTitleSuffix
      ? title
      : title
        ? `${title} ${TITLE_SUFFIX}`
        : `${SITE_NAME} ${TITLE_SUFFIX}`;
  const canonicalUrl = url ? (url.startsWith("http") ? url : `${SITE_URL}${url}`) : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pl_PL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
