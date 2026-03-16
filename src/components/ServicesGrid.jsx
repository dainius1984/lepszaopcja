import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Flame, Wind, Scroll, ArrowRight } from "lucide-react";
import { useReservation } from "../context/ReservationContext";

const services = [
  {
    icon: Flame,
    title: "Moksoterapia bezpośrednia",
    subtitle: "Tradycyjna i precyzyjna",
    description:
      "Stożki moksy ustawiane są bezpośrednio na skórze w punktach akupunkturowych. Ta klasyczna technika dostarcza skupione ciepło i pobudza głęboką regenerację; polecana przy dolegliwościach przewlekłych i konstytucji „zimnej”.",
    benefits: ["Głębokie rozgrzanie tkanek", "Silna aktywacja Qi", "Ulgę w bólu przewlekłym"],
    duration: "60 min",
    price: "od 120 zł",
    image: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=600&auto=format&fit=crop",
  },
  {
    icon: Wind,
    title: "Moksoterapia pośrednia",
    subtitle: "Delikatna i uniwersalna",
    description:
      "Plasterek imbiru, czosnku lub sól umieszcza się między stożkiem moksy a skórą, tworząc przyjemny bufor. Ta popularna technika idealna jest dla wrażliwych pacjentów i ogólnego wsparcia zdrowia.",
    benefits: ["Przyjemne ciepło", "Idealna na początek", "Równowaga całego ciała"],
    duration: "75 min",
    price: "od 100 zł",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop",
  },
  {
    icon: Scroll,
    title: "Terapia cygarem moksowym",
    subtitle: "Elastyczna i relaksująca",
    description:
      "Zwinięty cygar moksowy trzymany jest nad punktami akupunkturowymi bez kontaktu ze skórą. Ta uniwersalna metoda pozwala na pracę na większych obszarach; doskonała przy stresie, bólu i wsparciu odporności.",
    benefits: ["Bez kontaktu ze skórą", "Duży obszar zabiegu", "Głęboki relaks"],
    duration: "50 min",
    price: "od 85 zł",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&auto=format&fit=crop",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.15 },
  }),
};

export default function ServicesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { openWidget } = useReservation();

  return (
    <section id="services" className="py-16 sm:py-20 md:py-28 bg-[#F5F5DC]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
            Nasze zabiegi
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] mb-5"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Wybierz ścieżkę
            <br />
            <span className="italic text-[#71797E]">do uzdrowienia</span>
          </h2>
          <p className="text-[#555555] text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Każda metoda jest dopasowana do Twojej konstytucji i celów
            terapeutycznych. Nasi praktycy poprowadzą Cię krok po kroku.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group bg-[#FAFAF5] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#71797E] flex items-center justify-center">
                    <service.icon size={14} className="text-[#F5F5DC]" />
                  </div>
                  <span className="text-[#F5F5DC]/80 text-xs font-medium">
                    {service.subtitle}
                  </span>
                </div>
              </div>

              {/* Body — flex żeby przycisk zawsze na dole */}
              <div className="p-7 flex flex-col flex-1 min-h-0">
                <h3
                  className="text-xl font-bold text-[#333333] mb-3"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {service.title}
                </h3>
                <p className="text-[#555555] text-sm leading-relaxed mb-5 font-light flex-1">
                  {service.description}
                </p>

                <ul className="space-y-1.5 mb-6">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-[#71797E]">
                      <span className="w-1 h-1 rounded-full bg-[#71797E]" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-[#71797E]/10">
                  <div>
                    <div className="text-xs text-[#555555] mb-0.5">Czas</div>
                    <div className="text-sm font-medium text-[#333333]">{service.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#555555] mb-0.5">Cena</div>
                    <div className="text-sm font-semibold text-[#71797E]">{service.price}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openWidget()}
                  className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#71797E]/30 text-[#71797E] text-sm font-medium hover:bg-[#71797E] hover:text-[#F5F5DC] transition-all duration-300 group/btn shrink-0"
                >
                  Umów zabieg
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
