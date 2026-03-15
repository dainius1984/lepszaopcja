import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Flame, Calendar, Clock } from "lucide-react";
import { useReservation } from "../context/ReservationContext";
import { courses } from "../data/courses";
import { isAppwriteConfigured, createReservation } from "../lib/appwrite";

// Godziny co 30 min od 17:00 do 20:30 (17:00, 17:30, 18:00, …, 20:30)
const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = 17; h <= 20; h++) {
    const pad = (n) => String(n).padStart(2, "0");
    slots.push(`${pad(h)}:00`, `${pad(h)}:30`);
  }
  return slots;
})();

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export default function ReservationWidget() {
  const { isOpen, closeWidget, preselectedCourseId } = useReservation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: preselectedCourseId,
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      course: preselectedCourseId || prev.course,
    }));
  }, [preselectedCourseId]);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError(null);
    }
  }, [isOpen]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const courseLabel =
        courses.find((c) => c.id === formData.course)?.title ||
        formData.course ||
        "Zabieg / wizyta";
      await createReservation({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: courseLabel,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message,
      });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
    } catch (err) {
      setError(
        err?.message ||
          "Nie udało się zapisać rezerwacji. Sprawdź dane lub skontaktuj się z nami."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const configured = isAppwriteConfigured();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#333333]/70 backdrop-blur-sm"
        onClick={closeWidget}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAFAF5] shadow-xl border border-[#71797E]/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-[#71797E]/10 bg-[#FAFAF5]">
            <h2
              className="text-xl font-bold text-[#333333]"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Rezerwacja
            </h2>
            <button
              type="button"
              onClick={closeWidget}
              className="p-2 rounded-full text-[#71797E] hover:bg-[#71797E]/10 hover:text-[#333333] transition-colors"
              aria-label="Zamknij"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-5 pb-8">
            {!configured ? (
              <p className="text-[#555555] text-sm py-4">
                Konfiguracja Appwrite brakuje. Uzupełnij zmienne w pliku .env.
              </p>
            ) : submitted ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#71797E]/15 flex items-center justify-center mx-auto mb-4">
                  <Flame size={26} className="text-[#71797E]" />
                </div>
                <p className="text-lg font-bold text-[#333333] mb-2">
                  Rezerwacja zapisana
                </p>
                <p className="text-[#555555] text-sm mb-6">
                  Skontaktujemy się w celu potwierdzenia terminu.
                </p>
                <button
                  type="button"
                  onClick={closeWidget}
                  className="px-5 py-2.5 rounded-full bg-[#71797E] text-[#F5F5DC] text-sm font-medium hover:bg-[#5A6468] transition-colors"
                >
                  Zamknij
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jan Kowalski"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm placeholder:text-[#555555]/50 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jan@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm placeholder:text-[#555555]/50 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+48 123 456 789"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm placeholder:text-[#555555]/50 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium flex items-center gap-1.5">
                    <Calendar size={12} />
                    Data *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    required
                    min={todayISO()}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium flex items-center gap-1.5">
                    <Clock size={12} />
                    Godzina (od 17:00) *
                  </label>
                  <select
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20"
                  >
                    <option value="">Wybierz godzinę</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                    Szkolenie / usługa
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20"
                  >
                    <option value="">Wybierz...</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                    <option value="zabieg">Zabieg moksoterapii (wizyta)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                    Wiadomość
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Dodatkowe informacje..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm placeholder:text-[#555555]/50 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#333333] text-[#F5F5DC] font-medium text-sm hover:bg-[#71797E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Zapisywanie..." : (
                    <>
                      <Send size={16} />
                      Wyślij rezerwację
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
