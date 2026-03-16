import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, Users, Award, ArrowRight } from "lucide-react";
import { courses } from "../data/courses";
import { useReservation } from "../context/ReservationContext";

export default function TrainingAcademy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { openWidget } = useReservation();

  return (
    <section id="training" className="py-16 sm:py-20 md:py-28 bg-[#333333] relative overflow-hidden scroll-mt-20 md:scroll-mt-24">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F5DC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
            Akademia Moksy
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5DC] mb-5"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Szkolenia praktyczne
            <br />
            <span className="italic text-[#D4A24A]">z moksoterapii</span>
          </h2>
          <p className="text-[#F5F5DC]/60 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Oferujemy szkolenia łączące tradycyjną wiedzę z nowoczesną praktyką
            terapeutyczną. W programie zajęcia teoretyczne i praktyka.
          </p>
        </motion.div>

        {/* Accreditation badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {[
            { icon: Award, text: "W oparciu o TCM" },
            { icon: Users, text: "Małe grupy (max 12)" },
            { icon: Award, text: "Potwierdzenie ukończenia" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-[#F5F5DC]/50 text-sm">
              <item.icon size={15} className="text-[#71797E]" />
              {item.text}
            </div>
          ))}
        </motion.div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative bg-[#FAFAF5]/5 border border-[#F5F5DC]/10 rounded-3xl p-7 hover:bg-[#FAFAF5]/10 transition-all duration-400 group"
            >
              {course.badge && (
                <span className={`absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-medium ${course.badgeColor}`}>
                  {course.badge}
                </span>
              )}

              <span className="inline-block mb-3 text-xs uppercase tracking-widest text-[#71797E] font-medium">
                {course.level}
              </span>
              <h3
                className="text-xl font-bold text-[#F5F5DC] mb-3 leading-tight"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {course.title}
              </h3>
              <p className="text-[#F5F5DC]/55 text-sm leading-relaxed mb-6 font-light">
                {course.description}
              </p>

              <div className="space-y-2.5 mb-7">
                <div className="flex items-center gap-2.5 text-sm text-[#F5F5DC]/60">
                  <Calendar size={14} className="text-[#71797E] shrink-0" />
                  {course.date}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#F5F5DC]/60">
                  <Clock size={14} className="text-[#71797E] shrink-0" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#F5F5DC]/60">
                  <Users size={14} className="text-[#71797E] shrink-0" />
                  {course.spots}
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-[#F5F5DC]/10">
                <span
                  className="text-xl font-bold text-[#D4A24A]"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {course.price}
                </span>
                <button
                  type="button"
                  onClick={() => openWidget(course.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#71797E]/40 text-[#F5F5DC]/80 text-sm hover:bg-[#71797E] hover:text-[#F5F5DC] hover:border-[#71797E] transition-all duration-300 group/btn whitespace-nowrap"
                >
                  Zarezerwuj miejsce
                  <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-0.5 shrink-0" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-[#F5F5DC]/40 text-sm mb-4">
            Nie wiesz, który kurs wybrać?
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-contact-popup"))}
            className="inline-flex items-center gap-2 text-[#F5F5DC]/80 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
          >
            Zapytaj o bezpłatną konsultację
          </button>
        </motion.div>
      </div>
    </section>
  );
}
