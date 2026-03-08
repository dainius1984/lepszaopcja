import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { meridians } from "../data/meridians";
import { getMeridianIcon } from "../utils/meridianIcons";

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.08 },
  }),
};

export default function TerapieMeridianowe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="meridiany" className="py-16 sm:py-20 md:py-28 bg-[#FAFAF5] scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
            Tradycyjna medycyna chińska
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] mb-5"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Terapie Meridianowe
            <br />
            <span className="italic text-[#71797E]">harmonizacja energii Chi</span>
          </h2>
          <p className="text-[#555555] text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Praca na dwunastu głównych meridianach w połączeniu z moksoterapią
            wspiera przepływ Qi i łagodzi objawy zgodnie z zasadami TCM. Wybierz
            meridian, który chcesz wesprzeć.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meridians.map((meridian, i) => {
            const IconComponent = getMeridianIcon(meridian.icon);
            return (
              <motion.div
                key={meridian.slug}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="group bg-[#FAFAF5] rounded-2xl overflow-hidden border border-[#71797E]/10 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                <Link
                  to={`/zabiegi/${meridian.slug}`}
                  className="p-6 flex flex-col flex-1 min-h-0"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#71797E]/10 flex items-center justify-center mb-4 group-hover:bg-[#71797E]/20 transition-colors">
                    <IconComponent size={22} className="text-[#71797E]" />
                  </div>
                  <h3
                    className="text-lg font-bold text-[#333333] mb-2"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {meridian.title}
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed flex-1 font-light">
                    {meridian.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[#71797E] text-sm font-medium group-hover:gap-3 transition-all">
                    Czytaj więcej
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
