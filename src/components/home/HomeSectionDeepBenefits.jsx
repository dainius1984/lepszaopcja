import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import { PORADNIK_MOKSOTERAPII_PATH } from "../../data/poradnikMoksoterapiiMeta";
import { KOMPENDIUM_ODZYWANIA_PATH } from "../../data/kompendiumOdzywianiaMeta";

const feel = [
  "Lepsza regeneracja — ciało szybciej odpoczywa i wraca do formy po wysiłku lub stresie",
  "Większa odporność — organizm lepiej broni się przed infekcjami",
  "Lepszy sen — łatwiej zasypiasz i budzisz się wypoczęty",
  "Poprawa apetytu i trawienia — ciało odzyskuje naturalną równowagę",
  "Większy komfort w ciele — mniej napięć, bólu i zastojów",
  "Ogrzanie i wzmocnienie organizmu — ciepło rozluźnia mięśnie, wspiera krążenie i pomaga pozbyć się „zimna” i uczucia ciężkości",
  "Relaks dla układu nerwowego — pomaga wyciszyć stres, uspokaja i poprawia samopoczucie",
  "Wspomaganie regeneracji po kontuzjach — ciało szybciej wraca do zdrowia po urazach",
  "Oczyszczenie i odżywienie organizmu — wspiera usuwanie toksyn i poprawia ogólną witalność",
];

const miniFaq = [
  {
    q: "Czy to boli?",
    a: "Nie — ciepło jest przyjemne i relaksujące.",
  },
  {
    q: "Czy poczuję coś od razu?",
    a: "Tak, wielu klientów odczuwa odprężenie, ciepło i lekkie rozluźnienie mięśni już po pierwszej sesji.",
  },
  {
    q: "Czy to bezpieczne?",
    a: "Tak — używam sprawdzonych technik, które nie powodują poparzeń i są odpowiednie dla domowej praktyki.",
  },
];

export default function HomeSectionDeepBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="korzysci" className="py-16 sm:py-20 md:py-28 bg-white scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
            Dlaczego warto
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] mb-5 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Dlaczego warto – Zalety moksoterapii
          </h2>
          <p className="text-[#555555] text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Moksoterapia to naturalna terapia ciepłem, która pomaga Twojemu ciału odzyskać równowagę
            i lepsze samopoczucie. To nie magia — to tysiące lat doświadczenia połączone z obserwacjami,
            które pokazują, jak organizm reaguje na ciepło.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-12 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex min-h-0 min-w-0 flex-col lg:h-full"
          >
            <h3 className="text-lg font-semibold text-[#333333] mb-4 flex items-center gap-2">
              <Sparkles className="text-[#C4862A] shrink-0" size={20} />
              Co możesz poczuć i zauważyć po sesji
            </h3>
            {/* Jedna kolumna: ta sama linia końca co prawa strona, gdy rząd siatki ma wspólną wysokość */}
            <ul className="w-full space-y-3.5">
              {feel.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[#555555] leading-relaxed pl-4 border-l-2 border-[#71797E]/25"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex min-h-0 min-w-0 flex-col gap-8 lg:h-full lg:min-h-0 lg:justify-between lg:gap-0"
          >
            <div className="rounded-2xl bg-[#FAFAF5] border border-[#71797E]/10 p-6 sm:p-7 shrink-0 w-full">
              <h3 className="text-lg font-semibold text-[#333333] mb-3">Dlaczego to działa?</h3>
              <p className="text-sm text-[#555555] leading-relaxed">
                Ciepło moksy działa głęboko w ciele, poprawiając przepływ energii i krwi oraz rozluźniając
                napięcia mięśni. Dzięki temu organizm sam może wrócić do stanu równowagi, szybciej się
                regenerować i lepiej reagować na stres i infekcje.
              </p>
            </div>
            <div className="shrink-0 w-full">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#71797E] mb-3">
                Mini FAQ – co możesz oczekiwać po sesji
              </h3>
              <div className="space-y-3">
                {miniFaq.map((item) => (
                  <div key={item.q} className="rounded-xl border border-[#71797E]/12 bg-white p-3.5 sm:p-4">
                    <p className="text-sm font-medium text-[#333333] mb-1">{item.q}</p>
                    <p className="text-sm text-[#555555] leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-14 lg:mt-16 w-full min-w-0"
        >
          <p className="text-center text-sm text-[#555555] leading-relaxed mb-6 px-1">
            Chcesz więcej wiedzy w jednym miejscu? Otwórz przewodniki poniżej albo przejdź do sekcji{" "}
            <a
              href="#przewodniki"
              className="font-medium text-[#333333] border-b border-[#71797E]/40 hover:border-[#C4862A] hover:text-[#C4862A] transition-colors"
            >
              przewodników na stronie głównej
            </a>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            <Link
              to={PORADNIK_MOKSOTERAPII_PATH}
              className="group flex items-start justify-between gap-3 rounded-2xl border border-[#71797E]/15 bg-[#FAFAF5]/80 p-5 sm:p-6 text-left transition-all hover:border-[#71797E]/30 hover:bg-[#FAFAF5] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#71797E]"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#71797E]">
                  Poradnik moksoterapii
                </span>
                <p
                  className="mt-1.5 text-base font-semibold text-[#333333] leading-snug"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Ścieżka ciepła
                </p>
                <p className="mt-2 text-xs text-[#555555] leading-relaxed">
                  Jak i kiedy wykonywać moksa — praktyczny przewodnik TCM.
                </p>
              </div>
              <ChevronRight
                className="shrink-0 text-[#71797E] transition-transform group-hover:translate-x-0.5 group-hover:text-[#C4862A]"
                size={22}
                aria-hidden
              />
            </Link>
            <Link
              to={KOMPENDIUM_ODZYWANIA_PATH}
              className="group flex items-start justify-between gap-3 rounded-2xl border border-[#71797E]/15 bg-[#FAFAF5]/80 p-5 sm:p-6 text-left transition-all hover:border-[#71797E]/30 hover:bg-[#FAFAF5] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#71797E]"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#71797E]">
                  Kompendium żywienia i stylu życia
                </span>
                <p
                  className="mt-1.5 text-base font-semibold text-[#333333] leading-snug"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Rytm stołu
                </p>
                <p className="mt-2 text-xs text-[#555555] leading-relaxed">
                  Zasady energetyczne TCM w codziennej diecie i nawykach.
                </p>
              </div>
              <ChevronRight
                className="shrink-0 text-[#71797E] transition-transform group-hover:translate-x-0.5 group-hover:text-[#C4862A]"
                size={22}
                aria-hidden
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
