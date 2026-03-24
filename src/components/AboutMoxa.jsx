import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const helpsWith = [
  "bólach przewlekłych i napięciach mięśni",
  "zaburzeniach trawienia i zmęczeniu",
  "wsparciu płodności i odporności",
];

const korzysci = [
  "Pobudza punkty akupunkturowe ciepłem",
  "Wspiera przepływ Qi i krążenie krwi",
  "Bezpieczna, nieinwazyjna i relaksująca",
  "Oparta na wiekach tradycji i doświadczenia klinicznego",
];

export default function AboutMoxa() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 bg-[#FAFAF5] scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
              Starożytna mądrość
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] leading-tight mb-6"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Czym jest
              <br />
              <span className="italic text-[#71797E]">moksoterapia?</span>
            </h2>
            <p className="text-[#555555] text-base sm:text-lg leading-relaxed mb-5 font-light">
              Moksoterapia (moksa) to terapia ciepłem wywodząca się z tradycyjnej medycyny chińskiej (TCM).
              Polega na delikatnym przygrzewaniu punktów akupunkturowych suszonym bylicą — moksą — aby pobudzić
              przepływ Qi, czyli życiowej energii organizmu.
            </p>
            <p className="text-[#555555] text-sm sm:text-base leading-relaxed mb-4 font-light">
              Stosowana od ponad 3000 lat w Azji, moksoterapia pomaga przy:
            </p>
            <ul className="space-y-2 mb-8">
              {helpsWith.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#555555]">
                  <span className="text-[#C4862A] mt-0.5">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[#555555] text-sm sm:text-base leading-relaxed mb-8 font-light">
              Łączymy klasyczną wiedzę z nowoczesnym podejściem klinicznym, aby terapia była bezpieczna,
              skuteczna i głęboko relaksująca.
            </p>

            <p className="text-xs uppercase tracking-wider text-[#71797E] font-semibold mb-3">Korzyści</p>
            <ul className="space-y-3 mb-10">
              {korzysci.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#71797E] mt-0.5 shrink-0" />
                  <span className="text-[#555555] text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#korzysci"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#333333] text-[#F5F5DC] text-sm font-medium hover:bg-[#555555] transition-colors duration-300"
            >
              Poznaj korzyści dla siebie
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl bg-[#71797E]/10">
              <img
                src="/img/2.jpg"
                alt="Moksoterapia — cygaro moksy przy łokciu"
                className="w-full h-full object-cover"
                width={900}
                height={1125}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/30 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-[#F5F5DC] rounded-2xl p-5 shadow-xl max-w-[200px]"
            >
              <div
                className="text-3xl font-bold text-[#71797E] mb-1"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                3,000+
              </div>
              <div className="text-xs text-[#555555] leading-snug">
                Lat tradycji moksoterapii
              </div>
            </motion.div>

            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-[#71797E]/20 pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full border border-[#71797E]/30 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
