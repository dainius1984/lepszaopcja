/**
 * Otwiera modal kontaktu (ContactFormPopup).
 * @param {object} [detail] — opcjonalnie: { interest?: string, message?: string }
 */
export function openContactPopup(detail = {}) {
  window.dispatchEvent(new CustomEvent("open-contact-popup", { detail }));
}
