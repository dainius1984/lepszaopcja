import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { openContactPopup } from "../../utils/openContactPopup";

export default function BoxDetailModal({ box, onClose }) {
  useEffect(() => {
    if (!box) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [box, onClose]);

  if (!box) return null;

  const handlePurchase = () => {
    onClose();
    openContactPopup({
      interest: box.id === "start-box" ? "box-start" : "box-premium",
      message: `Chcę zamówić ${box.name} (${box.price}). `,
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-4 bg-[#333333]/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAFAF5] shadow-xl border border-[#71797E]/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-start justify-between gap-3 px-5 py-4 border-b border-[#71797E]/10 bg-[#FAFAF5]">
            <div className="min-w-0">
              <h2
                className="text-xl sm:text-2xl font-bold text-[#333333] leading-tight"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {box.name}
              </h2>
              <p className="text-sm text-[#555555] mt-1">{box.tagline}</p>
              <p className="text-lg font-semibold text-[#C4862A] mt-2">{box.price}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-[#71797E] hover:bg-[#71797E]/10 shrink-0"
              aria-label="Zamknij"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-5 py-5 space-y-6">
            <p className="text-[#555555] text-sm leading-relaxed">{box.detailIntro}</p>
            {box.detailSections.map((sec) => (
              <div key={sec.title}>
                <h3 className="text-sm font-semibold text-[#333333] mb-2">{sec.title}</h3>
                <ul className="space-y-2">
                  {sec.bullets.map((b) => (
                    <li key={b} className="text-sm text-[#555555] leading-relaxed pl-3 border-l-2 border-[#71797E]/20">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="rounded-xl bg-[#71797E]/8 border border-[#71797E]/15 p-4">
              <p className="text-xs uppercase tracking-wider text-[#71797E] font-medium mb-1">
                Dlaczego warto
              </p>
              <p className="text-sm text-[#555555] leading-relaxed">{box.why}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={handlePurchase}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#333333] text-[#F5F5DC] text-sm font-medium hover:bg-[#71797E] transition-colors"
              >
                <MessageCircle size={16} />
                Zamów
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center py-3.5 px-4 rounded-xl border border-[#71797E]/30 text-[#555555] text-sm font-medium hover:bg-[#71797E]/10 transition-colors"
              >
                Zamknij
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
