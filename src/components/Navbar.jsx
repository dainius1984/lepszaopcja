import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame, LogOut, ChevronDown, UserRoundPlus } from "lucide-react";
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
  const { user, loading, openAuth, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isMobile = useRef(false);

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
          className="hidden md:flex items-center gap-8 shrink-0 overflow-visible"
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
              <span className="ml-2 flex items-center gap-3">
                <Link
                  to="/moje-wizyty"
                  className={`cursor-pointer text-xs font-medium underline underline-offset-4 ${
                    isScrolled ? "text-[#71797E] hover:text-[#333333]" : "text-[#F5F5DC]/80 hover:text-[#F5F5DC]"
                  }`}
                >
                  Moje wizyty
                </Link>
                <span
                  className={`text-sm max-w-[140px] truncate ${
                    isScrolled ? "text-[#555555]" : "text-[#F5F5DC]/90"
                  }`}
                  title={user.email}
                >
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={() => logout()}
                  className={`cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                    isScrolled
                      ? "text-[#555555] hover:bg-[#71797E]/10 hover:text-[#333333]"
                      : "text-[#F5F5DC]/80 hover:bg-[#F5F5DC]/10 hover:text-[#F5F5DC]"
                  }`}
                  title="Wyloguj"
                >
                  <LogOut size={14} />
                  Wyloguj
                </button>
              </span>
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
              {!loading && user && (
                <Link
                  to="/moje-wizyty"
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer mt-1 text-sm text-[#F5F5DC]/80 underline underline-offset-4 hover:text-[#D4A24A]"
                >
                  Moje wizyty
                </Link>
              )}
              {!loading && (
                user ? (
                  <div className="mt-2 flex flex-col gap-2">
                    <span className="text-sm text-[#F5F5DC]/80 truncate px-1">
                      {user.email}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[#F5F5DC]/20 text-[#F5F5DC] text-sm hover:bg-[#F5F5DC]/10"
                    >
                      <LogOut size={14} />
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
