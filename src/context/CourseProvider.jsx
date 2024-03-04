import { createContext, useCallback, useMemo, useState } from "react";

const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {
  const [dataCourse, setDataCourse] = useState({
    course: [], // datos base de la consulta
    filterCourseContex: [], // datos para trabajar con filtros
    listCourseForGrade: {}, // almacena un array de los cursos por grado
    grade: [], // array con los datos del grado
    letter: [], // array con los datos de las letras
    selectedGrade: null, // estado para la selección de un grado
    selectedLetter: null, // estado para la selección de un curso
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
