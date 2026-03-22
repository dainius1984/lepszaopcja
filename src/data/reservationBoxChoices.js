import { productBoxes } from "./productBoxes";

/** Wartości zapisywane w Appwrite (kolekcja reservations, atrybut boxChoice). */
export const RESERVATION_BOX_CHOICE = {
  START: "start_box",
  PREMIUM: "premium_box",
  UNSURE: "unsure",
  NONE: "none",
};

const startBox = productBoxes.find((b) => b.id === "start-box");
const premiumBox = productBoxes.find((b) => b.id === "premium-box");

/**
 * Opcje wyboru boxa przy rezerwacji pakietów Akademii (UI + kopiowanie z productBoxes).
 */
export const reservationBoxOptionsForWidget = [
  {
    value: RESERVATION_BOX_CHOICE.START,
    boxId: "start-box",
    name: startBox?.name ?? "Start Box — Pierwsze Ciepło",
    price: startBox?.price ?? "137 zł",
    shortItems: startBox?.shortItems ?? [],
    detailLinkHash: "box-start-box",
    kupInterest: "box-start",
  },
  {
    value: RESERVATION_BOX_CHOICE.PREMIUM,
    boxId: "premium-box",
    name: premiumBox?.name ?? "Premium Box — Pełnia Ciepła",
    price: premiumBox?.price ?? "267 zł",
    shortItems: premiumBox?.shortItems ?? [],
    detailLinkHash: "box-premium-box",
    kupInterest: "box-premium",
  },
  {
    value: RESERVATION_BOX_CHOICE.UNSURE,
    boxId: null,
    name: "Jeszcze nie wiem",
    price: null,
    shortItems: [],
    helper: "Możesz doprecyzować później — zaznacz to, jeśli chcesz najpierw umówić termin.",
  },
  {
    value: RESERVATION_BOX_CHOICE.NONE,
    boxId: null,
    name: "Nie chcę boxa",
    price: null,
    shortItems: [],
    helper: "Rezerwujesz tylko sesję / pakiet, bez zestawu startowego.",
  },
];

export function getReservationBoxChoiceLabel(value) {
  if (!value) return "";
  const map = {
    [RESERVATION_BOX_CHOICE.START]: "Box przy rezerwacji: Start Box — Pierwsze Ciepło (137 zł)",
    [RESERVATION_BOX_CHOICE.PREMIUM]: "Box przy rezerwacji: Premium Box — Pełnia Ciepła (267 zł)",
    [RESERVATION_BOX_CHOICE.UNSURE]: "Box przy rezerwacji: jeszcze nie wiem",
    [RESERVATION_BOX_CHOICE.NONE]: "Box przy rezerwacji: nie chcę",
  };
  return map[value] || value;
}
