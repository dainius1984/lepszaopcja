import { Link, Navigate, useParams } from "react-router-dom";
import { Check, Calendar, ImageIcon, ChevronLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
import Seo from "../components/Seo";
import { getAcademySessionById, getAcademySessionPath } from "../data/academySessions";
import { useReservation } from "../context/ReservationContext";

function PhotoPlaceholder({ label }) {
  return (
    <div
      className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-[#71797E]/15 bg-gradient-to-br from-[#71797E]/8 via-[#FAFAF5] to-[#D4A24A]/10"
      aria-hidden
    >
      <ImageIcon className="text-[#71797E]/35" size={40} strokeWidth={1.25} />
      <span className="px-4 text-center text-xs font-medium uppercase tracking-wider text-[#71797E]/55">
        {label}
      </span>
    </div>
  );
}

export default function AcademySessionPage() {
  const { slug } = useParams();
  const session = slug ? getAcademySessionById(slug) : null;
  const { openWidget } = useReservation();

  if (!session) {
    return <Navigate to="/" replace state={{ scrollTo: "akademia" }} />;
  }

  const pagePath = getAcademySessionPath(session.id);
  const seoDescription = `${session.summary} ${session.duration}, ${session.price}. Domowa Akademia Moksy — moksoterapia w domu we Wrocławiu i okolicach.`;

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col bg-[#FAFAF5]">
      <Seo
        title={`${session.title} — pakiet ${session.order}`}
        description={seoDescription}
        keywords={`moksoterapia, Domowa Akademia Moksy, ${session.shortTitle}, pakiet ${session.order}, nauka moksy w domu, Wrocław`}
        url={pagePath}
      />
      <Navbar />

      <main className="flex-1">
        {/* Odstęp pod fixed navbar — tutaj wewnątrz ciemnej sekcji, żeby nie świeciło tło #FAFAF5 strony */}
        <section className="bg-[#333333] text-[#F5F5DC] pt-24 md:pt-28 pb-12 md:pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
            <nav
              className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#F5F5DC]/50"
              aria-label="Ścieżka nawigacji"
            >
              <Link to="/" className="transition-colors hover:text-[#D4A24A]">
                Start
              </Link>
              <span aria-hidden>/</span>
              <Link to="/#akademia" className="transition-colors hover:text-[#D4A24A]">
                Akademia
              </Link>
              <span aria-hidden>/</span>
              <span className="font-medium text-[#F5F5DC]/90">{session.shortTitle}</span>
            </nav>

            <Link
              to="/#akademia"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#D4A24A] transition-colors hover:text-[#e0b060]"
            >
              <ChevronLeft size={18} aria-hidden />
              Wszystkie pakiety
            </Link>

            <p className="text-xs font-semibold uppercase tracking-widest text-[#71797E] mb-3">
              Pakiet {session.order}
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-[2.65rem] font-bold text-[#F5F5DC] leading-tight mb-4"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {session.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#F5F5DC]/75">
              <span className="inline-flex items-center gap-2">
                <Calendar size={16} className="text-[#D4A24A]" aria-hidden />
                {session.duration}
              </span>
              <span className="h-4 w-px bg-[#F5F5DC]/20" aria-hidden />
              <span className="text-lg font-semibold text-[#D4A24A]">{session.price}</span>
            </div>
            <p className="mt-6 text-base text-[#F5F5DC]/70 leading-relaxed font-light">
              {session.summary}
            </p>

            <div className="mt-8 hidden lg:block">
              <button
                type="button"
                onClick={() => openWidget(session.id)}
                className="w-full sm:w-auto min-w-[240px] rounded-xl bg-[#D4A24A] px-8 py-4 text-center text-sm font-semibold text-[#333333] shadow-lg shadow-black/20 transition-colors hover:bg-[#c9943f]"
              >
                {session.reserveLabel}
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16 pb-28 lg:pb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#71797E] mb-5">
            Wrażenia z sesji — zdjęcia
          </h2>
          <p className="text-sm text-[#555555] leading-relaxed mb-6">
            Tutaj w przyszłości pojawią się zdjęcia z pracy podczas sesji (atmosfera, materiały, nauka krok po
            kroku). Na razie zostawiamy miejsce pod wizualne uzupełnienie strony.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-14">
            <PhotoPlaceholder label="Miejsce na zdjęcie 1" />
            <PhotoPlaceholder label="Miejsce na zdjęcie 2" />
          </div>

          <h2 className="text-lg font-semibold text-[#333333] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
            Co zawiera pakiet
          </h2>
          <ul className="space-y-3">
            {session.bullets.map((line) => (
              <li key={line} className="flex gap-3 text-sm text-[#555555] leading-relaxed">
                <Check size={18} className="text-[#71797E] shrink-0 mt-0.5" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl border border-[#71797E]/15 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-sm text-[#555555] leading-relaxed mb-6">
              Gotowy/a na pierwszy krok? Wybierz termin w formularzu — pakiet zostanie wstępnie dopasowany do
              tej strony.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => openWidget(session.id)}
                className="flex-1 rounded-xl bg-[#333333] py-3.5 text-sm font-semibold text-[#F5F5DC] transition-colors hover:bg-[#71797E]"
              >
                {session.reserveLabel}
              </button>
              <Link
                to="/#akademia"
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#71797E]/30 py-3.5 text-sm font-medium text-[#555555] transition-colors hover:bg-[#71797E]/8"
              >
                Porównaj pakiety
              </Link>
            </div>
          </div>
        </section>
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#71797E]/15 bg-[#FAFAF5]/95 backdrop-blur-md px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
        <button
          type="button"
          onClick={() => openWidget(session.id)}
          className="w-full rounded-xl bg-[#D4A24A] py-3.5 text-sm font-semibold text-[#333333] transition-colors hover:bg-[#c9943f]"
        >
          {session.reserveLabel}
        </button>
      </div>

      <ContactFooter />
    </div>
  );
}
