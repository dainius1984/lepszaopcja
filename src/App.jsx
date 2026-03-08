import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MeridianPage from "./pages/zabiegi/MeridianPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/zabiegi/:slug" element={<MeridianPage />} />
    </Routes>
  );
}

export default App;
