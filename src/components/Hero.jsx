import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, CalendarDays } from "lucide-react";
import { useReservation } from "../context/ReservationContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay },
  }),
};

export default function Hero() {
  const { openWidget } = useReservation();
  const [activeVideo, setActiveVideo] = useState(1);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  const handleVideo1Ended = useCallback(() => {
    if (video1Ref.current) video1Ref.current.pause();
    setActiveVideo(2);
    if (video2Ref.current) {
      video2Ref.current.currentTime = 0;
      video2Ref.current.play();
    }
  }, []);

  const handleVideo2Ended = useCallback(() => {
    if (video2Ref.current) video2Ref.current.pause();
    setActiveVideo(1);
    if (video1Ref.current) {
      video1Ref.current.currentTime = 0;
      video1Ref.current.play();
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 sm:pt-14 md:pt-0 scroll-mt-0"
    >
      {/* Background videos — płynny crossfade + lekkie rozmycie */}
      <div className="absolute inset-0 [filter:blur(2px)] scale-105">
        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          onEnded={handleVideo1Ended}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ opacity: activeVideo === 1 ? 1 : 0, zIndex: activeVideo === 1 ? 1 : 0 }}
          aria-hidden="true"
        >
          <source src="/video/1.mp4" type="video/mp4" />
        </video>
        <video
          ref={video2Ref}
          muted
          playsInline
          onEnded={handleVideo2Ended}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ opacity: activeVideo === 2 ? 1 : 0, zIndex: activeVideo === 2 ? 1 : 0 }}
          aria-hidden="true"
        >
          <source src="/video/2.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Mocniejszy overlay — wideo bardziej w tle */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#333333]/85 via-[#333333]/70 to-[#71797E]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/75 via-[#333333]/20 to-transparent" />

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
          Tradycyjna Medycyna Chińska
        </motion.span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F5F5DC] leading-tight mb-6"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Uzdrowienie od środka.
          <br />
          <span className="italic text-[#D4A24A]">Starożytna moc</span>
          <br />
          świętego ciepła.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.45}
          className="text-base sm:text-lg md:text-xl text-[#F5F5DC]/75 max-w-2xl mx-auto mb-10 leading-relaxed font-light px-2"
        >
          Zakorzeniona w tysiącach lat tradycji medycyny chińskiej, moksoterapia
          wykorzystuje leczniczą energię ciepła, by przywrócić równowagę, witalność i
          głęboką harmonię całego ciała.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#akademia"
            className="group px-8 py-4 rounded-full bg-[#71797E] text-[#F5F5DC] font-medium text-base hover:bg-[#5A6468] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center"
          >
            Umów sesję
          </a>
          <button
            type="button"
            onClick={() => openWidget()}
            className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-full border border-[#F5F5DC]/40 text-[#F5F5DC] font-medium text-sm sm:text-base hover:bg-[#F5F5DC]/10 transition-all duration-300"
          >
            <CalendarDays size={16} />
            Szybka rezerwacja
          </button>
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
        <span className="text-xs uppercase tracking-widest">Odkryj</span>
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
