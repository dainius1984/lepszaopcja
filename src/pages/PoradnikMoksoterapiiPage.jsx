import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
import Seo from "../components/Seo";
import JsonLd from "../components/JsonLd";
import GuideArticleBlock from "../components/GuideArticleBlock";
import { getPoradnikMoksoterapiiSchemas } from "../seo/schemas";
import {
  PORADNIK_MOKSOTERAPII_PATH,
  poradnikSeo,
  poradnikLead,
  poradnikArticleHeadline,
} from "../data/poradnikMoksoterapiiMeta";
import { poradnikSections } from "../data/poradnikSections";

export default function PoradnikMoksoterapiiPage() {
  const schemas = getPoradnikMoksoterapiiSchemas({
    headline: poradnikArticleHeadline,
    description: poradnikSeo.description,
  });

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col bg-[#FAFAF5]">
      <Seo
        title={poradnikSeo.title}
        description={poradnikSeo.description}
        keywords={poradnikSeo.keywords}
        url={PORADNIK_MOKSOTERAPII_PATH}
        type="article"
      />
      <Helmet>
        <meta property="article:published_time" content="2026-03-01T08:00:00+01:00" />
        <meta property="article:modified_time" content="2026-03-22T08:00:00+01:00" />
        <meta property="article:section" content="Moksoterapia" />
      </Helmet>
      <JsonLd schema={schemas} />
      <Navbar />
      <main className="flex-1">
        <header className="pt-24 md:pt-28 pb-10 md:pb-14 bg-gradient-to-b from-[#F5F5DC]/80 to-[#FAFAF5] border-b border-[#71797E]/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
            <span className="inline-block mb-3 text-xs uppercase tracking-widest text-[#71797E] font-medium">
              Praktyczny przewodnik
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-[2.35rem] font-bold text-[#333333] leading-tight"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {poradnikArticleHeadline}
            </h1>
            <p className="mt-4 text-[#555555] text-base sm:text-lg font-light leading-relaxed">
              {poradnikLead}
            </p>
            <p className="mt-3 text-sm text-[#71797E]">
              Aktualizacja: marzec 2026 · Treść edukacyjna — nie zastępuje konsultacji ze specjalistą TCM.
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14 flex flex-col lg:flex-row gap-10 lg:gap-14">
          <nav
            aria-label="Spis treści poradnika moksoterapii"
            className="lg:w-72 shrink-0 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-2xl border border-[#71797E]/15 bg-white/80 backdrop-blur-sm p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-[#333333] uppercase tracking-wide mb-4">
                Spis treści
              </h2>
              <ol className="text-sm space-y-2.5 list-decimal list-inside text-[#555555] marker:text-[#71797E]">
                {poradnikSections.map((s) => (
                  <li key={s.id} className="pl-0.5">
                    <a
                      href={`#${s.id}`}
                      className="text-[#555555] hover:text-[#71797E] underline-offset-2 hover:underline transition-colors"
                    >
                      {s.title.replace(/^\d+\.\s*/, "")}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="flex-1 min-w-0 max-w-3xl">
            {poradnikSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="mb-14 scroll-mt-28 md:scroll-mt-32 last:mb-0"
                aria-labelledby={`heading-${section.id}`}
              >
                <h2
                  id={`heading-${section.id}`}
                  className="text-xl sm:text-2xl font-bold text-[#333333] mb-5 pb-3 border-b border-[#71797E]/15"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {section.title}
                </h2>
                <div className="prose-poradnik">
                  {section.blocks.map((block, i) => (
                    <GuideArticleBlock key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>

        <ContactFooter />
      </main>
    </div>
  );
}
