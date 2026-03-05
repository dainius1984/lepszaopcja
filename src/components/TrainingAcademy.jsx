import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, Users, Award, ArrowRight } from "lucide-react";

const courses = [
  {
    level: "Foundation",
    title: "Introduction to Moxibustion",
    description:
      "A comprehensive beginner course covering the theory of TCM, meridian systems, moxa safety, and practical application of all three primary techniques.",
    date: "April 12–13, 2026",
    duration: "2 days (16 hrs)",
    spots: "8 spots left",
    price: "890 zł",
    badge: "Popular",
    badgeColor: "bg-[#71797E] text-[#F5F5DC]",
  },
  {
    level: "Advanced",
    title: "Clinical Moxibustion Practitioner",
    description:
      "Deep dive into condition-specific protocols, patient assessment frameworks, contraindications, and integrating moxa into existing clinical practice.",
    date: "May 17–19, 2026",
    duration: "3 days (24 hrs)",
    spots: "5 spots left",
    price: "1,490 zł",
    badge: "New",
    badgeColor: "bg-[#C4862A] text-white",
  },
  {
    level: "Specialist",
    title: "Moxa for Women's Health",
    description:
      "Focused module on gynaecological applications — menstrual irregularities, fertility support, and peri/post-natal care using classical and contemporary protocols.",
    date: "June 7–8, 2026",
    duration: "2 days (16 hrs)",
    spots: "10 spots left",
    price: "990 zł",
    badge: null,
    badgeColor: "",
  },
];

export default function TrainingAcademy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="training" className="py-28 bg-[#333333] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F5DC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
            Moksy Academy
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#F5F5DC] mb-5"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Become a Certified
            <br />
            <span className="italic text-[#D4A24A]">Moxa Practitioner</span>
          </h2>
          <p className="text-[#F5F5DC]/60 text-lg max-w-xl mx-auto font-light leading-relaxed">
            Our academy offers internationally recognised training that bridges
            ancient wisdom with modern therapeutic practice. All courses include
            hands-on clinical hours.
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
            { icon: Award, text: "TCM Accredited" },
            { icon: Users, text: "Small Groups (max 12)" },
            { icon: Award, text: "Certificate Issued" },
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
                <a
                  href="#contact"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#71797E]/40 text-[#F5F5DC]/80 text-sm hover:bg-[#71797E] hover:text-[#F5F5DC] hover:border-[#71797E] transition-all duration-300 group/btn"
                >
                  Learn More
                  <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
                </a>
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
            Not sure which course is right for you?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#71797E] hover:text-[#8E9A9F] text-sm font-medium underline underline-offset-4 transition-colors"
          >
            Request a free consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
