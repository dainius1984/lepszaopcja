import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { loginUser, registerUser, isAuthConfigured } from "../lib/appwrite";

export default function AuthWidget() {
  const { authModalOpen, closeAuth, authTab, setAuthTab, refreshUser } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPasswordConfirm, setRegPasswordConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const configured = isAuthConfigured();

  if (!authModalOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await loginUser(loginEmail.trim(), loginPassword);
      await refreshUser();
      closeAuth();
      setLoginEmail("");
      setLoginPassword("");
    } catch (err) {
      setError(err?.message || "Nieprawidłowy e-mail lub hasło.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    if (regPassword.length < 8) {
      setError("Hasło musi mieć co najmniej 8 znaków.");
      return;
    }
    if (regPassword !== regPasswordConfirm) {
      setError("Hasła nie są identyczne.");
      return;
    }
    setSubmitting(true);
    try {
      await registerUser(regEmail.trim(), regPassword, regName.trim());
      await loginUser(regEmail.trim(), regPassword);
      await refreshUser();
      closeAuth();
      setRegName("");
      setRegEmail("");
      setRegPassword("");
      setRegPasswordConfirm("");
    } catch (err) {
      setError(err?.message || "Rejestracja nie powiodła się. Sprawdź dane lub spróbuj później.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-[#71797E]/20 bg-white text-[#333333] text-sm focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#333333]/70 backdrop-blur-sm"
        onClick={closeAuth}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md rounded-2xl bg-[#FAFAF5] shadow-xl border border-[#71797E]/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#71797E]/10">
            <h2
              className="text-xl font-bold text-[#333333]"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Konto
            </h2>
            <button
              type="button"
              onClick={closeAuth}
              className="p-2 rounded-full text-[#71797E] hover:bg-[#71797E]/10 hover:text-[#333333] transition-colors"
              aria-label="Zamknij"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-5 pb-8">
            {!configured ? (
              <p className="text-[#555555] text-sm py-4">
                Logowanie wymaga konfiguracji Appwrite (Auth) w pliku .env.
              </p>
            ) : (
              <>
                {/* Tabs */}
                <div className="flex rounded-xl bg-[#71797E]/10 p-1 mb-6">
                  <button
                    type="button"
                    onClick={() => { setAuthTab("login"); setError(null); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      authTab === "login"
                        ? "bg-[#71797E] text-[#F5F5DC]"
                        : "text-[#555555] hover:text-[#333333]"
                    }`}
                  >
                    <LogIn size={16} />
                    Zaloguj się
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthTab("register"); setError(null); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      authTab === "register"
                        ? "bg-[#71797E] text-[#F5F5DC]"
                        : "text-[#555555] hover:text-[#333333]"
                    }`}
                  >
                    <UserPlus size={16} />
                    Zarejestruj się
                  </button>
                </div>

                {error && (
                  <p className="text-sm text-red-600 font-medium mb-4">{error}</p>
                )}

                {authTab === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        placeholder="jan@example.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                        Hasło
                      </label>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className={inputClass}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-[#333333] text-[#F5F5DC] font-medium text-sm hover:bg-[#71797E] transition-colors disabled:opacity-60"
                    >
                      {submitting ? "Logowanie…" : "Zaloguj się"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                        Imię i nazwisko
                      </label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Jan Kowalski"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required
                        placeholder="jan@example.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                        Hasło (min. 8 znaków)
                      </label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                        minLength={8}
                        placeholder="••••••••"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-1.5 font-medium">
                        Powtórz hasło
                      </label>
                      <input
                        type="password"
                        value={regPasswordConfirm}
                        onChange={(e) => setRegPasswordConfirm(e.target.value)}
                        required
                        placeholder="••••••••"
                        className={inputClass}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-[#333333] text-[#F5F5DC] font-medium text-sm hover:bg-[#71797E] transition-colors disabled:opacity-60"
                    >
                      {submitting ? "Rejestracja…" : "Zarejestruj się"}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
