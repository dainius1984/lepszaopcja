import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCurrentUser, logoutUser } from "../lib/appwrite";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login"); // "login" | "register"
  const AUTO_LOGOUT_MS = 5 * 60 * 1000; // 5 minut

  const refreshUser = useCallback(async () => {
    if (!getCurrentUser) return;
    setLoading(true);
    try {
      const u = await getCurrentUser();
      setUser(u);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Aktualizuj znacznik aktywności użytkownika (klik, ruch myszą, klawiatura, dotyk)
  useEffect(() => {
    const key = "lepszaopcja:lastActivity";
    const updateActivity = () => {
      try {
        localStorage.setItem(key, String(Date.now()));
      } catch {
        // ignore
      }
    };

    updateActivity();

    const events = ["click", "keydown", "touchstart"];
    events.forEach((evt) => window.addEventListener(evt, updateActivity, { passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, updateActivity));
    };
  }, []);

  // Auto-logout po 5 minutach braku aktywności (soft logout po stronie frontu)
  useEffect(() => {
    const key = "lepszaopcja:lastActivity";

    const check = async () => {
      if (!user) return;
      let ts = 0;
      try {
        ts = Number(localStorage.getItem(key) || "0");
      } catch {
        ts = 0;
      }
      const now = Date.now();
      if (!ts || now - ts > AUTO_LOGOUT_MS) {
        await logoutUser();
        setUser(null);
        setAuthModalOpen(false);
      }
    };

    const id = window.setInterval(check, 60000); // sprawdzaj co 60 sekund
    return () => window.clearInterval(id);
  }, [user]);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    setAuthModalOpen(false);
  }, []);

  const openAuth = useCallback((tab = "login") => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const value = {
    user,
    loading,
    authModalOpen,
    authTab,
    setAuthTab,
    openAuth,
    closeAuth,
    setAuthModalOpen,
    refreshUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: null,
      loading: false,
      authModalOpen: false,
      authTab: "login",
      setAuthTab: () => {},
      openAuth: () => {},
      closeAuth: () => {},
      setAuthModalOpen: () => {},
      refreshUser: async () => {},
      logout: async () => {},
    };
  }
  return ctx;
}
