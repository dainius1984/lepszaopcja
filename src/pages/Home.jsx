import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutMoxa from "../components/AboutMoxa";
import ServicesGrid from "../components/ServicesGrid";
import TerapieMeridianowe from "../components/TerapieMeridianowe";
import TrainingAcademy from "../components/TrainingAcademy";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";
import ContactFooter from "../components/ContactFooter";
import ContactFormPopup from "../components/ContactFormPopup";
import Seo from "../components/Seo";
import JsonLd from "../components/JsonLd";
import { getLocalBusinessSchema } from "../seo/schemas";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const scrollToId = location.state?.scrollTo || (location.hash ? location.hash.slice(1) : null);
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.state, location.hash]);

  return (
    <div className="font-sans antialiased">
      <Seo
        title="Moksoterapia Wrocław — Naturalne leczenie, medycyna chińska Wilkszyn"
        description="Gabinet moksoterapii i medycyny chińskiej w Wilkszynie k. Wrocławia. Naturalne leczenie moksą, zabiegi bez igieł, terapia meridianowa. Zapraszamy z Wrocławia i Dolnego Śląska. Ul. Leśna 39."
        keywords="moksoterapia Wrocław, moksoterapia Wilkszyn, naturalne leczenie, medycyna chińska, TCM, zabiegi moksą, akupunktura bez igieł, terapia meridianowa, Dolny Śląsk"
        url="/"
      />
      <JsonLd schema={getLocalBusinessSchema()} />
      <ContactFormPopup />
      <Navbar />
      <Hero />
      <AboutMoxa />
      <ServicesGrid />
      <TerapieMeridianowe />
      <TrainingAcademy />
      <Benefits />
      <Testimonials />
      <ContactFooter />
    </div>
  );
}
