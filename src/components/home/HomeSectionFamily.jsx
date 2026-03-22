import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Home } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

export default function HomeSectionFamily() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="rodzina" className="py-16 sm:py-20 md:py-28 bg-[#F5F5DC]/35 scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex items-center gap-2 mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
              <Home size={14} />
              Pomoc bliskim
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] mb-6 leading-tight"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Dbaj o zdrowie
              <br />
              <span className="italic text-[#71797E]">swoich bliskich w domu</span>
            </h2>
            <p className="text-[#555555] text-base leading-relaxed mb-8 font-light">
              Moksoterapia to bezpieczna i delikatna metoda, którą możesz stosować w domu, aby
              przynosić ulgę i poprawiać komfort życia swoich bliskich.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                {
                  title: "Osoby starsze",
                  text: "rozluźnia mięśnie, zmniejsza sztywność stawów i przynosi ulgę przy codziennych bólach.",
                },
                {
                  title: "Dzieci",
                  text: "wspiera relaksację, wycisza i pomaga w naturalnym rozwoju organizmu.",
                },
                {
                  title: "Osoby z wyzwaniami zdrowotnymi",
                  text: "(np. autyzm, napięcia mięśniowe): ciepło działa uspokajająco i pomaga w regulacji codziennego samopoczucia.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <Heart className="text-[#C4862A] shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong className="text-[#333333]">{item.title}:</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-white/80 border border-[#71797E]/10 p-5">
              <p className="text-sm text-[#555555] leading-relaxed">
                <strong className="text-[#333333]">Dlaczego to działa:</strong> Ciepło moksy działa głęboko
                w ciele, rozluźnia mięśnie i wspiera naturalne procesy regeneracji, poprawia krążenie i
                przynosi uczucie ciepła i komfortu — bezpiecznie i naturalnie.
              </p>
            </div>
            <a
              href="#akademia"
              className="inline-flex mt-8 px-7 py-3.5 rounded-full bg-[#333333] text-[#F5F5DC] text-sm font-medium hover:bg-[#555555] transition-colors"
            >
              Dowiedz się, jak możesz pomagać bliskim
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <ImagePlaceholder label="Rodzina / domowa praktyka — zdjęcie" aspectClass="aspect-[4/5]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
