import { motion } from "framer-motion";
import { ArrowDown, CalendarDays } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background placeholder with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1800&auto=format&fit=crop')",
        }}
        aria-hidden="true"
      />
      {/* Layered overlay for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#333333]/80 via-[#333333]/60 to-[#71797E]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/70 via-transparent to-transparent" />

      {/* Decorative warm glow */}
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#C4862A]/10 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#F5F5DC]/30 text-[#F5F5DC]/80 text-xs uppercase tracking-widest font-medium"
        >
          Traditional Chinese Medicine
        </motion.span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#F5F5DC] leading-tight mb-6"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Heal from Within.
          <br />
          <span className="italic text-[#D4A24A]">The Ancient Power</span>
          <br />
          of Sacred Heat.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.45}
          className="text-lg md:text-xl text-[#F5F5DC]/75 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Rooted in thousands of years of traditional Chinese medicine,
          moxibustion harnesses the transformative energy of heat to restore
          balance, vitality, and deep inner harmony.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="group px-8 py-4 rounded-full bg-[#71797E] text-[#F5F5DC] font-medium text-base hover:bg-[#5A6468] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Book a Session
          </a>
          <a
            href="#training"
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#F5F5DC]/40 text-[#F5F5DC] font-medium text-base hover:bg-[#F5F5DC]/10 transition-all duration-300"
          >
            <CalendarDays size={16} />
            Explore Courses
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { number: "15+", label: "Years of Practice" },
            { number: "2,000+", label: "Clients Treated" },
            { number: "300+", label: "Certified Students" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-bold text-[#D4A24A] mb-1"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {stat.number}
              </div>
              <div className="text-xs text-[#F5F5DC]/60 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F5F5DC]/50 hover:text-[#F5F5DC]/80 transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">Discover</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
