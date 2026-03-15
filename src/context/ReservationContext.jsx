import { createContext, useContext, useState, useCallback } from "react";

const ReservationContext = createContext(null);

export function ReservationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedCourseId, setPreselectedCourseId] = useState("");

  const openWidget = useCallback((courseId = "") => {
    setPreselectedCourseId(courseId);
    setIsOpen(true);
  }, []);

  const closeWidget = useCallback(() => {
    setIsOpen(false);
    setPreselectedCourseId("");
  }, []);

  return (
    <ReservationContext.Provider
      value={{ isOpen, openWidget, closeWidget, preselectedCourseId }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) return { isOpen: false, openWidget: () => {}, closeWidget: () => {}, preselectedCourseId: "" };
  return ctx;
}
