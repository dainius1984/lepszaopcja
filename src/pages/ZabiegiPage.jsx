import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import ServicesGrid from "../components/ServicesGrid";
import TerapieMeridianowe from "../components/TerapieMeridianowe";
import ContactFooter from "../components/ContactFooter";
import Seo from "../components/Seo";
import JsonLd from "../components/JsonLd";
import { getLocalBusinessSchema } from "../seo/schemas";

export default function ZabiegiPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== "#meridiany") return;
    const scrollToMeridiany = () => {
      const el = document.getElementById("meridiany");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const t = setTimeout(scrollToMeridiany, 350);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col">
      <Seo
        title="Zabiegi moksy — Akupunktura bez igieł, terapia meridianowa"
        description="Zabiegi moksoterapii: bezpośrednia, pośrednia i cygarem. Terapie meridianowe i akupunktura bez igieł w Wilkszynie k. Wrocławia. Harmonizacja energii Chi, 12 meridianów."
        keywords="zabiegi moksy, moksoterapia zabiegi, akupunktura bez igieł, terapia meridianowa, meridiany, harmonizacja Chi, moksa Wilkszyn, zabiegi TCM"
        url="/zabiegi"
      />
      <JsonLd schema={getLocalBusinessSchema()} />
      <Navbar />
      <main className="flex-1">
        {/* Nagłówek strony */}
        <section className="pt-24 md:pt-28 pb-12 md:pb-16 bg-[#F5F5DC]/50 border-b border-[#71797E]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <span className="inline-block mb-3 text-xs uppercase tracking-widest text-[#71797E] font-medium">
              Oferta
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] leading-tight"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Zabiegi
            </h1>
            <p className="mt-4 text-[#555555] text-base sm:text-lg max-w-xl mx-auto font-light">
              Moksoterapia w różnych formach oraz terapie meridianowe — wybierz
              ścieżkę dopasowaną do swoich potrzeb.
            </p>
          </div>
        </section>

        <ServicesGrid />
        <TerapieMeridianowe />
        <ContactFooter />
      </main>
    </div>
  );
}
