import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Package, Sparkles } from "lucide-react";
import { academySessions } from "../../data/academySessions";
import { useReservation } from "../../context/ReservationContext";
import SessionDetailModal from "./SessionDetailModal";

const brings = [
  "Różne rodzaje moksy (cygara dymne i bezdymne, moksa cięta na imbirze) — możesz od razu poczuć różnicę między technikami i wybrać, co najlepiej pasuje do Twoich potrzeb.",
  "Instrukcje z punktami akupunkturowymi — przygotowane indywidualnie, abyś wiedział/a, które miejsca ogrzewać w domu dla najlepszych efektów.",
  "Materiały do pokazów (uchwyty, rolery, boxy, pokrowce) — możesz sprawdzić, co najlepiej Ci odpowiada i jak bezpiecznie praktykować w domu.",
  "Książki i materiały do wglądu — możesz je obejrzeć, zrobić zdjęcia, notatki i zdecydować, co warto kupić lub jakie techniki wdrożyć samodzielnie.",
  "Kompletny zestaw startowy na próbę — część materiałów, np. rozpoczęte cygara, zostaje u Ciebie, abyś mógł/mogła od razu zacząć praktykę dla siebie lub bliskich.",
];

export default function HomeSectionAcademy() {
  const { openWidget } = useReservation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeSessionId, setActiveSessionId] = useState(null);
  const activeSession = academySessions.find((s) => s.id === activeSessionId) ?? null;

  return (
    <>
      <section id="akademia" className="py-16 sm:py-20 md:py-28 bg-[#333333] relative overflow-hidden scroll-mt-20 md:scroll-mt-24">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F5DC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
              O warsztatach
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5DC] mb-5"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Domowa Akademia Moksy
            </h2>
            <p className="text-[#D4A24A] text-lg sm:text-xl font-medium mb-4">
              Jedna wizyta, wiedza na całe życie
            </p>
            <div className="text-[#F5F5DC]/65 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed space-y-4">
              <p>
                Nie przyjeżdżam, by wykonać jeden zabieg – przyjeżdżam, aby pokazać Ci, jak samodzielnie
                korzystać z moksoterapii w domu.
              </p>
              <p>
                Podczas sesji skupiamy się na Tobie i Twoim ciele: uczysz się technik krok po kroku,
                poznajesz różne rodzaje moksy, odkrywasz, jak bezpiecznie ją stosować i jak kontrolować
                ciepło w każdym momencie. To doświadczenie, po którym stajesz się samodzielnym praktykiem
                – w swoim domu, w swoim tempie.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="relative min-h-[220px] overflow-hidden rounded-2xl border border-[#F5F5DC]/20 bg-[#222] shadow-lg aspect-[4/3] lg:aspect-auto lg:min-h-0 lg:h-full"
            >
              <img
                src="/img/1.png"
                alt="Domowa Akademia Moksy — nauka moksoterapii i praktyki w domu"
                className="absolute inset-0 h-full w-full object-cover object-center"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="flex h-full min-h-0 flex-col rounded-2xl border border-[#F5F5DC]/10 bg-[#FAFAF5]/5 p-6 sm:p-8"
            >
              <h3 className="text-lg font-semibold text-[#F5F5DC] mb-4 flex items-start gap-2.5 leading-snug">
                <Package size={20} className="text-[#D4A24A] shrink-0 mt-0.5" aria-hidden />
                <span>Co przywożę na sesję i dlaczego to dla Ciebie ważne</span>
              </h3>
              <ul className="grow space-y-3">
                {brings.map((line) => (
                  <li key={line} className="flex gap-2.5 text-sm text-[#F5F5DC]/70 leading-relaxed">
                    <Sparkles size={14} className="text-[#71797E] shrink-0 mt-1" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 shrink-0 text-sm text-[#F5F5DC]/55 leading-relaxed border-t border-[#F5F5DC]/10 pt-6">
                Dzięki temu nie musisz zgadywać ani kupować wszystkiego na własną rękę — sprawdzasz,
                uczysz się i od razu działasz, w pełnym bezpieczeństwie i wygodzie.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 text-[#D4A24A] text-sm font-medium uppercase tracking-wider">
              <BookOpen size={16} />
              Wybierz swoją ścieżkę
            </span>
            <p className="text-[#F5F5DC]/50 text-sm mt-2">
              Każda sesja jest dopasowana indywidualnie i różni się zakresem oraz czasem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 md:items-stretch">
            {academySessions.map((session, i) => (
              <motion.article
                key={session.id}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08 * i }}
                className="flex h-full min-h-0 flex-col rounded-2xl border border-[#F5F5DC]/10 bg-[#FAFAF5]/[0.06] p-6 sm:p-7 hover:bg-[#FAFAF5]/10 transition-colors"
              >
                <span className="text-xs text-[#71797E] font-medium mb-2">
                  Pakiet {session.order}
                </span>
                <h3
                  className="text-xl font-bold text-[#F5F5DC] mb-2 leading-snug"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {session.shortTitle}
                </h3>
                <p className="text-sm text-[#D4A24A] font-medium mb-3 shrink-0">
                  {session.duration} · {session.price}
                </p>
                <p className="text-sm text-[#F5F5DC]/60 leading-relaxed grow mb-6">
                  {session.summary}
                </p>
                <div className="flex flex-col gap-2 mt-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveSessionId(session.id)}
                    className="w-full py-3 rounded-xl border border-[#F5F5DC]/25 text-[#F5F5DC] text-sm font-medium hover:bg-[#F5F5DC]/10 transition-colors"
                  >
                    Szczegóły
                  </button>
                  <button
                    type="button"
                    onClick={() => openWidget(session.id)}
                    className="w-full py-3 rounded-xl bg-[#D4A24A] text-[#333333] text-sm font-semibold hover:bg-[#c9943f] transition-colors"
                  >
                    {session.reserveLabel}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {activeSession && (
        <SessionDetailModal session={activeSession} onClose={() => setActiveSessionId(null)} />
      )}
    </>
  );
}
