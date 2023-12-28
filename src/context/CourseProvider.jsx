import { createContext, useCallback, useMemo, useState } from "react";

const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {
  const [dataCourse, setDataCourse] = useState({
    course: [],
    grade: {
      septimo: 0,
      octavo: 0,
      primero: 0,
      segundo: 0,
      tercero: 0,
      cuarto: 0,
    },
    letter: [], // cargar con letras para cada curso
    selectGrade: null,
    selectLetter: null,
  });

  // Actualizador del objeto de contextos
  const updateDataCourse = useCallback((newData) => {
    setDataCourse((prevData) => ({ ...prevData, ...newData }));
  }, []);

  const value = useMemo(
    () => ({
      updateDataCourse,
      ...dataCourse,
    }),
    [updateDataCourse, dataCourse]
  );

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export default CourseContext;
