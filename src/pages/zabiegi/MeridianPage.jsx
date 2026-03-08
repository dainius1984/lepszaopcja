import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "../../components/Navbar";
import Seo from "../../components/Seo";
import { getMeridianBySlug } from "../../data/meridians";
import { getMeridianIcon } from "../../utils/meridianIcons";

export default function MeridianPage() {
  const { slug } = useParams();
  const meridian = getMeridianBySlug(slug);

  if (!meridian) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] font-sans antialiased">
        <Seo title="Nie znaleziono" description="Strona o podanym adresie nie istnieje." url={`/zabiegi/${slug}`} />
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1
              className="text-2xl font-bold text-[#333333] mb-4"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Nie znaleziono meridianu
            </h1>
            <p className="text-[#555555] mb-6">
              Strona o podanym adresie nie istnieje.
            </p>
            <Link
              to="/#meridiany"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#71797E] text-[#F5F5DC] text-sm font-medium hover:bg-[#5A6468] transition-colors"
            >
              Wróć do terapii meridianowych
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const IconComponent = getMeridianIcon(meridian.icon);

  return (
    <div className="min-h-screen bg-[#FAFAF5] font-sans antialiased">
      <Seo
        title={meridian.title}
        description={meridian.shortDescription}
        keywords={`${meridian.title}, terapia meridianowa, moksoterapia, meridiany, TCM, Wilkszyn, Wrocław`}
        url={`/zabiegi/${slug}`}
      />
      <Navbar />
      <main className="pt-20 md:pt-24 pb-20">
        {/* Zen layout: soft gradient, plenty of whitespace */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Decorative top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#71797E]/5 pointer-events-none"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="pt-8 pb-4 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#71797E]/10 mb-6">
              <IconComponent size={28} className="text-[#71797E]" />
            </div>
            <span className="inline-block text-xs uppercase tracking-widest text-[#71797E] font-medium mb-3">
              Terapia meridianowa · Moksoterapia
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] leading-tight"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {meridian.title}
            </h1>
          </motion.div>

          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-[#F5F5DC]/50 rounded-3xl p-8 sm:p-10 mb-10 border border-[#71797E]/10">
              <h2
                className="text-xl font-bold text-[#333333] mb-4 mt-0"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Opis i zastosowanie
              </h2>
              <div className="text-[#555555] leading-relaxed space-y-4 font-light">
                {meridian.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="mb-0">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h2
                className="text-xl font-bold text-[#333333] mb-4"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Objawy i dolegliwości, przy których wspieramy ten meridian
              </h2>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {meridian.benefits.map((b) => (
                  <li
                    key={b}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#71797E]/10 text-[#555555] text-sm font-medium"
                  >
                    <Sparkles size={14} className="text-[#71797E] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="rounded-3xl bg-[#333333] text-[#F5F5DC] p-8 sm:p-10 text-center">
              <h2
                className="text-xl font-bold text-[#F5F5DC] mb-3 mt-0"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Chcesz umówić zabieg na ten meridian?
              </h2>
              <p className="text-[#F5F5DC]/80 text-sm sm:text-base font-light mb-6 max-w-md mx-auto">
                Skontaktuj się z nami — dopasujemy rodzaj moksoterapii i
                harmonizację energii Chi do Twoich potrzeb.
              </p>
              <Link
                to="/"
                state={{ scrollTo: "contact" }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F5F5DC] text-[#333333] text-sm font-medium hover:bg-white transition-colors duration-300"
              >
                Przejdź do formularza kontaktowego
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 text-center"
          >
            <Link
              to="/#meridiany"
              className="text-[#71797E] text-sm font-medium hover:text-[#5A6468] transition-colors"
            >
              ← Wróć do wszystkich meridianów
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
