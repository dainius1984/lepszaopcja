import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Stimulates acupuncture points with focused warmth",
  "Enhances Qi flow and blood circulation",
  "Safe, non-invasive, and deeply relaxing",
  "Backed by centuries of clinical tradition",
];

export default function AboutMoxa() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
              Ancient Wisdom
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#333333] leading-tight mb-6"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              What Is
              <br />
              <span className="italic text-[#71797E]">Moxibustion?</span>
            </h2>
            <p className="text-[#555555] text-lg leading-relaxed mb-5 font-light">
              Moxibustion (moksa) is a form of heat therapy rooted in Traditional
              Chinese Medicine (TCM). It involves burning dried mugwort — called
              moxa — near or on specific acupuncture points to warm and invigorate
              the flow of Qi, the body's vital energy.
            </p>
            <p className="text-[#555555] text-base leading-relaxed mb-8 font-light">
              Used for over 3,000 years across Asia, moxibustion addresses a wide
              range of conditions — from chronic pain and digestive disorders to
              fatigue, fertility support, and immune strengthening. Our
              practitioners blend classical knowledge with modern clinical
              understanding for transformative results.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#71797E] mt-0.5 shrink-0" />
                  <span className="text-[#555555] text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#333333] text-[#F5F5DC] text-sm font-medium hover:bg-[#555555] transition-colors duration-300"
            >
              Explore Treatments
            </a>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&auto=format&fit=crop"
                alt="Moxibustion therapy being performed"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/30 to-transparent" />
            </div>

            {/* Floating accent card */}
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
                Years of documented therapeutic use worldwide
              </div>
            </motion.div>

            {/* Decorative ring */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-[#71797E]/20 pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full border border-[#71797E]/30 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
