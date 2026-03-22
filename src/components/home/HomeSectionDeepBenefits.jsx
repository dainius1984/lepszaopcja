import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-[#333333] mb-4 flex items-center gap-2">
              <Sparkles className="text-[#C4862A] shrink-0" size={20} />
              Co możesz poczuć i zauważyć po sesji
            </h3>
            <ul className="space-y-3">
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
            className="space-y-8"
          >
            <div className="rounded-2xl bg-[#FAFAF5] border border-[#71797E]/10 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-[#333333] mb-3">Dlaczego to działa?</h3>
              <p className="text-sm text-[#555555] leading-relaxed">
                Ciepło moksy działa głęboko w ciele, poprawiając przepływ energii i krwi oraz rozluźniając
                napięcia mięśni. Dzięki temu organizm sam może wrócić do stanu równowagi, szybciej się
                regenerować i lepiej reagować na stres i infekcje.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#71797E] mb-4">
                Mini FAQ – co możesz oczekiwać po sesji
              </h3>
              <div className="space-y-4">
                {miniFaq.map((item) => (
                  <div key={item.q} className="rounded-xl border border-[#71797E]/12 bg-white p-4">
                    <p className="text-sm font-medium text-[#333333] mb-1">{item.q}</p>
                    <p className="text-sm text-[#555555] leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
