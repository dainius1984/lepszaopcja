import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame } from "lucide-react";

const navLinks = [
  { label: "O nas", href: "#about" },
  { label: "Zabiegi", href: "#services" },
  { label: "Szkolenia", href: "#training" },
  { label: "Kontakt", href: "#contact" },
];

export default function Navbar() {
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

      if (y > lastScrollY.current && y > 60) {
        setNavVisible(false);
      } else {
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

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: navVisible ? 0 : -120,
        opacity: 1,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] overflow-x-hidden transition-all duration-300
        md:border-b
        ${isScrolled ? "md:bg-[#FAFAF5]/95 md:backdrop-blur-md md:shadow-sm md:border-[#71797E]/10" : "md:bg-[#333333]/60 md:backdrop-blur-md md:border-[#F5F5DC]/10"}
        md:min-h-[5rem]
      `}
    >
      <div className="w-full max-w-[100vw] box-border mx-auto px-4 sm:px-5 md:px-6 lg:px-10 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-3 min-w-0">
        {/* Logo — na mobile tylko ikona (bez diva-okręgu), na desktop pełne logo */}
        <a href="#" className="flex items-center gap-2 sm:gap-2.5 group min-w-0 shrink-0">
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
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                isScrolled ? "text-[#555555] hover:text-[#71797E]" : "text-[#F5F5DC] hover:text-[#D4A24A]"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-[#71797E]" : "bg-[#D4A24A]"}`} />
            </a>
          ))}
          <a
            href="#contact"
            className={`ml-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm ${
              isScrolled ? "bg-[#71797E] text-[#F5F5DC] hover:bg-[#5A6468]" : "bg-[#F5F5DC] text-[#333333] hover:bg-white"
            }`}
          >
            Umów wizytę
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden p-2 -mr-1 shrink-0 touch-manipulation ${isScrolled ? "text-[#333333]" : "text-[#F5F5DC]"}`}
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
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-[#F5F5DC] hover:text-[#D4A24A] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-5 py-3 rounded-full bg-[#F5F5DC] text-[#333333] text-sm font-medium text-center hover:bg-white transition-colors"
              >
                Umów wizytę
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
