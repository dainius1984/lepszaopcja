import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Calendar } from "lucide-react";
import { useReservation } from "../../context/ReservationContext";

export default function SessionDetailModal({ session, onClose }) {
  const { openWidget } = useReservation();

  useEffect(() => {
    if (!session) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [session, onClose]);

  if (!session) return null;

  const handleBook = () => {
    onClose();
    openWidget(session.id);
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
              <p className="text-xs uppercase tracking-widest text-[#71797E] font-medium mb-1">
                Pakiet {session.order}
              </p>
              <h2
                className="text-xl sm:text-2xl font-bold text-[#333333] leading-tight"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {session.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-[#555555]">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#71797E]" />
                  {session.duration}
                </span>
                <span className="font-semibold text-[#C4862A]">{session.price}</span>
              </div>
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

          <div className="px-5 py-5 space-y-5">
            <p className="text-[#555555] text-sm leading-relaxed">{session.summary}</p>
            <div>
              <h3 className="text-sm font-semibold text-[#333333] mb-3">W programie</h3>
              <ul className="space-y-2.5">
                {session.bullets.map((line) => (
                  <li key={line} className="flex gap-2.5 text-sm text-[#555555] leading-relaxed">
                    <Check size={16} className="text-[#71797E] shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleBook}
                className="flex-1 py-3.5 rounded-xl bg-[#333333] text-[#F5F5DC] text-sm font-medium hover:bg-[#71797E] transition-colors"
              >
                {session.reserveLabel}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3.5 px-4 rounded-xl border border-[#71797E]/30 text-[#555555] text-sm font-medium hover:bg-[#71797E]/10 transition-colors"
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
