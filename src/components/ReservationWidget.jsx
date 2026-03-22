import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Flame, Calendar, Clock, ImageIcon } from "lucide-react";
import { useReservation } from "../context/ReservationContext";
import {
  getBookingLabelById,
  bookingSelectGroups,
  isAcademySessionCourseId,
} from "../data/bookingCatalog";
import { reservationBoxOptionsForWidget } from "../data/reservationBoxChoices";
import { openContactPopup } from "../utils/openContactPopup";
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
    boxChoice: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const dateInputRef = useRef(null);

  const openDatePicker = () => {
    const el = dateInputRef.current;
    if (!el) return;
    try {
      if (typeof el.showPicker === "function") {
        el.showPicker();
        return;
      }
    } catch {
      /* showPicker może rzucić, jeśli nie z gestu użytkownika — fallback poniżej */
    }
    el.focus();
    el.click();
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      course: preselectedCourseId || prev.course,
      ...(preselectedCourseId ? { boxChoice: "" } : {}),
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
      if (name === "course") {
        next.boxChoice = isAcademySessionCourseId(value) ? prev.boxChoice : "";
      }
      return next;
    });
  };

  const showBoxChoice = isAcademySessionCourseId(formData.course);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (showBoxChoice && !formData.boxChoice) {
      setError("Wybierz jedną z opcji boxa albo „Jeszcze nie wiem” / „Nie chcę boxa”.");
      return;
    }
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
        boxChoice: showBoxChoice ? formData.boxChoice : "",
      });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        boxChoice: "",
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
          className="relative w-full max-w-sm sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAFAF5] shadow-xl border border-[#71797E]/10"
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
                  <p
                    id="reservation-date-label"
                    className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium flex items-center gap-1.5"
                  >
                    <Calendar size={12} aria-hidden />
                    Data *
                  </p>
                  <div className="relative min-h-[3rem] rounded-xl border border-[#71797E]/20 bg-white shadow-sm transition-shadow scheme-light group focus-within:border-[#71797E] focus-within:ring-2 focus-within:ring-[#71797E]/15 [color-scheme:light]">
                    {/* Natywny picker: input z opacity-0 często nie otwiera UI (Safari). showPicker() z widocznego przycisku. */}
                    <input
                      ref={dateInputRef}
                      id="reservation-preferred-date"
                      type="date"
                      name="preferredDate"
                      required
                      min={todayISO()}
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="sr-only"
                      tabIndex={-1}
                    />
                    <button
                      type="button"
                      onClick={openDatePicker}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openDatePicker();
                        }
                      }}
                      className="flex min-h-[3rem] w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left outline-none transition-colors hover:bg-[#71797E]/[0.04] focus-visible:ring-2 focus-visible:ring-[#71797E]/25 focus-visible:ring-inset rounded-xl"
                      aria-labelledby="reservation-date-label"
                      aria-haspopup="dialog"
                      aria-describedby="reservation-date-hint"
                    >
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
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#71797E]/10 text-[#71797E] group-focus-within:bg-[#71797E]/18 pointer-events-none">
                        <Calendar size={18} strokeWidth={1.75} aria-hidden />
                      </span>
                    </button>
                  </div>
                  <p
                    id="reservation-date-hint"
                    className="mt-1.5 text-[11px] text-[#71797E]/90 leading-relaxed"
                  >
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

                {showBoxChoice && (
                  <div
                    role="radiogroup"
                    aria-labelledby="reservation-box-choice-heading"
                    className="space-y-3 rounded-xl border border-[#71797E]/15 bg-[#71797E]/[0.06] p-3 sm:p-4"
                  >
                    <p
                      id="reservation-box-choice-heading"
                      className="text-xs uppercase tracking-wider text-[#71797E] font-semibold"
                    >
                      Box do praktyki w domu *
                    </p>
                    <p className="text-[11px] text-[#555555] leading-relaxed -mt-1">
                      Przy pakietach Akademii możesz od razu wybrać zestaw albo zaznaczyć, że jeszcze się
                      zastanawiasz / nie chcesz boxa.
                    </p>
                    <div className="space-y-2.5">
                      {reservationBoxOptionsForWidget.map((opt) => {
                        const items = opt.shortItems?.length
                          ? opt.shortItems.slice(0, 4)
                          : [];
                        const hasMore = (opt.shortItems?.length || 0) > 4;
                        return (
                          <label
                            key={opt.value}
                            className="block cursor-pointer rounded-xl text-left"
                          >
                            <input
                              type="radio"
                              name="boxChoice"
                              value={opt.value}
                              checked={formData.boxChoice === opt.value}
                              onChange={handleChange}
                              className="sr-only peer"
                            />
                            <div className="rounded-xl border-2 border-[#71797E]/15 bg-white p-3 sm:p-3.5 transition-all peer-checked:border-[#71797E] peer-checked:bg-[#71797E]/[0.07] peer-focus-visible:ring-2 peer-focus-visible:ring-[#71797E]/25">
                              <div className="flex gap-3">
                                {opt.detailLinkHash ? (
                                  <div
                                    className="flex h-[4.5rem] w-[4.5rem] shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-[#71797E]/12 bg-gradient-to-br from-[#71797E]/10 to-[#FAFAF5]"
                                    aria-hidden
                                  >
                                    <ImageIcon className="text-[#71797E]/40" size={22} strokeWidth={1.25} />
                                    <span className="px-1 text-center text-[9px] font-medium uppercase tracking-wide text-[#71797E]/55">
                                      Zdjęcie
                                    </span>
                                  </div>
                                ) : (
                                  <div
                                    className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-lg border border-dashed border-[#71797E]/25 bg-[#FAFAF5]"
                                    aria-hidden
                                  >
                                    <span className="text-[#71797E]/40 text-lg">?</span>
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-semibold text-[#333333] leading-snug">
                                    {opt.name}
                                    {opt.price ? (
                                      <span className="block text-[#C4862A] font-bold mt-0.5">
                                        {opt.price}
                                      </span>
                                    ) : null}
                                  </p>
                                  {opt.helper ? (
                                    <p className="text-xs text-[#555555] leading-relaxed mt-1.5">
                                      {opt.helper}
                                    </p>
                                  ) : null}
                                  {items.length > 0 ? (
                                    <ul className="mt-2 space-y-1 text-[11px] text-[#555555] leading-snug list-disc pl-3.5">
                                      {items.map((line) => (
                                        <li key={line}>{line}</li>
                                      ))}
                                      {hasMore ? (
                                        <li className="list-none pl-0 text-[#71797E]">
                                          … więcej w szczegółach na stronie
                                        </li>
                                      ) : null}
                                    </ul>
                                  ) : null}
                                  {opt.detailLinkHash && opt.kupInterest ? (
                                    <div className="mt-2.5 flex flex-wrap gap-2">
                                      <Link
                                        to={{ pathname: "/", hash: opt.detailLinkHash }}
                                        className="inline-flex text-xs font-medium text-[#71797E] underline underline-offset-2 hover:text-[#333333]"
                                        onClick={() => closeWidget()}
                                      >
                                        Zobacz szczegóły
                                      </Link>
                                      <span className="text-[#71797E]/40" aria-hidden>
                                        ·
                                      </span>
                                      <button
                                        type="button"
                                        className="inline-flex text-xs font-semibold text-[#333333] underline underline-offset-2 hover:text-[#71797E]"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          openContactPopup({
                                            interest: opt.kupInterest,
                                            message: `Chcę zamówić ${opt.name} (${opt.price}). `,
                                          });
                                        }}
                                      >
                                        KUP
                                      </button>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

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
