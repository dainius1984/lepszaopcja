import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutMoxa from "../components/AboutMoxa";
import HomeSectionDeepBenefits from "../components/home/HomeSectionDeepBenefits";
import HomeSectionFamily from "../components/home/HomeSectionFamily";
import HomeSectionAcademy from "../components/home/HomeSectionAcademy";
import HomeSectionBoxes from "../components/home/HomeSectionBoxes";
import HomeSectionAboutMe from "../components/home/HomeSectionAboutMe";
import Testimonials from "../components/Testimonials";
import ContactFooter from "../components/ContactFooter";
import ScrollRevealSection from "../components/home/ScrollRevealSection";
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
        title="Domowa Akademia Moksy — moksoterapia i warsztaty we Wrocławiu"
        description="Mobilna moksoterapia TCM: nauka praktyki w domu, pakiety Start-Up Express, Złoty Standard i Akademia Długowieczności. Wrocław i okolice. Boxy startowe i premium."
        keywords="moksoterapia Wrocław, Domowa Akademia Moksy, moksa w domu, warsztat moksy, moksoterapia mobilna, TCM, naturalne ciepło, box moksy"
        url="/"
      />
      <JsonLd schema={getLocalBusinessSchema()} />
      <ContactFormPopup />
      <Navbar />
      <Hero />
      <ScrollRevealSection>
        <AboutMoxa />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <HomeSectionDeepBenefits />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <HomeSectionFamily />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <HomeSectionAcademy />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <HomeSectionBoxes />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <HomeSectionAboutMe />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <Testimonials />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <ContactFooter showFaq />
      </ScrollRevealSection>
    </div>
  );
}
