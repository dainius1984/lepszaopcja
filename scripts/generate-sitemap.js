/**
 * Generates sitemap.xml for Google (and other crawlers).
 * Run before build so public/sitemap.xml is copied to dist.
 *
 * Usage: node scripts/generate-sitemap.js
 */

import { writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { meridians } from "../src/data/meridians.js";
import { academySessions } from "../src/data/academySessions.js";
import { SITE_URL } from "../src/config/site.js";
import { MOKSA_WROCLAW_PATH } from "../src/data/moksaWroclawPath.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = SITE_URL.replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: "", changefreq: "weekly", priority: "1.0" },
  { path: "zabiegi", changefreq: "weekly", priority: "0.9" },
  {
    path: MOKSA_WROCLAW_PATH.replace(/^\//, ""),
    changefreq: "monthly",
    priority: "0.92",
  },
  {
    path: "poradnik/moksoterapia-jak-i-kiedy-wykonywac",
    changefreq: "monthly",
    priority: "0.85",
  },
  {
    path: "kompendium/zdrowe-odzywianie-styl-zycia-zasady-energetyczne-tcm",
    changefreq: "monthly",
    priority: "0.85",
  },
  { path: "szkolenia", changefreq: "monthly", priority: "0.9" },
  { path: "rezerwacja", changefreq: "weekly", priority: "0.8" },
];

const meridianRoutes = meridians.map((m) => ({
  path: `zabiegi/${m.slug}`,
  changefreq: "monthly",
  priority: "0.7",
}));

const academySessionRoutes = academySessions.map((s) => ({
  path: `akademia/${s.id}`,
  changefreq: "monthly",
  priority: "0.85",
}));

const urls = [
  ...staticRoutes,
  ...meridianRoutes,
  ...academySessionRoutes,
];

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const urlEntries = urls
  .map(
    ({ path, changefreq, priority }) => `
  <url>
    <loc>${escapeXml(`${baseUrl}/${path}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const publicDir = join(__dirname, "..", "public");
writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
console.log("Generated: public/sitemap.xml");

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
writeFileSync(join(publicDir, "robots.txt"), robotsTxt, "utf8");
console.log("Generated: public/robots.txt");
