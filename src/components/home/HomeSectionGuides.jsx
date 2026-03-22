import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen, Leaf } from "lucide-react";
import { PORADNIK_MOKSOTERAPII_PATH } from "../../data/poradnikMoksoterapiiMeta";
import { KOMPENDIUM_ODZYWANIA_PATH } from "../../data/kompendiumOdzywianiaMeta";

const guides = [
  {
    to: PORADNIK_MOKSOTERAPII_PATH,
    title: "Poradnik moksoterapii — Ścieżka ciepła",
    kicker: "Moksa w domu",
    description:
      "Kiedy stosować moksa, przygotowanie i pielęgnacja po zabiegu, częstotliwość, wilgoć w TCM, moksa dymna i bezdymna, bezpieczeństwo oraz dobór punktów — praktyczny przewodnik krok po kroku.",
    icon: BookOpen,
    cta: "Czytaj poradnik moksoterapii",
  },
  {
    to: KOMPENDIUM_ODZYWANIA_PATH,
    title: "Kompendium żywienia i stylu życia — Rytm stołu",
    kicker: "TCM na co dzień",
    description:
      "Temperatura posiłków, owoce a klimat, pory roku, sen i rytm dnia, śniadanie kleikowe, zupy, herbata na śledzionę oraz aktywność wspierająca Qi — zasady energetyczne w zrozumiałej formie.",
    icon: Leaf,
    cta: "Czytaj kompendium żywienia TCM",
  },
];

export default function HomeSectionGuides() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="przewodniki"
      className="py-16 sm:py-20 md:py-24 bg-[#FAFAF5] border-y border-[#71797E]/10 scroll-mt-20 md:scroll-mt-24"
      aria-labelledby="przewodniki-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-14"
        >
          <span className="inline-block mb-3 text-xs uppercase tracking-widest text-[#71797E] font-medium">
            Wiedza bez opłat
          </span>
          <h2
            id="przewodniki-heading"
            className="text-3xl sm:text-4xl md:text-[2.15rem] font-bold text-[#333333] mb-4 leading-tight"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Przewodniki TCM — moksoterapia i zdrowe odżywianie
          </h2>
          <p className="text-[#555555] text-base sm:text-lg font-light leading-relaxed">
            Dwa obszerne kompendia na stronie: jak bezpiecznie praktykować moksa w domu oraz jak wspierać
            trawienie i energię zgodnie z medycyną chińską. Stałe adresy URL, aktualizowane treści —
            możesz wracać do nich w dowolnym momencie.
          </p>
        </motion.div>

        <nav aria-label="Przewodniki moksoterapii i żywienia TCM">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 list-none p-0 m-0">
            {guides.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.li
                  key={g.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.06 }}
                >
                  <Link
                    to={g.to}
                    className="group flex flex-col h-full rounded-2xl border border-[#71797E]/15 bg-white p-6 sm:p-8 shadow-sm hover:border-[#71797E]/30 hover:shadow-md transition-all duration-300"
                  >
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C4862A] mb-3">
                      <Icon size={16} className="text-[#71797E]" aria-hidden />
                      {g.kicker}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-[#333333] mb-3 leading-snug group-hover:text-[#71797E] transition-colors">
                      {g.title}
                    </span>
                    <p className="text-sm text-[#555555] leading-relaxed flex-1 mb-6">{g.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#333333] group-hover:text-[#C4862A] transition-colors">
                      {g.cta}
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
