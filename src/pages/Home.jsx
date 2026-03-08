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

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "contact") {
      const el = document.getElementById("contact");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.state]);

  return (
    <div className="font-sans antialiased">
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
