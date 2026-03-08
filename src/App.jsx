import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ZabiegiPage from "./pages/ZabiegiPage";
import SzkoleniaPage from "./pages/SzkoleniaPage";
import MeridianPage from "./pages/zabiegi/MeridianPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/zabiegi" element={<ZabiegiPage />} />
      <Route path="/zabiegi/:slug" element={<MeridianPage />} />
      <Route path="/szkolenia" element={<SzkoleniaPage />} />
    </Routes>
  );
}

export default App;
