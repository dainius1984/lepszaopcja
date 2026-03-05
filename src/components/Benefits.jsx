import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Zap, Flame, BookOpen } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Wzmocnienie odporności",
    description:
      "Regularne zabiegi moksy pobudzają Wei Qi — energię obronną organizmu — wzmacniając odpowiedź immunologiczną i zmniejszając podatność na infekcje.",
    accent: "#71797E",
  },
  {
    icon: Zap,
    title: "Ulgę w bólu",
    description:
      "Ciepło wnika głęboko w mięśnie i stawy, łagodząc ból przewlekły, m.in. w artretyzmie, bólu krzyża i kontuzjach sportowych.",
    accent: "#C4862A",
  },
  {
    icon: Flame,
    title: "Witalność i energia",
    description:
      "Tonizując energię Yang i poprawiając krążenie krwi, moksa skutecznie wspiera przy zmęczeniu, zimnych kończynach i spadku motywacji.",
    accent: "#71797E",
  },
  {
    icon: BookOpen,
    title: "Żywa tradycja",
    description:
      "Kontakt z jedną z najstarszych sztuk uzdrawiania przynosi głęboki dobrostan — ugruntowanie, wyciszenie i przywrócenie harmonii ciała i umysłu.",
    accent: "#C4862A",
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#FAFAF5]">
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
            Dlaczego moksoterapia
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] mb-5"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Cztery filary
            <br />
            <span className="italic text-[#71797E]">uzdrowienia</span>
          </h2>
          <p className="text-[#555555] text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Moksoterapia oddziałuje na całą osobę — ciało, energię i ducha — przez
            cztery główne obszary działania terapeutycznego.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group text-center p-6 sm:p-8 rounded-3xl bg-white border border-[#71797E]/8 hover:border-[#71797E]/25 hover:shadow-lg transition-all duration-400"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${benefit.accent}15` }}
              >
                <benefit.icon size={28} style={{ color: benefit.accent }} />
              </div>

              <h3
                className="text-lg font-bold text-[#333333] mb-3"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {benefit.title}
              </h3>
              <p className="text-[#555555] text-sm leading-relaxed font-light">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-center mt-20 max-w-2xl mx-auto"
        >
          <p
            className="text-xl md:text-2xl text-[#71797E] italic leading-relaxed"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            „Igła i moksa — między nimi nie ma choroby, której nie można by
            uleczyć."
          </p>
          <cite className="block mt-4 text-xs uppercase tracking-widest text-[#555555]/60 not-italic">
            — Klasyczny tekst medycyny chińskiej, Huangdi Neijing
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
}
