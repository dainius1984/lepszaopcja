import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Flame } from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "08f0b08d-81e0-4ca0-834a-c68a305f11ba";

export default function ContactFormPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (hasShownRef.current) return;
    const t = setTimeout(() => {
      hasShownRef.current = true;
      setIsOpen(true);
    }, 15000);
    return () => clearTimeout(t);
  }, []);

  // Otwarcie programowe: Event lub CustomEvent z detail: { interest?, message? }
  useEffect(() => {
    const handler = (e) => {
      hasShownRef.current = true;
      setSubmitError(null);
      setSubmitted(false);
      const d = e?.detail && typeof e.detail === "object" ? e.detail : {};
      const hasDetail = Object.keys(d).length > 0;
      if (!hasDetail) {
        setFormData({ name: "", email: "", interest: "", message: "" });
      } else {
        setFormData({
          name: "",
          email: "",
          interest:
            d.interest != null && String(d.interest).length > 0 ? d.interest : "",
          message: d.message != null ? d.message : "",
        });
      }
      setIsOpen(true);
    };
    window.addEventListener("open-contact-popup", handler);
    return () => window.removeEventListener("open-contact-popup", handler);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const body = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };
      if (formData.interest) {
        body.subject = formData.interest;
        body.interest = formData.interest;
      }
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", interest: "", message: "" });
      } else {
        const msg =
          data?.message ||
          data?.body?.message ||
          (res.status === 500
            ? "Błąd po stronie usługi formularza (500). Sprawdź klucz API na web3forms.com lub napisz na kontakt@lepszaopcja.pl."
            : "Wysłanie nie powiodło się. Spróbuj ponownie lub napisz na kontakt@lepszaopcja.pl.");
        setSubmitError(msg);
      }
    } catch {
      setSubmitError(
        "Błąd połączenia. Sprawdź internet i spróbuj ponownie."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-[#333333]/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={close}
        >
          {/* Modal — klik wewnątrz nie zamyka */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-form-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#FAFAF5] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#71797E]/10"
          >
              {/* Przycisk X */}
              <button
                type="button"
                onClick={close}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#71797E]/10 text-[#333333] flex items-center justify-center hover:bg-[#71797E]/20 transition-colors touch-manipulation"
                aria-label="Zamknij"
              >
                <X size={20} />
              </button>

              <div className="p-6 sm:p-8 pt-14 sm:pt-14">
                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-[#71797E]/15 flex items-center justify-center mx-auto mb-4">
                      <Flame size={26} className="text-[#71797E]" />
                    </div>
                    <h3
                      className="text-xl font-bold text-[#333333] mb-2"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      Dziękujemy!
                    </h3>
                    <p className="text-[#555555] text-sm font-light mb-6">
                      Twoja wiadomość została wysłana. Odpowiemy w ciągu 24 godzin.
                    </p>
                    <button
                      type="button"
                      onClick={close}
                      className="px-6 py-2.5 rounded-full bg-[#71797E] text-[#F5F5DC] text-sm font-medium hover:bg-[#5A6468] transition-colors"
                    >
                      Zamknij
                    </button>
                  </div>
                ) : (
                  <>
                    <h2
                      id="popup-form-title"
                      className="text-2xl sm:text-3xl font-bold text-[#333333] mb-1"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      Skontaktuj się
                    </h2>
                    <p className="text-[#555555] text-sm mb-6">
                      Masz pytanie? Napisz do nas — chętnie odpowiemy.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                          Imię i nazwisko
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Twoje imię i nazwisko"
                          className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm placeholder:text-[#555555]/40 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                          E-mail
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="twoj@email.pl"
                          className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm placeholder:text-[#555555]/40 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                          Interesuje mnie
                        </label>
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Wybierz...</option>
                          <option value="box-start">Zakup — Start Box</option>
                          <option value="box-premium">Zakup — Premium Box</option>
                          <option value="therapy">Zabieg terapeutyczny</option>
                          <option value="foundation">Kurs podstawowy</option>
                          <option value="advanced">Kurs zaawansowany</option>
                          <option value="specialist">Moduł specjalistyczny</option>
                          <option value="other">Inne zapytanie</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                          Wiadomość
                        </label>
                        <textarea
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Opowiedz krótko, w czym możemy pomóc..."
                          className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm placeholder:text-[#555555]/40 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors resize-none"
                        />
                      </div>
                      {submitError && (
                        <p className="text-sm text-red-600 font-medium">
                          {submitError}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#333333] text-[#F5F5DC] font-medium text-sm hover:bg-[#71797E] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
                      >
                        <Send size={16} />
                        {submitting ? "Wysyłanie…" : "Wyślij wiadomość"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
