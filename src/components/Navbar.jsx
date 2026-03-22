import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Flame,
  LogOut,
  ChevronDown,
  UserRoundPlus,
  CircleUser,
  CalendarDays,
  IdCard,
} from "lucide-react";
import { useReservation } from "../context/ReservationContext";
import { useAuth } from "../context/AuthContext";
import { PORADNIK_MOKSOTERAPII_PATH } from "../data/poradnikMoksoterapiiMeta";
import { KOMPENDIUM_ODZYWANIA_PATH } from "../data/kompendiumOdzywianiaMeta";

const korzysciNav = {
  label: "Korzyści",
  href: "/#korzysci",
  items: [
    { label: "Zalety moksoterapii — sekcja na stronie głównej", href: "/#korzysci" },
    { label: "Poradnik moksoterapii — Ścieżka ciepła", to: PORADNIK_MOKSOTERAPII_PATH },
    { label: "Kompendium żywienia TCM — Rytm stołu", to: KOMPENDIUM_ODZYWANIA_PATH },
  ],
};

const navLinks = [
  { label: "O mokście", href: "/#about" },
  korzysciNav,
  { label: "Akademia", href: "/#akademia" },
  { label: "Boxy", href: "/#boxy" },
  { label: "Zabiegi", to: "/zabiegi" },
  { label: "Szkolenia", to: "/szkolenia" },
  { label: "Kontakt", href: "/#contact" },
];

const linkClassDesktop = (isScrolled) =>
  `cursor-pointer text-sm font-medium transition-colors duration-200 relative group flex items-center gap-1 ${
    isScrolled ? "text-[#555555] hover:text-[#71797E]" : "text-[#F5F5DC] hover:text-[#D4A24A]"
  }`;

const underlineClass = (isScrolled) =>
  `absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
    isScrolled ? "bg-[#71797E]" : "bg-[#D4A24A]"
  }`;

export default function Navbar() {
  const location = useLocation();
  const { openWidget } = useReservation();
  const { user, loading, openAuth, openProfileModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isMobile = useRef(false);
  const userMenuRef = useRef(null);

  const accountShort = (() => {
    const e = user?.email;
    if (!e || typeof e !== "string") return "Konto";
    const local = e.split("@")[0] || "Konto";
    return local.length > 14 ? `${local.slice(0, 14)}…` : local;
  })();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      isMobile.current = mobile;
      if (!mobile) setNavVisible(true);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 40);

      const goingDown = y > lastScrollY.current;

      // Mobile: zamknij menu przy scrollu i chowaj/pokazuj navbar wg kierunku
      if (isMobile.current) {
        if (y !== lastScrollY.current && menuOpen) {
          setMenuOpen(false);
        }
        if (goingDown && y > 60) {
          setNavVisible(false);
        } else {
          setNavVisible(true);
        }
      } else {
        // Desktop: zawsze widoczny (tylko zmiana stylu po scrollu)
        setNavVisible(true);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onPointerDown = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [userMenuOpen]);

  const handleLogoClick = (e) => {
    setMenuOpen(false);
    if (location.pathname !== "/") return;
    e.preventDefault();
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (location.hash) {
      window.history.replaceState(null, "", "/");
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: navVisible ? 0 : -120,
        opacity: 1,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] overflow-visible transition-all duration-300
        md:border-b
        ${isScrolled ? "md:bg-[#FAFAF5]/95 md:backdrop-blur-md md:shadow-sm md:border-[#71797E]/10" : "md:bg-[#333333]/60 md:backdrop-blur-md md:border-[#F5F5DC]/10"}
        md:min-h-[5rem]
      `}
    >
      <div className="w-full max-w-[100vw] box-border mx-auto px-4 sm:px-5 md:px-6 lg:px-10 h-12 sm:h-14 md:h-20 flex items-center justify-between gap-3 min-w-0 overflow-visible">
        {/* Logo — na mobile tylko ikona (bez diva-okręgu), na desktop pełne logo */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 sm:gap-2.5 group min-w-0 shrink-0 cursor-pointer"
          aria-label="Moksy — strona główna, sekcja hero"
        >
          <span className={`md:flex md:w-9 md:h-9 md:rounded-full md:items-center md:justify-center hidden ${isScrolled ? "md:bg-[#71797E]" : "md:bg-[#F5F5DC]/20"}`}>
            <Flame size={18} className={isScrolled ? "text-[#F5F5DC]" : "text-[#F5F5DC]"} />
          </span>
          <Flame size={22} className={`md:hidden shrink-0 ${isScrolled ? "text-[#333333]" : "text-[#F5F5DC]"}`} />
          <span
            className={`text-xl sm:text-2xl font-bold tracking-tight truncate ${isScrolled ? "text-[#333333]" : "text-[#F5F5DC]"}`}
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Moksy
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0 overflow-visible"
          aria-label="Menu główne"
        >
          {navLinks.map((link) =>
            link.openWidget ? (
              <button
                key={link.label}
                type="button"
                onClick={() => openWidget()}
                className={`cursor-pointer text-sm font-medium transition-colors duration-200 relative group ${
                  isScrolled ? "text-[#555555] hover:text-[#71797E]" : "text-[#F5F5DC] hover:text-[#D4A24A]"
                }`}
              >
                {link.label}
                <span className={underlineClass(isScrolled)} />
              </button>
            ) : link.items ? (
              <div key={link.label} className="relative group py-1">
                <a
                  href={link.href}
                  className={`${linkClassDesktop(isScrolled)} relative py-2`}
                  aria-haspopup="menu"
                  aria-label={`${link.label} — menu z linkami do przewodników`}
                >
                  {link.label}
                  <ChevronDown size={14} className="opacity-75 shrink-0" aria-hidden />
                  <span className={underlineClass(isScrolled)} />
                </a>
                <div
                  className="absolute left-0 top-full z-[200] pt-1.5 w-[min(20rem,calc(100vw-2rem))] opacity-0 invisible translate-y-0.5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200"
                  role="menu"
                  aria-label="Podmenu Korzyści"
                >
                  <div className="rounded-xl border border-[#71797E]/20 bg-[#FAFAF5] shadow-xl py-2 backdrop-blur-md">
                    {link.items.map((item) =>
                      item.to ? (
                        <Link
                          key={item.to}
                          to={item.to}
                          role="menuitem"
                          className="block cursor-pointer px-4 py-2.5 text-sm text-[#333333] hover:bg-[#71797E]/10 rounded-lg mx-1 leading-snug"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className="block cursor-pointer px-4 py-2.5 text-sm text-[#333333] hover:bg-[#71797E]/10 rounded-lg mx-1 leading-snug"
                        >
                          {item.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={`${linkClassDesktop(isScrolled)} relative py-2`}
              >
                {link.label}
                <span className={underlineClass(isScrolled)} />
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`${linkClassDesktop(isScrolled)} relative py-2`}
              >
                {link.label}
                <span className={underlineClass(isScrolled)} />
              </a>
            )
          )}
          {!loading && (
            user ? (
              <div className="relative ml-1 shrink-0" ref={userMenuRef}>
                <button
                  type="button"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                  aria-label="Menu konta użytkownika"
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className={`cursor-pointer inline-flex items-center gap-2 rounded-full border px-2.5 py-2 text-sm font-medium transition-colors ${
                    isScrolled
                      ? "border-[#71797E]/35 text-[#333333] hover:bg-[#71797E]/10"
                      : "border-[#F5F5DC]/40 text-[#F5F5DC] hover:bg-[#F5F5DC]/10"
                  } ${userMenuOpen ? (isScrolled ? "bg-[#71797E]/10" : "bg-[#F5F5DC]/15") : ""}`}
                >
                  <CircleUser
                    size={20}
                    strokeWidth={1.5}
                    className={isScrolled ? "text-[#71797E]" : "text-[#D4A24A]"}
                    aria-hidden
                  />
                  <span className="max-w-[5.5rem] lg:max-w-[7rem] truncate">{accountShort}</span>
                  <ChevronDown
                    size={14}
                    className={`opacity-70 shrink-0 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      role="menu"
                      aria-label="Konto"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-[calc(100%+0.45rem)] z-[200] w-[min(17.5rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-[#71797E]/20 bg-[#FAFAF5] py-2 shadow-xl"
                    >
                      <div className="border-b border-[#71797E]/10 px-3.5 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71797E]">
                          Zalogowano jako
                        </p>
                        <p className="mt-0.5 truncate text-xs text-[#333333]" title={user.email}>
                          {user.email}
                        </p>
                      </div>
                      <Link
                        role="menuitem"
                        to="/moje-wizyty"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-sm text-[#333333] transition-colors hover:bg-[#71797E]/10"
                      >
                        <CalendarDays size={17} className="shrink-0 text-[#71797E]" aria-hidden />
                        Moje wizyty
                      </Link>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setUserMenuOpen(false);
                          openProfileModal();
                        }}
                        className="flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-[#333333] transition-colors hover:bg-[#71797E]/10"
                      >
                        <IdCard size={17} className="shrink-0 text-[#71797E]" aria-hidden />
                        Moje dane
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-[#333333] transition-colors hover:bg-[#71797E]/10"
                      >
                        <LogOut size={17} className="shrink-0 text-[#71797E]" aria-hidden />
                        Wyloguj
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuth("register")}
                className={`cursor-pointer ml-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-[#555555] hover:bg-[#71797E]/10 hover:text-[#333333]"
                    : "text-[#F5F5DC] hover:bg-[#F5F5DC]/10"
                }`}
              >
                <UserRoundPlus
                  size={18}
                  strokeWidth={1.75}
                  className={isScrolled ? "text-[#C4862A]" : "text-[#D4A24A]"}
                  aria-hidden
                />
                Zarejestruj
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => openWidget()}
            className={`cursor-pointer ml-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm ${
              isScrolled ? "bg-[#71797E] text-[#F5F5DC] hover:bg-[#5A6468]" : "bg-[#F5F5DC] text-[#333333] hover:bg-white"
            }`}
          >
            Umów wizytę
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className={`cursor-pointer md:hidden p-2 -mr-1 shrink-0 touch-manipulation ${isScrolled ? "text-[#333333]" : "text-[#F5F5DC]"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Otwórz menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#333333]/95 backdrop-blur-md border-t border-[#F5F5DC]/10 overflow-hidden"
          >
            <div className="px-4 sm:px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.openWidget ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      openWidget();
                    }}
                    className="cursor-pointer text-left text-base font-medium text-[#F5F5DC] hover:text-[#D4A24A] transition-colors"
                  >
                    {link.label}
                  </button>
                ) : link.items ? (
                  <div key={link.label} className="flex flex-col gap-2">
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="cursor-pointer text-base font-medium text-[#F5F5DC] hover:text-[#D4A24A] transition-colors"
                    >
                      {link.label}
                    </a>
                    <div className="flex flex-col gap-2 pl-3 ml-0.5 border-l border-[#F5F5DC]/20">
                      <span className="text-xs uppercase tracking-wider text-[#F5F5DC]/45 pl-2">
                        Przewodniki i sekcja
                      </span>
                      {link.items.map((item) =>
                        item.to ? (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMenuOpen(false)}
                            className="cursor-pointer text-sm text-[#F5F5DC]/90 hover:text-[#D4A24A] transition-colors pl-2 leading-snug"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="cursor-pointer text-sm text-[#F5F5DC]/90 hover:text-[#D4A24A] transition-colors pl-2 leading-snug"
                          >
                            {item.label}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                ) : link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="cursor-pointer text-base font-medium text-[#F5F5DC] hover:text-[#D4A24A] transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="cursor-pointer text-base font-medium text-[#F5F5DC] hover:text-[#D4A24A] transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
              {!loading && (
                user ? (
                  <div className="mt-1 rounded-2xl border border-[#F5F5DC]/20 bg-[#F5F5DC]/[0.07] p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5F5DC]/15">
                        <CircleUser size={22} className="text-[#D4A24A]" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#F5F5DC]/50">
                          Twoje konto
                        </p>
                        <p className="truncate text-sm font-medium text-[#F5F5DC]" title={user.email}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/moje-wizyty"
                      onClick={() => setMenuOpen(false)}
                      className="mb-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#F5F5DC]/15 px-4 py-3 text-sm font-medium text-[#F5F5DC] transition-colors hover:bg-[#F5F5DC]/25"
                    >
                      <CalendarDays size={18} className="text-[#D4A24A]" aria-hidden />
                      Moje wizyty
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        openProfileModal();
                      }}
                      className="mb-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#F5F5DC]/25 px-4 py-3 text-sm font-medium text-[#F5F5DC]/90 transition-colors hover:bg-[#F5F5DC]/10"
                    >
                      <IdCard size={18} className="text-[#D4A24A]" aria-hidden />
                      Moje dane
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#F5F5DC]/25 px-4 py-3 text-sm font-medium text-[#F5F5DC]/90 transition-colors hover:bg-[#F5F5DC]/10"
                    >
                      <LogOut size={18} aria-hidden />
                      Wyloguj
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      openAuth("register");
                    }}
                    className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[#F5F5DC]/20 text-[#F5F5DC] text-sm hover:bg-[#F5F5DC]/10"
                  >
                    <UserRoundPlus size={18} strokeWidth={1.75} className="text-[#D4A24A]" aria-hidden />
                    Zarejestruj
                  </button>
                )
              )}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openWidget();
                }}
                className="cursor-pointer mt-2 px-5 py-3 rounded-full bg-[#F5F5DC] text-[#333333] text-sm font-medium text-center hover:bg-white transition-colors"
              >
                Umów wizytę
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
