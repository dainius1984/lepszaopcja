import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { productBoxes } from "../../data/productBoxes";
import { openContactPopup } from "../../utils/openContactPopup";
import BoxDetailModal from "./BoxDetailModal";
import ImagePlaceholder from "./ImagePlaceholder";

export default function HomeSectionBoxes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeBoxId, setActiveBoxId] = useState(null);
  const activeBox = productBoxes.find((b) => b.id === activeBoxId) ?? null;

  const handlePurchaseBox = (box) => {
    openContactPopup({
      interest: box.id === "start-box" ? "box-start" : "box-premium",
      message: `Chcę zamówić ${box.name} (${box.price}). `,
    });
  };

  return (
    <>
      <section id="boxy" className="py-16 sm:py-20 md:py-28 bg-[#FAFAF5] scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
              Kontynuacja praktyki
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] mb-4"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Domowe Boxy
            </h2>
            <p className="text-[#555555] text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Podczas warsztatu możesz wybrać jeden z naszych praktycznych boxów, które pozwolą Ci od razu
              stosować moksa w domu — dla siebie lub dla bliskich. Każdy box jest przygotowany tak, aby
              korzystanie z moksy było bezpieczne, wygodne i skuteczne.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch mb-14">
            {productBoxes.map((box, i) => (
              <motion.div
                key={box.id}
                id={`box-${box.slug}`}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08 * i }}
                className="flex flex-col rounded-2xl border border-[#71797E]/12 bg-white p-6 sm:p-8 shadow-sm scroll-mt-20 md:scroll-mt-24"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <ImagePlaceholder label={`${box.name} — zdjęcie`} aspectClass="aspect-square sm:aspect-auto sm:min-h-[200px]" />
                  <div>
                    <h3
                      className="text-xl font-bold text-[#333333] mb-1"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      {box.name}
                    </h3>
                    <p className="text-lg font-semibold text-[#C4862A] mb-4">{box.price}</p>
                    <ol className="space-y-2 text-sm text-[#555555] list-decimal list-inside">
                      {box.shortItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => setActiveBoxId(box.id)}
                    className="flex-1 py-3 rounded-xl border border-[#71797E]/25 text-[#333333] text-sm font-medium hover:bg-[#71797E]/10 transition-colors"
                  >
                    Zobacz szczegóły {box.id === "start-box" ? "Start Box" : "Premium Box"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePurchaseBox(box)}
                    className="flex-1 py-3 rounded-xl bg-[#333333] text-[#F5F5DC] text-sm font-medium hover:bg-[#71797E] transition-colors text-center"
                  >
                    KUP {box.id === "start-box" ? "Start Box" : "Premium Box"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="rounded-2xl bg-[#71797E]/8 border border-[#71797E]/15 p-6 sm:p-8 max-w-3xl mx-auto"
          >
            <h3 className="text-sm font-semibold text-[#333333] mb-4 flex items-center gap-2">
              <Lightbulb className="text-[#C4862A]" size={18} />
              Jak to działa
            </h3>
            <ul className="space-y-3 text-sm text-[#555555] leading-relaxed">
              <li>Możesz dokupić box z wyprzedzeniem przed warsztatem lub zdecydować się podczas sesji.</li>
              <li>Po warsztacie box zostaje u Ciebie, gotowy do natychmiastowej praktyki w domu.</li>
              <li>Boxy komplementują warsztat, pozwalając kontynuować naukę i pomagać innym — bezpiecznie i wygodnie.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {activeBox && <BoxDetailModal box={activeBox} onClose={() => setActiveBoxId(null)} />}
    </>
  );
}
