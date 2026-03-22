import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Flame, Navigation } from "lucide-react";
import { useReservation } from "../context/ReservationContext";
import HomeSectionFaq from "./home/HomeSectionFaq";

const footerNavLinks = [
  { label: "Start", href: "/#hero" },
  { label: "O mokście", href: "/#about" },
  { label: "Akademia", href: "/#akademia" },
  { label: "Zabiegi", href: "/zabiegi" },
  { label: "Rezerwacja", openWidget: true },
  { label: "Kontakt", href: "/#contact" },
];

export default function ContactFooter({ showFaq = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { openWidget } = useReservation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const accessKey = "08f0b08d-81e0-4ca0-834a-c68a305f11ba";
      const body = {
        access_key: accessKey,
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
      setSubmitError("Błąd połączenia. Sprawdź internet i spróbuj ponownie.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Contact Section — Form + Map obok siebie */}
      <section id="contact" className="py-16 sm:py-20 md:py-28 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-12"
          >
            <span className="inline-block mb-3 text-xs uppercase tracking-widest text-[#71797E] font-medium">
              Skontaktuj się
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] mb-4 leading-tight"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Rozpocznij swoją{" "}
              <span className="italic text-[#71797E]">ścieżkę uzdrowienia</span>
            </h2>
            <p className="text-[#555555] text-base sm:text-lg font-light max-w-xl mx-auto">
              Napisz do nas — chętnie odpowiemy i dopasujemy termin oraz koszt dojazdu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-10 md:mb-12 rounded-2xl border border-[#71797E]/12 bg-white p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4 text-[#333333]">
              <Navigation size={20} className="text-[#71797E]" />
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Logistyka — zasięg Domowej Akademii
              </h3>
            </div>
            <p className="text-sm text-[#555555] leading-relaxed mb-6">
              Moja baza to Wrocław, ale jako mobilna terapeutka przyjeżdżam do Ciebie z całym ekwipunkiem.
              Nauka moksoterapii odbywa się w komfortowych warunkach Twojego domu.
            </p>
            <ul className="space-y-3 text-sm text-[#555555]">
              <li>
                <strong className="text-[#333333]">Strefa I — Wrocław (całe miasto).</strong> Dojazd wliczony w
                cenę sesji.
              </li>
              <li>
                <strong className="text-[#333333]">Strefa II — okolice Wrocławia</strong> (np. Bielany,
                Długołęka, Kiełczów). Dopłata paliwowa: 20–40 zł (zależnie od lokalizacji).
              </li>
              <li>
                <strong className="text-[#333333]">Strefa III — inne miasta w Polsce.</strong> Dojazd ustalany
                indywidualnie.
              </li>
            </ul>
            <p className="mt-5 text-sm text-[#71797E]">
              Przy rezerwacji podaj dokładny adres — od razu potwierdzę koszt dojazdu, bez niespodzianek.
            </p>
            <button
              type="button"
              onClick={() => openWidget()}
              className="mt-6 px-6 py-3 rounded-full bg-[#333333] text-[#F5F5DC] text-sm font-medium hover:bg-[#71797E] transition-colors"
            >
              Umów sesję
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Lewa — Formularz */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="min-h-[320px] lg:min-h-0"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-10 bg-[#71797E]/5 rounded-3xl border border-[#71797E]/15"
                >
                  <div className="w-16 h-16 rounded-full bg-[#71797E]/15 flex items-center justify-center mb-6">
                    <Flame size={28} className="text-[#71797E]" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#333333] mb-3"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    Dziękujemy!
                  </h3>
                  <p className="text-[#555555] font-light">
                    Twoja wiadomość została wysłana. Odpowiemy w ciągu 24 godzin.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 bg-white rounded-3xl p-8 shadow-sm border border-[#71797E]/8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-2 font-medium">
                        Imię i nazwisko
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Twoje imię i nazwisko"
                        className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-[#FAFAF5] text-[#333333] text-sm placeholder:text-[#555555]/40 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-2 font-medium">
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-[#FAFAF5] text-[#333333] text-sm placeholder:text-[#555555]/40 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-2 font-medium">
                      Interesuje mnie
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-[#FAFAF5] text-[#333333] text-sm focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Wybierz...</option>
                      <option value="therapy">Zabieg terapeutyczny</option>
                      <option value="foundation">Kurs podstawowy</option>
                      <option value="advanced">Kurs zaawansowany</option>
                      <option value="specialist">Moduł specjalistyczny</option>
                      <option value="other">Inne zapytanie</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-2 font-medium">
                      Wiadomość
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Opowiedz krótko o sobie i w czym możemy pomóc..."
                      className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-[#FAFAF5] text-[#333333] text-sm placeholder:text-[#555555]/40 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors resize-none"
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
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#333333] text-[#F5F5DC] font-medium text-sm hover:bg-[#71797E] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={15} />
                    {submitting ? "Wysyłanie…" : "Wyślij wiadomość"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Prawa — Mapa */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-[#71797E]/10 min-h-[260px] sm:min-h-[320px] lg:min-h-[400px] bg-[#71797E]/5 relative"
            >
              <iframe
                title="Mapa — Wrocław i okolice"
                src="https://www.google.com/maps?q=Wroc%C5%82aw%2C+Polska&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[260px]"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Wroc%C5%82aw%2C+Polska"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 shadow-md text-[#333333] text-xs font-medium hover:bg-white transition-colors"
              >
                <MapPin size={12} />
                Otwórz w Google Maps
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {showFaq && <HomeSectionFaq />}

      {/* Footer — uproszczony, bez Prawne/Social */}
      <footer className="bg-[#2a2a2a] text-[#F5F5DC]/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-14">
          {/* Logo + krótka nazwa */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-[#71797E]/80 flex items-center justify-center shrink-0">
              <Flame size={20} className="text-[#F5F5DC]" />
            </div>
            <span
              className="text-2xl font-bold text-[#F5F5DC]"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Moksy
            </span>
          </div>

          {/* Kontakt — czytelna siatka na mobile, jedna linia na desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-6 lg:gap-8 mb-10">
            <span className="flex items-start gap-3">
              <MapPin size={18} className="text-[#71797E] shrink-0 mt-0.5" />
              <span className="text-sm leading-snug">
                Mobilne sesje: Wrocław i okolice — dojazd do Ciebie
              </span>
            </span>
            <a
              href="tel:+48690532778"
              className="flex items-start gap-3 group"
            >
              <Phone size={18} className="text-[#71797E] shrink-0 mt-0.5 group-hover:text-[#D4A24A] transition-colors" />
              <span className="text-sm leading-snug group-hover:text-[#F5F5DC] transition-colors">
                690 532 778
              </span>
            </a>
            <a
              href="mailto:kontakt@lepszaopcja.pl"
              className="flex items-start gap-3 group"
            >
              <Mail size={18} className="text-[#71797E] shrink-0 mt-0.5 group-hover:text-[#D4A24A] transition-colors" />
              <span className="text-sm leading-snug group-hover:text-[#F5F5DC] transition-colors">
                kontakt@lepszaopcja.pl
              </span>
            </a>
            <span className="flex items-start gap-3">
              <Clock size={18} className="text-[#71797E] shrink-0 mt-0.5" />
              <span className="text-sm leading-snug text-[#F5F5DC]/60">
                Pn–Pt 9:00–19:00 · Sob 9:00–14:00
              </span>
            </span>
          </div>

          {/* Nawigacja — jedna linia z separatorem */}
          <nav
            className="flex flex-wrap items-center gap-x-1 gap-y-3 mb-8 pb-8 border-b border-[#F5F5DC]/10"
            aria-label="Nawigacja stopki"
          >
            {footerNavLinks.map((link, i) => (
              <span key={link.label} className="flex items-center gap-x-1">
                {i > 0 && <span className="text-[#F5F5DC]/20 px-1">·</span>}
                {link.openWidget ? (
                  <button
                    type="button"
                    onClick={() => openWidget()}
                    className="text-sm hover:text-[#D4A24A] transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm hover:text-[#D4A24A] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                )}
              </span>
            ))}
          </nav>

          {/* Opis + copyright w jednym bloku */}
          <p className="text-sm text-[#F5F5DC]/50 leading-relaxed max-w-xl mb-6">
            Domowa Akademia Moksy — moksoterapia i nauka praktyki w domu. Wrocław i okolice.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[#F5F5DC]/40">
            <span>© 2026 Moksy. Wszelkie prawa zastrzeżone.</span>
            <a
              href="https://www.stalowewitryny.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#71797E] hover:underline transition-colors"
            >
              Projekt i realizacja: stalowewitryny.pl
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
