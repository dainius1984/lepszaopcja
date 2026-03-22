import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    q: "Na czym polega moksoterapia i jakie daje korzyści?",
    a: "Moksoterapia to tradycyjna metoda medycyny wschodniej, polegająca na ogrzewaniu wybranych punktów na ciele za pomocą zioła bylicy w formie cygar, stożków lub pałeczek. Ciepło wnikające w punkty akupunkturowe stymuluje naturalne procesy regeneracyjne organizmu i wspomaga jego równowagę. Regularne stosowanie moksy może przynosić m.in. rozluźnienie mięśni, poprawę krążenia, wsparcie trawienia, łagodzenie bólów pleców i stawów oraz wspomaganie odporności.",
  },
  {
    q: "Jak długo trwa sesja?",
    a: "Sesje trwają w zależności od wybranego pakietu: Start-Up Express — 60 minut; Złoty Standard — 90–120 minut; Akademia Długowieczności — 180 minut (dla grupy do 4 osób).",
  },
  {
    q: "Jaki jest koszt sesji?",
    a: "Moksa Start-Up Express — 60 min | 250 zł. Moksa Złoty Standard — 90–120 min | 400 zł. Warsztat Domowy — Akademia Długowieczności — 180 min | 800 zł (za 4 osoby). Do każdej sesji możesz dokupić box Start lub Premium, aby w pełni wyposażyć się do samodzielnej praktyki w domu.",
  },
  {
    q: "Czy moksoterapia boli?",
    a: "Nie — sesje polegają na przyjemnym ogrzewaniu punktów ciała. Ciepło jest relaksujące i łagodnie rozluźnia mięśnie. Nie używamy igieł ani innych inwazyjnych technik.",
  },
  {
    q: "Dla kogo jest moksa?",
    a: "Moksa jest dla każdego, kto chce zadbać o swoje zdrowie, relaks i dobre samopoczucie w sposób naturalny. Szczególnie polecana osobom z napięciami i bólami, chcącym poprawić krążenie i regenerację, szukającym naturalnych metod wspierania energii oraz chcącym nauczyć się samodzielnej praktyki w domu.",
  },
  {
    q: "Czy mogę stosować moksa samodzielnie po sesji?",
    a: "Tak. Po sesji otrzymujesz instrukcję krok po kroku oraz indywidualne wskazówki, a dodatkowo zapewniam opiekę zdalną, dzięki której możesz bezpiecznie kontynuować praktykę w domu. Rozpoczęte cygara użyte podczas sesji zazwyczaj pozostają u Ciebie.",
  },
  {
    q: "Czy sesja może być w moim domu?",
    a: "Tak — sesje odbywają się mobilnie, w Twoim domu, w komfortowych warunkach. Przyjeżdżam z materiałami, akcesoriami i różnymi rodzajami moksy, abyś mógł/mogła sprawdzić, co najbardziej Ci odpowiada.",
  },
  {
    q: "Jakie są przeciwskazania?",
    a: "Moksa nie jest zalecana m.in. przy wysokiej gorączce, aktywnych infekcjach skórnych w miejscu ogrzewania, chorobach nowotworowych w trakcie leczenia, poważnych problemach z krążeniem. Kobiety w ciąży — wyłącznie po konsultacji z lekarzem i tylko w wybranych punktach. Nie wykonujemy moksy na uszkodzonej skórze lub nietypowych zmianach.",
  },
];

function FaqRow({ item, open, onToggle }) {
  return (
    <div className="border-b border-[#71797E]/12 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm sm:text-base font-medium text-[#333333] pr-4">{item.q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[#71797E] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-[#555555] leading-relaxed pr-8">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomeSectionFaq() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-28 bg-[#FAFAF5] scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#333333]"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Domowa Akademia Moksy
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-[#71797E]/12 bg-white px-4 sm:px-6"
        >
          {faqItems.map((item, i) => (
            <FaqRow
              key={item.q}
              item={item}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
