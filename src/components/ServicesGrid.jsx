import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, Wind, Scroll, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Flame,
    title: "Direct Moxibustion",
    subtitle: "Traditional & Precise",
    description:
      "Moxa cones are placed directly on the skin at specific acupuncture points. This classical technique delivers concentrated heat to stimulate deep healing, often used for chronic conditions and cold-natured constitutional types.",
    benefits: ["Deep tissue warming", "Strong Qi activation", "Chronic pain relief"],
    duration: "60 min",
    price: "From 120 zł",
    image: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=600&auto=format&fit=crop",
  },
  {
    icon: Wind,
    title: "Indirect Moxibustion",
    subtitle: "Gentle & Versatile",
    description:
      "A slice of ginger, garlic, or salt is placed between the moxa cone and the skin, creating a comfortable buffer. This popular technique is ideal for sensitive patients and general wellness maintenance.",
    benefits: ["Comfortable warmth", "Ideal for beginners", "Full-body balance"],
    duration: "75 min",
    price: "From 100 zł",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop",
  },
  {
    icon: Scroll,
    title: "Moxa Cigar Therapy",
    subtitle: "Flexible & Relaxing",
    description:
      "A rolled moxa stick is held above acupuncture points without direct skin contact. This highly adaptable method allows treatment of larger body areas and is excellent for stress relief, pain management, and immune support.",
    benefits: ["No skin contact", "Large area coverage", "Deeply relaxing"],
    duration: "50 min",
    price: "From 85 zł",
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

  return (
    <section id="services" className="py-28 bg-[#F5F5DC]/40">
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
            Our Treatments
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#333333] mb-5"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Choose Your Path
            <br />
            <span className="italic text-[#71797E]">to Healing</span>
          </h2>
          <p className="text-[#555555] text-lg max-w-xl mx-auto font-light leading-relaxed">
            Each modality is carefully tailored to your constitution and
            therapeutic goals. Our practitioners guide you every step of the way.
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
              className="group bg-[#FAFAF5] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
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

              {/* Body */}
              <div className="p-7">
                <h3
                  className="text-xl font-bold text-[#333333] mb-3"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {service.title}
                </h3>
                <p className="text-[#555555] text-sm leading-relaxed mb-5 font-light">
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
                    <div className="text-xs text-[#555555] mb-0.5">Duration</div>
                    <div className="text-sm font-medium text-[#333333]">{service.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#555555] mb-0.5">Investment</div>
                    <div className="text-sm font-semibold text-[#71797E]">{service.price}</div>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#71797E]/30 text-[#71797E] text-sm font-medium hover:bg-[#71797E] hover:text-[#F5F5DC] transition-all duration-300 group/btn"
                >
                  Book This Session
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
