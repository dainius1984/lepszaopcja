import { createContext, useContext, useState, useCallback } from "react";

const ReservationContext = createContext(null);

export function ReservationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedCourseId, setPreselectedCourseId] = useState("");
  /** Gdy true, pole usługi jest zablokowane (np. wybrany pakiet z karty lub modala). */
  const [lockCourseSelection, setLockCourseSelection] = useState(false);

  const openWidget = useCallback((courseId = "", options = {}) => {
    const lock =
      Boolean(courseId) && options.lock !== false;
    setPreselectedCourseId(courseId);
    setLockCourseSelection(lock);
    setIsOpen(true);
  }, []);

  const closeWidget = useCallback(() => {
    setIsOpen(false);
    setPreselectedCourseId("");
    setLockCourseSelection(false);
  }, []);

  return (
    <ReservationContext.Provider
      value={{
        isOpen,
        openWidget,
        closeWidget,
        preselectedCourseId,
        lockCourseSelection,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    return {
      isOpen: false,
      openWidget: () => {},
      closeWidget: () => {},
      preselectedCourseId: "",
      lockCourseSelection: false,
    };
  }
  return ctx;
}
