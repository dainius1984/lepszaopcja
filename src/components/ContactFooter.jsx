import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Send,
  Flame,
} from "lucide-react";
import { useReservation } from "../context/ReservationContext";

const footerLinks = [
  {
    title: "Strony",
    links: [
      { label: "O nas", href: "/#about" },
      { label: "Zabiegi", href: "/zabiegi" },
      { label: "Szkolenia", href: "/szkolenia" },
      { label: "Rezerwacja", href: "/rezerwacja" },
      { label: "Kontakt", href: "/#contact" },
    ],
  },
  {
    title: "Prawne",
    links: [
      { label: "Polityka prywatności", href: "#" },
      { label: "Regulamin", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
];

export default function ContactFooter() {
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
              Napisz do nas — chętnie odpowiemy i dopasujemy termin.
            </p>
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
                title="Lokalizacja — ul. Leśna 39, Wilkszyn"
                src="https://www.google.com/maps?q=ul.+Le%C5%9Bna+39,+55-330+Wilkszyn&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[260px]"
              />
              <a
                href="https://maps.app.goo.gl/h2JfKP7BGbuzMzby9"
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

      {/* Footer — dane w jednej linii + linki */}
      <footer className="bg-[#333333] text-[#F5F5DC]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 md:pt-16 pb-8">
          {/* Jedna linia: logo + dane kontaktowe + social */}
          <div className="flex flex-wrap items-center justify-between gap-6 md:gap-8 pb-10 border-b border-[#F5F5DC]/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#71797E] flex items-center justify-center shrink-0">
                <Flame size={18} className="text-[#F5F5DC]" />
              </div>
              <span
                className="text-xl font-bold text-[#F5F5DC]"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Moksy
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <a
                href="https://maps.app.goo.gl/h2JfKP7BGbuzMzby9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#F5F5DC] transition-colors"
              >
                <MapPin size={14} className="text-[#71797E] shrink-0" />
                <span>ul. Leśna 39, 55-330 Wilkszyn</span>
              </a>
              <a
                href="tel:+48690532778"
                className="flex items-center gap-1.5 hover:text-[#F5F5DC] transition-colors"
              >
                <Phone size={14} className="text-[#71797E] shrink-0" />
                <span>690 532 778</span>
              </a>
              <a
                href="mailto:kontakt@lepszaopcja.pl"
                className="flex items-center gap-1.5 hover:text-[#F5F5DC] transition-colors"
              >
                <Mail size={14} className="text-[#71797E] shrink-0" />
                <span>kontakt@lepszaopcja.pl</span>
              </a>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#71797E] shrink-0" />
                <span>Pn–Pt 9:00–19:00 · Sob 9:00–14:00</span>
              </span>
            </div>

            <div className="flex gap-3">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#F5F5DC]/10 flex items-center justify-center hover:bg-[#71797E] hover:border-[#71797E] hover:text-[#F5F5DC] transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* SEO-friendly local text (visible for users and crawlers) */}
          <p className="text-center text-sm text-[#F5F5DC]/50 max-w-2xl mx-auto py-6">
            Gabinet moksoterapii i medycyny chińskiej. Zapraszamy pacjentów z Wrocławia, Wilkszyna i całego Dolnego Śląska.
          </p>

          {/* Linki: Strony, Prawne, Social */}
          <nav className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10" aria-label="Stopka nawigacja">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h2 className="text-[#F5F5DC] text-xs uppercase tracking-widest font-medium mb-4">
                  {col.title}
                </h2>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.label === "Rezerwacja" ? (
                        <button
                          type="button"
                          onClick={() => openWidget()}
                          className="text-sm hover:text-[#F5F5DC] transition-colors duration-200 cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm hover:text-[#F5F5DC] transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="pt-6 border-t border-[#F5F5DC]/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex flex-col gap-1">
              <span>© 2026 Moksy. Wszelkie prawa zastrzeżone.</span>
              <a
                href="https://www.stalowewitryny.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F5DC]/50 hover:text-[#71797E] hover:underline transition-colors duration-200"
              >
                Projekt i realizacja: stalowewitryny.pl
              </a>
            </div>
            <span className="text-[#71797E]">
              Gabinet moksoterapii i medycyny chińskiej. Zapraszamy z Wrocławia, Wilkszyna i Dolnego Śląska · Ul. Leśna 39, Wilkszyn
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
