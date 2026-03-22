import { academySessions } from "./academySessions";
import { courses } from "./courses";

/**
 * Etykiety do formularza rezerwacji — sesje Akademii + kursy grupowe + inne.
 */
export const bookingSelectGroups = [
  {
    label: "Domowa Akademia Moksy — sesje mobilne",
    options: academySessions.map((s) => ({
      id: s.id,
      title: `${s.shortTitle} — ${s.duration} ${s.price}`,
    })),
  },
  {
    label: "Szkolenia grupowe",
    options: courses.map((c) => ({
      id: c.id,
      title: c.title,
    })),
  },
  {
    label: "Inne",
    options: [{ id: "zabieg", title: "Zabieg moksoterapii (wizyta)" }],
  },
];

export function getBookingLabelById(courseId) {
  if (!courseId) return "";
  if (courseId === "zabieg") return "Zabieg moksoterapii (wizyta)";
  const session = academySessions.find((s) => s.id === courseId);
  if (session) {
    return `${session.title} — ${session.duration}, ${session.price}`;
  }
  const course = courses.find((c) => c.id === courseId);
  if (course) return course.title;
  return courseId;
}

export function isKnownBookingId(courseId) {
  if (!courseId || courseId === "zabieg") return true;
  return (
    academySessions.some((s) => s.id === courseId) ||
    courses.some((c) => c.id === courseId)
  );
}
