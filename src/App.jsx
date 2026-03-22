import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ReservationProvider } from "./context/ReservationContext";
import AuthWidget from "./components/AuthWidget";
import ReservationWidget from "./components/ReservationWidget";
import Home from "./pages/Home";
import ZabiegiPage from "./pages/ZabiegiPage";
import SzkoleniaPage from "./pages/SzkoleniaPage";
import MeridianPage from "./pages/zabiegi/MeridianPage";
import RezerwacjaPage from "./pages/RezerwacjaPage";
import MyReservationsPage from "./pages/MyReservationsPage";
import PoradnikMoksoterapiiPage from "./pages/PoradnikMoksoterapiiPage";
import KompendiumOdzywianiaPage from "./pages/KompendiumOdzywianiaPage";
import { PORADNIK_MOKSOTERAPII_PATH } from "./data/poradnikMoksoterapiiMeta";
import { KOMPENDIUM_ODZYWANIA_PATH } from "./data/kompendiumOdzywianiaMeta";

function App() {
  return (
    <AuthProvider>
      <ReservationProvider>
        <AuthWidget />
        <ReservationWidget />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/zabiegi" element={<ZabiegiPage />} />
          <Route path="/zabiegi/:slug" element={<MeridianPage />} />
          <Route path="/szkolenia" element={<SzkoleniaPage />} />
          <Route path={PORADNIK_MOKSOTERAPII_PATH} element={<PoradnikMoksoterapiiPage />} />
          <Route path={KOMPENDIUM_ODZYWANIA_PATH} element={<KompendiumOdzywianiaPage />} />
          <Route path="/rezerwacja" element={<RezerwacjaPage />} />
          <Route path="/moje-wizyty" element={<MyReservationsPage />} />
        </Routes>
      </ReservationProvider>
    </AuthProvider>
  );
}

export default App;
