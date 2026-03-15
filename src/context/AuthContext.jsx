import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCurrentUser, logoutUser } from "../lib/appwrite";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login"); // "login" | "register"

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
