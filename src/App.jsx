import { Routes, Route } from "react-router-dom";
import { ReservationProvider } from "./context/ReservationContext";
import ReservationWidget from "./components/ReservationWidget";
import Home from "./pages/Home";
import ZabiegiPage from "./pages/ZabiegiPage";
import SzkoleniaPage from "./pages/SzkoleniaPage";
import MeridianPage from "./pages/zabiegi/MeridianPage";
import RezerwacjaPage from "./pages/RezerwacjaPage";

function App() {
  return (
    <ReservationProvider>
      <ReservationWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zabiegi" element={<ZabiegiPage />} />
        <Route path="/zabiegi/:slug" element={<MeridianPage />} />
        <Route path="/szkolenia" element={<SzkoleniaPage />} />
        <Route path="/rezerwacja" element={<RezerwacjaPage />} />
      </Routes>
    </ReservationProvider>
  );
}

export default App;
