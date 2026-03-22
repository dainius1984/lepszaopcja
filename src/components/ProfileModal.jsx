import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  isAuthConfigured,
  getCurrentUser,
  splitFullName,
  normalizePhoneForAppwrite,
  updateAccountName,
  updateAccountPhone,
  updateAccountPassword,
} from "../lib/appwrite";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20";

export default function ProfileModal() {
  const { profileModalOpen, closeProfileModal, user, refreshUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [initialPhoneE164, setInitialPhoneE164] = useState("");
  const [initialName, setInitialName] = useState("");
  const [passwordForPhone, setPasswordForPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const configured = isAuthConfigured();

  useEffect(() => {
    if (!profileModalOpen || !user) return;
    let cancelled = false;
    (async () => {
      try {
        const u = await getCurrentUser();
        if (!u || cancelled) return;
        const { firstName: f, lastName: l } = splitFullName(u.name);
        setFirstName(f);
        setLastName(l);
        setInitialName((u.name || "").trim());
        setPhone(u.phone || "");
        setInitialPhoneE164(u.phone || "");
      } catch {
        if (!cancelled) {
          const { firstName: f, lastName: l } = splitFullName(user.name);
          setFirstName(f);
          setLastName(l);
          setInitialName((user.name || "").trim());
          setPhone(user.phone || "");
          setInitialPhoneE164(user.phone || "");
        }
      }
    })();
    setError(null);
    setSuccess(null);
    setPasswordForPhone("");
    setOldPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
    return () => {
      cancelled = true;
    };
  }, [profileModalOpen, user]);

  const phoneChanged =
    normalizePhoneForAppwrite(phone) !== normalizePhoneForAppwrite(initialPhoneE164);
  const nameChanged =
    `${firstName.trim()} ${lastName.trim()}`.trim() !== initialName;
  const wantsPasswordChange =
    Boolean(oldPassword || newPassword || newPasswordConfirm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!configured) {
      setError("Brak konfiguracji Appwrite.");
      return;
    }

    if (wantsPasswordChange) {
      if (!oldPassword) {
        setError("Podaj obecne hasło, aby je zmienić.");
        return;
      }
      if (newPassword.length < 8) {
        setError("Nowe hasło musi mieć co najmniej 8 znaków.");
        return;
      }
      if (newPassword !== newPasswordConfirm) {
        setError("Nowe hasła nie są identyczne.");
        return;
      }
    }

    if (phoneChanged) {
      const norm = normalizePhoneForAppwrite(phone);
      if (!norm) {
        setError("Numer telefonu nie może być pusty przy zapisie. Zostaw poprzedni lub podaj pełny numer (+48…).");
        return;
      }
      if (!passwordForPhone || passwordForPhone.length < 8) {
        setError("Aby zmienić numer telefonu, podaj aktualne hasło (min. 8 znaków).");
        return;
      }
    }

    setSubmitting(true);
    try {
      if (nameChanged) {
        await updateAccountName(firstName, lastName);
      }
      if (phoneChanged) {
        await updateAccountPhone(phone, passwordForPhone);
      }
      if (wantsPasswordChange) {
        await updateAccountPassword(oldPassword, newPassword);
      }

      if (!nameChanged && !phoneChanged && !wantsPasswordChange) {
        setSuccess("Brak zmian do zapisania.");
        setSubmitting(false);
        return;
      }

      await refreshUser();
      const u2 = await getCurrentUser();
      if (u2) {
        setInitialName((u2.name || "").trim());
        setInitialPhoneE164(u2.phone || "");
        setPhone(u2.phone || "");
      }
      setPasswordForPhone("");
      setOldPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
      setSuccess("Zapisano zmiany.");
    } catch (err) {
      setError(err?.message || "Nie udało się zapisać. Spróbuj ponownie.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!profileModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center px-3 sm:px-4 py-4 bg-[#333333]/70 backdrop-blur-sm"
        onClick={closeProfileModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAFAF5] shadow-xl border border-[#71797E]/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#71797E]/10 sticky top-0 bg-[#FAFAF5] z-10">
            <h2
              className="text-xl font-bold text-[#333333] pr-2"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Moje dane
            </h2>
            <button
              type="button"
              onClick={closeProfileModal}
              className="p-2 rounded-full text-[#71797E] hover:bg-[#71797E]/10 hover:text-[#333333] transition-colors shrink-0"
              aria-label="Zamknij"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-4 sm:px-5 pt-4 pb-6 sm:pb-8">
            {!configured ? (
              <p className="text-[#555555] text-sm py-4">
                Edycja profilu wymaga skonfigurowanego Appwrite w pliku .env.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-xs text-[#71797E] leading-relaxed">
                  Dane konta są przechowywane w <strong>Appwrite</strong> (hosting kont użytkowników tej
                  strony).
                </p>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className={`${inputClass} bg-[#71797E]/10 text-[#555555] cursor-not-allowed`}
                  />
                  <p className="mt-1 text-[11px] text-[#71797E]">
                    Zmiana e-maila wymaga dodatkowej weryfikacji — skontaktuj się z nami, jeśli potrzebujesz
                    zmienić adres.
                  </p>
                </div>

                <div className="space-y-3 rounded-xl border border-[#71797E]/12 bg-white/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#71797E]">
                    Imię i nazwisko
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#555555] mb-1">Imię</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoComplete="given-name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#555555] mb-1">Nazwisko</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        autoComplete="family-name"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#71797E]">
                    W Appwrite przechowywane jest jedno pole imienia i nazwiska — zapisujemy je razem.
                  </p>
                </div>

                <div className="space-y-3 rounded-xl border border-[#71797E]/12 bg-white/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#71797E]">
                    Telefon
                  </p>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+48 123 456 789"
                    autoComplete="tel"
                    className={inputClass}
                  />
                  {phoneChanged && (
                    <div>
                      <label className="block text-xs text-[#555555] mb-1">
                        Aktualne hasło (wymagane przy zmianie numeru)
                      </label>
                      <input
                        type="password"
                        value={passwordForPhone}
                        onChange={(e) => setPasswordForPhone(e.target.value)}
                        autoComplete="current-password"
                        className={inputClass}
                      />
                    </div>
                  )}
                  <p className="text-[11px] text-[#71797E]">
                    Format międzynarodowy z kodem kraju (np. +48…). Usunięcie numeru z konta nie jest
                    dostępne z tego formularza.
                  </p>
                </div>

                <div className="space-y-3 rounded-xl border border-[#71797E]/12 bg-white/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#71797E]">
                    Zmiana hasła
                  </p>
                  <div>
                    <label className="block text-xs text-[#555555] mb-1">Obecne hasło</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      autoComplete="current-password"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#555555] mb-1">Nowe hasło (min. 8 znaków)</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#555555] mb-1">Powtórz nowe hasło</label>
                    <input
                      type="password"
                      value={newPasswordConfirm}
                      onChange={(e) => setNewPasswordConfirm(e.target.value)}
                      autoComplete="new-password"
                      className={inputClass}
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
                {success && <p className="text-sm text-[#71797E] font-medium">{success}</p>}

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeProfileModal}
                    className="flex-1 py-3 rounded-xl border border-[#71797E]/30 text-[#333333] text-sm font-medium hover:bg-[#71797E]/10 transition-colors"
                  >
                    Zamknij
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-[#333333] text-[#F5F5DC] text-sm font-medium hover:bg-[#71797E] transition-colors disabled:opacity-60"
                  >
                    {submitting ? "Zapisywanie…" : "Zapisz zmiany"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
