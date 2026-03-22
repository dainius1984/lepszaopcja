import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import Analytics from "./components/Analytics.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Analytics />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
