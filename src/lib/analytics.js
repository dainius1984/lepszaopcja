/**
 * Google Analytics 4 (gtag) — opcjonalne, włączone tylko gdy ustawisz VITE_GA_MEASUREMENT_ID w .env.
 * W UE rozważ zgodę na pliki cookies (RODO / ePrivacy) przed wysyłaniem danych do Google.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "";

let initPromise = null;

export function isAnalyticsEnabled() {
  return Boolean(MEASUREMENT_ID);
}

/**
 * Ładuje gtag.js raz i konfiguruje GA4 bez automatycznego pierwszego page_view (obsługa SPA).
 * @returns {Promise<boolean>}
 */
export function initAnalytics() {
  if (!MEASUREMENT_ID) return Promise.resolve(false);
  if (typeof window === "undefined") return Promise.resolve(false);
  if (initPromise) return initPromise;

  initPromise = new Promise((resolve) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, { send_page_view: false });

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });

  return initPromise;
}

/** Wyślij page_view (np. po zmianie trasy w React Router). */
export function trackPageView() {
  if (!MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
  const path = window.location.pathname + window.location.search + window.location.hash;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Niestandardowe zdarzenie (np. klik „Umów wizytę”, wysłanie formularza). */
export function trackEvent(eventName, params = {}) {
  if (!MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}
