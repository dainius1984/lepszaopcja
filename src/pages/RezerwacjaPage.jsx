import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
import Seo from "../components/Seo";
import { useReservation } from "../context/ReservationContext";

/**
 * Strona /rezerwacja — otwiera widget rezerwacji i pokazuje fallback,
 * gdyby użytkownik wszedł bezpośrednio z linku.
 */
export default function RezerwacjaPage() {
  const location = useLocation();
  const { openWidget } = useReservation();
  const courseId = location.state?.courseId || "";

  useEffect(() => {
    openWidget(courseId);
  }, [openWidget, courseId]);

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col bg-[#FAFAF5]">
      <Seo
        title="Rezerwacja — Zapisz się na szkolenie lub zabieg"
        description="Zarezerwuj miejsce na kurs moksoterapii lub umów wizytę. Moksy — Wilkszyn k. Wrocławia."
        keywords="rezerwacja moksoterapia, zapisz się na szkolenie, kurs moksy rezerwacja, wizyta Wilkszyn"
        url="/rezerwacja"
      />
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28 pb-16 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-[#555555] text-sm mb-4">
            Formularz rezerwacji powinien otworzyć się w oknie. Jeśli go nie
            widzisz, kliknij poniżej.
          </p>
          <button
            type="button"
            onClick={() => openWidget(courseId)}
            className="px-6 py-3 rounded-full bg-[#71797E] text-[#F5F5DC] text-sm font-medium hover:bg-[#5A6468] transition-colors"
          >
            Otwórz rezerwację
          </button>
          <p className="mt-6">
            <Link to="/szkolenia" className="text-[#71797E] text-sm hover:underline">
              ← Wróć do szkoleń
            </Link>
          </p>
        </div>
      </main>
      <ContactFooter />
    </div>
  );
}
