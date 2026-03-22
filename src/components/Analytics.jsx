import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, isAnalyticsEnabled, trackPageView } from "../lib/analytics";

/**
 * Śledzi odsłony w SPA: pierwsza strona + każda zmiana trasy (React Router).
 * Bez VITE_GA_MEASUREMENT_ID komponent nic nie robi.
 */
export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    let cancelled = false;
    initAnalytics().then((ok) => {
      if (!cancelled && ok) trackPageView();
    });
    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.search, location.hash]);

  return null;
}
