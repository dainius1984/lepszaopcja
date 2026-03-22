import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqPdfItems } from "../../data/faqPdf";

function FaqRow({ item, open, onToggle }) {
  return (
    <div className="border-b border-[#71797E]/12 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm sm:text-base font-medium text-[#333333] pr-4">{item.q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[#71797E] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pr-8 text-sm text-[#555555] leading-relaxed whitespace-pre-line">
              {item.a}
              {item.linkAfter && (
                <>
                  {" "}
                  <a
                    href={item.linkAfter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#71797E] underline underline-offset-2 hover:text-[#333333] break-all"
                  >
                    {item.linkAfter}
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomeSectionFaq() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-28 bg-[#FAFAF5] scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#333333]"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Domowa Akademia Moksy
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-[#71797E]/12 bg-white px-4 sm:px-6"
        >
          {faqPdfItems.map((item, i) => (
            <FaqRow
              key={item.id}
              item={item}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
