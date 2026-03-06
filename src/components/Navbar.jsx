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

      if (isMobile.current) {
        if (y > lastScrollY.current && y > 80) {
          setNavVisible(false);
        } else {
          setNavVisible(true);
        }
        lastScrollY.current = y;
      } else {
        setNavVisible(true);
      }
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAFAF5]/95 backdrop-blur-md shadow-sm border-b border-[#71797E]/10"
          : "bg-[#333333]/60 backdrop-blur-md border-b border-[#F5F5DC]/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isScrolled ? "bg-[#71797E]" : "bg-[#F5F5DC]/20"}`}>
            <Flame size={18} className={isScrolled ? "text-[#F5F5DC]" : "text-[#F5F5DC]"} />
          </div>
          <span
            className={`text-2xl font-bold tracking-tight ${isScrolled ? "text-[#333333]" : "text-[#F5F5DC]"}`}
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Moksy
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
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
          className={`md:hidden p-2 ${isScrolled ? "text-[#333333]" : "text-[#F5F5DC]"}`}
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
            <div className="px-6 py-6 flex flex-col gap-5">
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
