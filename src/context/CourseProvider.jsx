import { createContext, useCallback, useMemo, useState } from "react";

const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {
  const [dataCourse, setDataCourse] = useState({
    course: [], // datos de la consulta y respaldo
    filterCourseContex: [], // datos filtrados
    grade: [], // array con los datos del grado
    selectGrade: null, // grado seleccionado
    letters: [], // todas las letras de curso del periodo
    selectLetter: null, // letra seleccionado
    lettersForCourse: [], // letras por grado
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
