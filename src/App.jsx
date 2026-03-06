import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMoxa from "./components/AboutMoxa";
import ServicesGrid from "./components/ServicesGrid";
import TrainingAcademy from "./components/TrainingAcademy";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonials";
import ContactFooter from "./components/ContactFooter";
import ContactFormPopup from "./components/ContactFormPopup";

function App() {
  return (
    <div className="font-sans antialiased">
      <ContactFormPopup />
      <Navbar />
      <Hero />
      <AboutMoxa />
      <ServicesGrid />
      <TrainingAcademy />
      <Benefits />
      <Testimonials />
      <ContactFooter />
    </div>
  );
}

export default App;
