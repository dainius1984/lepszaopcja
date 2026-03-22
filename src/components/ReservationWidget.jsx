import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Flame, Calendar, Clock } from "lucide-react";
import { useReservation } from "../context/ReservationContext";
import { getBookingLabelById, bookingSelectGroups } from "../data/bookingCatalog";
import { isAppwriteConfigured, createReservation, getBookedTimesForDate } from "../lib/appwrite";

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

/** Wyświetlanie daty po polsku (bez przesunięć UTC). */
function formatDatePlLong(iso) {
  if (!iso) return "";
  const parts = iso.split("-").map(Number);
  const y = parts[0];
  const m = parts[1];
  const day = parts[2];
  if (!y || !m || !day) return "";
  const dt = new Date(y, m - 1, day);
  const s = new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dt);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function ReservationWidget() {
  const { isOpen, closeWidget, preselectedCourseId, lockCourseSelection } =
    useReservation();
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
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

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
      setBookedSlots([]);
    }
  }, [isOpen]);

  // Pobierz zajęte godziny dla wybranej daty (tylko dni od dziś w przód)
  useEffect(() => {
    const date = formData.preferredDate?.trim();
    if (!date || date < todayISO()) {
      setBookedSlots([]);
      return;
    }
    let cancelled = false;
    setLoadingSlots(true);
    getBookedTimesForDate(date)
      .then((booked) => {
        if (!cancelled) setBookedSlots(booked);
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => { cancelled = true; };
  }, [formData.preferredDate]);

  const availableSlots = formData.preferredDate && formData.preferredDate >= todayISO()
    ? TIME_SLOTS.filter((t) => !bookedSlots.includes(t))
    : TIME_SLOTS;
  const isTimeDisabled = !formData.preferredDate || formData.preferredDate < todayISO();
  const selectedTimeNowBooked = formData.preferredTime && bookedSlots.includes(formData.preferredTime);

  useEffect(() => {
    if (selectedTimeNowBooked) {
      setFormData((prev) => ({ ...prev, preferredTime: "" }));
    }
  }, [selectedTimeNowBooked]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "preferredDate") next.preferredTime = "";
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const courseLabel =
        getBookingLabelById(formData.course) || formData.course || "Zabieg / wizyta";
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
        className="fixed inset-0 z-[100] flex items-center justify-center px-3 sm:px-4 py-4 bg-[#333333]/70 backdrop-blur-sm"
        onClick={closeWidget}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-sm sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAFAF5] shadow-xl border border-[#71797E]/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#71797E]/10 bg-[#FAFAF5]">
            <div className="min-w-0 pr-2">
              <h2
                className="text-xl font-bold text-[#333333]"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Rezerwacja
              </h2>
              {lockCourseSelection && preselectedCourseId && (
                <p className="mt-1 text-xs text-[#555555] leading-snug line-clamp-2">
                  {getBookingLabelById(preselectedCourseId)}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={closeWidget}
              className="p-2 rounded-full text-[#71797E] hover:bg-[#71797E]/10 hover:text-[#333333] transition-colors"
              aria-label="Zamknij"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-4 sm:px-5 pt-4 pb-6 sm:pb-8">
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
                  <div className="relative min-h-[3rem] rounded-xl border border-[#71797E]/20 bg-white shadow-sm transition-shadow scheme-light group focus-within:border-[#71797E] focus-within:ring-2 focus-within:ring-[#71797E]/15">
                    <input
                      type="date"
                      name="preferredDate"
                      required
                      min={todayISO()}
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="absolute inset-0 z-10 h-full min-h-[3rem] w-full cursor-pointer opacity-0 [color-scheme:light]"
                      aria-label="Wybierz datę wizyty"
                    />
                    <div className="pointer-events-none flex min-h-[3rem] w-full items-center justify-between gap-3 px-4 py-2.5">
                      <span
                        className={`text-sm leading-snug ${
                          formData.preferredDate
                            ? "font-medium text-[#333333]"
                            : "text-[#555555]/55"
                        }`}
                      >
                        {formData.preferredDate
                          ? formatDatePlLong(formData.preferredDate)
                          : "Wybierz datę wizyty"}
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#71797E]/10 text-[#71797E] group-focus-within:bg-[#71797E]/18">
                        <Calendar size={18} strokeWidth={1.75} />
                      </span>
                    </div>
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#71797E]/90 leading-relaxed">
                    Kliknij pole — otworzy się kalendarz. Wybrana data pokaże się po polsku.
                  </p>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium flex items-center gap-1.5">
                    <Clock size={12} />
                    Godzina (od 17:00) *
                  </label>
                  <div
                    className={`relative rounded-xl border border-[#71797E]/20 bg-white shadow-sm transition-shadow focus-within:border-[#71797E] focus-within:ring-2 focus-within:ring-[#71797E]/15 ${
                      isTimeDisabled ? "opacity-60" : ""
                    }`}
                  >
                    <select
                      name="preferredTime"
                      required
                      value={selectedTimeNowBooked ? "" : formData.preferredTime}
                      onChange={handleChange}
                      disabled={isTimeDisabled}
                      className="w-full appearance-none cursor-pointer rounded-xl bg-transparent py-3 pl-4 pr-12 text-sm text-[#333333] focus:outline-none disabled:cursor-not-allowed"
                    >
                    <option value="">
                      {isTimeDisabled
                        ? "Wybierz najpierw datę"
                        : loadingSlots
                          ? "Sprawdzam dostępność..."
                          : availableSlots.length === 0
                            ? "Brak wolnych godzin tego dnia"
                            : "Wybierz godzinę"}
                    </option>
                    {availableSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-[#71797E]/10 text-[#71797E]">
                      <Clock size={18} strokeWidth={1.75} />
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                    Szkolenie / usługa
                  </label>
                  {lockCourseSelection && formData.course ? (
                    <div className="rounded-xl border border-[#71797E]/25 bg-[#71797E]/5 px-4 py-3 text-sm text-[#333333]">
                      {getBookingLabelById(formData.course)}
                    </div>
                  ) : (
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20"
                    >
                      <option value="">Wybierz...</option>
                      {bookingSelectGroups.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.options.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.title}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  )}
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
