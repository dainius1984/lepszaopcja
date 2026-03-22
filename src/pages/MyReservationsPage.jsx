import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
import Seo from "../components/Seo";
import { useAuth } from "../context/AuthContext";
import { getReservationsForEmail } from "../lib/appwrite";
import { getReservationBoxChoiceLabel } from "../data/reservationBoxChoices";

export default function MyReservationsPage() {
  const { user, loading, openAuth } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    let cancelled = false;
    const run = async () => {
      setLoadingReservations(true);
      setError(null);
      try {
        const docs = await getReservationsForEmail(user.email);
        if (!cancelled) setReservations(docs);
      } catch (err) {
        if (!cancelled) setError(err?.message || "Nie udało się pobrać wizyt.");
      } finally {
        if (!cancelled) setLoadingReservations(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col bg-[#FAFAF5]">
      <Seo
        title="Moje wizyty — podgląd rezerwacji"
        description="Sprawdź swoje zapisane wizyty i szkolenia w gabinecie Moksy."
        keywords="moje wizyty, rezerwacje, harmonogram, moksoterapia"
        url="/moje-wizyty"
      />
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {!loading && !user && (
            <section className="text-center max-w-md mx-auto">
              <h1
                className="text-2xl sm:text-3xl font-bold text-[#333333] mb-3"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Moje wizyty
              </h1>
              <p className="text-sm text-[#555555] mb-5">
                Zaloguj się lub zarejestruj, aby zobaczyć swoje rezerwacje.
              </p>
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#333333] text-[#F5F5DC] text-sm font-medium hover:bg-[#71797E] transition-colors"
              >
                Zaloguj się
              </button>
            </section>
          )}

          {user && (
            <section>
              <header className="mb-6">
                <p className="text-xs uppercase tracking-widest text-[#71797E] font-medium mb-2">
                  Konto
                </p>
                <h1
                  className="text-2xl sm:text-3xl font-bold text-[#333333] mb-1"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Moje wizyty
                </h1>
                <p className="text-sm text-[#555555]">
                  Zalogowano jako <span className="font-medium">{user.email}</span>
                </p>
              </header>

              {loadingReservations ? (
                <p className="text-sm text-[#555555]">Ładuję Twoje rezerwacje…</p>
              ) : error ? (
                <p className="text-sm text-red-600 font-medium">{error}</p>
              ) : reservations.length === 0 ? (
                <p className="text-sm text-[#555555]">
                  Nie znaleziono żadnych wizyt dla tego adresu e-mail.
                </p>
              ) : (
                <ul className="space-y-3">
                  {reservations.map((r) => (
                    <li
                      key={r.$id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 rounded-xl border border-[#71797E]/15 bg-white shadow-sm"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#333333]">
                          {r.course || "Wizyta"}
                        </p>
                        <p className="text-xs text-[#555555]/80">
                          {r.preferredDate || "data nieustalona"} ·{" "}
                          {r.preferredTime || "godzina do ustalenia"}
                        </p>
                        {r.boxChoice ? (
                          <p className="text-xs text-[#71797E] mt-1">
                            {getReservationBoxChoiceLabel(r.boxChoice)}
                          </p>
                        ) : null}
                      </div>
                      {r.message && (
                        <p className="text-xs text-[#71797E] max-w-sm sm:text-right">
                          {r.message}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </div>
      </main>
      <ContactFooter />
    </div>
  );
}

