import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marta K.",
    role: "Yoga Teacher, Warsaw",
    avatar: "M",
    rating: 5,
    text: "After three sessions of indirect moxibustion for my chronic lower back pain, I noticed a remarkable improvement. The warmth penetrates in a way that no other therapy has managed. Absolutely transformative.",
  },
  {
    name: "Tomasz W.",
    role: "Software Engineer, Kraków",
    avatar: "T",
    rating: 5,
    text: "I was sceptical at first, but moxa cigar therapy completely changed my perspective on traditional medicine. My energy levels have improved significantly and I finally sleep through the night.",
  },
  {
    name: "Anna B.",
    role: "Physiotherapist, Gdańsk",
    avatar: "A",
    rating: 5,
    text: "I completed the Clinical Practitioner course and it's the best professional decision I've made. The instructors balance classical knowledge with modern evidence seamlessly. I now integrate moxa into my practice daily.",
  },
  {
    name: "Piotr M.",
    role: "Marathon Runner, Łódź",
    avatar: "P",
    rating: 5,
    text: "Post-injury recovery was much faster with regular moxibustion. The practitioner designed a protocol specifically for my knee condition and the results exceeded my physiotherapist's expectations.",
  },
  {
    name: "Karolina S.",
    role: "New Mother, Poznań",
    avatar: "K",
    rating: 5,
    text: "Moxa for postpartum recovery was a true blessing. Gentle, nurturing, and incredibly effective for rebuilding my vitality after birth. I recommend Moksy to every new mother I meet.",
  },
  {
    name: "Dr. Rafał N.",
    role: "GP & Integrative Medicine, Wrocław",
    avatar: "R",
    rating: 5,
    text: "As a medical professional, I was impressed by the rigour of the Foundation course. The team's approach is grounded, ethical, and clinically coherent. I now confidently refer patients.",
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

  const visibleCount = 3;
  const maxIdx = testimonials.length - visibleCount;

  const prev = () => setActiveIdx((i) => Math.max(0, i - 1));
  const next = () => setActiveIdx((i) => Math.min(maxIdx, i + 1));
  const visible = testimonials.slice(activeIdx, activeIdx + visibleCount);

  return (
    <section className="py-28 bg-[#F5F5DC]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
              Client Stories
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#333333]"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Voices of
              <br />
              <span className="italic text-[#71797E]">Transformation</span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
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
