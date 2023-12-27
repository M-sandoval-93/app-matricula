import { createContext, useCallback, useMemo, useState } from "react";
import { getCurrentYear } from "../utils/funciones";

const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {
  const year = getCurrentYear();
  const [data, setData] = useState({
    course: [],
    grade: {
      septimo: null,
      octavo: null,
      primero: null,
      segundo: null,
      tercero: null,
      cuarto: null,
    },
    letter: [],
    selectGrade: null,
    selectLetter: null,
  });

  // Actualizador del objeto de contextos
  const updateDataCourse = useCallback((newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  const value = useMemo(
    () => ({
      updateDataCourse,
      ...data,
    }),
    [updateDataCourse, data]
  );

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export default CourseContext;
