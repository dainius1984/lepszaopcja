import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Zap, Flame, BookOpen } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Immune Fortification",
    description:
      "Regular moxibustion sessions stimulate Wei Qi — the body's protective energy — strengthening immune response and reducing vulnerability to illness.",
    accent: "#71797E",
  },
  {
    icon: Zap,
    title: "Pain Relief",
    description:
      "Heat penetrates deep into muscle tissue and joints, relieving chronic pain conditions including arthritis, lower back pain, and sports injuries.",
    accent: "#C4862A",
  },
  {
    icon: Flame,
    title: "Vitality & Energy",
    description:
      "By tonifying Yang energy and improving blood circulation, moxa effectively combats fatigue, cold extremities, and lack of motivation.",
    accent: "#71797E",
  },
  {
    icon: BookOpen,
    title: "Living Tradition",
    description:
      "Connecting with one of humanity's oldest healing arts carries profound wellbeing benefits — grounding, centering, and restoring mind-body harmony.",
    accent: "#C4862A",
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-28 bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
            Why Moxibustion
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#333333] mb-5"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            The Four Pillars
            <br />
            <span className="italic text-[#71797E]">of Healing</span>
          </h2>
          <p className="text-[#555555] text-lg max-w-xl mx-auto font-light leading-relaxed">
            Moxibustion addresses the whole person — body, energy, and spirit — through
            four principal areas of therapeutic action.
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
              className="group text-center p-8 rounded-3xl bg-white border border-[#71797E]/8 hover:border-[#71797E]/25 hover:shadow-lg transition-all duration-400"
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
            "Needle and moxa — between the two, there is no illness that cannot
            be addressed."
          </p>
          <cite className="block mt-4 text-xs uppercase tracking-widest text-[#555555]/60 not-italic">
            — Classical Chinese Medical Text, Huangdi Neijing
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
}
