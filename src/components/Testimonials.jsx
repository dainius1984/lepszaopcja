import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marta K.",
    role: "Nauczycielka jogi, Warszawa",
    avatar: "M",
    rating: 5,
    text: "Po trzech sesjach moksy pośredniej przy przewlekłym bólu krzyża odczułam wyraźną poprawę. Ciepło wnika w sposób, w jaki nie udało się żadnej innej terapii. Absolutnie przełomowe.",
  },
  {
    name: "Tomasz W.",
    role: "Inżynier oprogramowania, Kraków",
    avatar: "T",
    rating: 5,
    text: "Na początku byłem sceptyczny, ale terapia cygarem moksowym całkowicie zmieniła mój pogląd na medycynę tradycyjną. Poziom energii wyraźnie wzrósł, wreszcie śpię przez całą noc.",
  },
  {
    name: "Anna B.",
    role: "Fizjoterapeutka, Gdańsk",
    avatar: "A",
    rating: 5,
    text: "Ukończyłam kurs praktyki klinicznej — to najlepsza decyzja zawodowa. Prowadzący łączą wiedzę klasyczną z nowoczesnym podejściem. Dziś stosuję moksę w praktyce na co dzień.",
  },
  {
    name: "Piotr M.",
    role: "Maratończyk, Łódź",
    avatar: "P",
    rating: 5,
    text: "Powrót do formy po kontuzji był znacznie szybszy dzięki regularnej moksoterapii. Terapeuta ułożył protokół pod moje kolano — rezultaty przerosły oczekiwania fizjoterapeuty.",
  },
  {
    name: "Karolina S.",
    role: "Młoda mama, Poznań",
    avatar: "K",
    rating: 5,
    text: "Moksa po porodzie to prawdziwe błogosławieństwo. Delikatna, wspierająca i niezwykle skuteczna w odbudowie sił. Polecam Moksy każdej młodej mamie.",
  },
  {
    name: "Dr Rafał N.",
    role: "Lekarz POZ, medycyna integracyjna, Wrocław",
    avatar: "R",
    rating: 5,
    text: "Jako lekarz doceniam poziom kursu podstawowego. Podejście zespołu jest merytoryczne, etyczne i spójne klinicznie. Z czystym sumieniem kieruję pacjentów.",
  },
];

function StarRow({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="text-[#C4862A] fill-[#C4862A]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIdx = Math.max(0, testimonials.length - visibleCount);

  const prev = () => setActiveIdx((i) => Math.max(0, i - 1));
  const next = () => setActiveIdx((i) => Math.min(maxIdx, i + 1));
  const visible = testimonials.slice(activeIdx, activeIdx + visibleCount);

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#F5F5DC]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
              Opinie
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333]"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Głosy
              <br />
              <span className="italic text-[#71797E]">transformacji</span>
            </h2>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              disabled={activeIdx === 0}
              className="w-11 h-11 rounded-full border border-[#71797E]/30 flex items-center justify-center text-[#71797E] hover:bg-[#71797E] hover:text-[#F5F5DC] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={activeIdx >= maxIdx}
              className="w-11 h-11 rounded-full border border-[#71797E]/30 flex items-center justify-center text-[#71797E] hover:bg-[#71797E] hover:text-[#F5F5DC] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
          {visible.map((t, i) => (
            <motion.div
              key={t.name + activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#FAFAF5] rounded-3xl p-7 shadow-sm relative"
            >
              <Quote
                size={32}
                className="absolute top-6 right-7 text-[#71797E]/10"
              />
              <StarRow count={t.rating} />
              <p className="mt-4 mb-7 text-[#555555] text-sm leading-relaxed font-light italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-[#71797E]/10">
                <div className="w-10 h-10 rounded-full bg-[#71797E] flex items-center justify-center text-[#F5F5DC] font-semibold text-sm shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#333333]">{t.name}</div>
                  <div className="text-xs text-[#555555]/60">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === activeIdx ? "bg-[#71797E] w-6" : "bg-[#71797E]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
