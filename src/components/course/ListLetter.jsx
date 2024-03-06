import { useEffect, useMemo, useState } from "react";
import useCourse from "../../hooks/useCourse";
import CardLetter from "./CardLetter";
import useAuth from "../../hooks/useAuth";
import { getReportCourse } from "../../utils/downloadFunctions";

const ListLetter = () => {
  const {
    course,
    filterCourseContex,
    selectedGrade,
    selectedLetter,
    listCourseForGrade,
    letter,
    updateDataCourse,
  } = useCourse();

  const { authPeriodo } = useAuth();

  // obtención del array con las letras del grado
  const letterArray = useMemo(() => {
    if (selectedGrade !== null) {
      return JSON.parse(
        listCourseForGrade.find(
          (grade) => grade.grado === parseInt(selectedGrade)
        )?.letra || []
      );
    }

    return [];
  }, [selectedGrade, listCourseForGrade]);

  // función para obtener datos de los cursos pertenecientes al grado seleccionado
  const getDataForLetter = () => {
    // inicialización del objeto con propiedades para cada letra
    const letterObject = letterArray.reduce((acc, letterGrade) => {
      acc[letterGrade] = {
        total: 0,
        masculino: 0,
        femenino: 0,
      };
      return acc;
    }, {});

    // asignacion de los valores, al objeto
    course.forEach(({ curso, sexo, estado }) => {
      const letterKey = curso;
      const sexoLower = sexo.toLowerCase();

      if (letterObject[letterKey] && estado !== "RETIRADO (A)") {
        letterObject[letterKey].total++;
        letterObject[letterKey][sexoLower]++;
      }
    });

    // actualización de los datos para cada letra
    updateDataCourse({ letter: letterObject });
  };

  // función para generar elementos de curso con sus datos respectivos
  const generateLetterDataForUI = () => {
    return letterArray.map((letterString) => ({
      letterCourse: letterString,
      countMale: letter[letterString]?.masculino,
      countFemale: letter[letterString]?.femenino,
      countTotal: letter[letterString]?.total,
      activate: false,
    }));
  };

  // función para manejar el click en una tarjeta de letra
  const handleLetterCardClick = (clickedLetter) => {
    updateDataCourse({
      selectedLetter: clickedLetter === selectedLetter ? null : clickedLetter,
    });

    // obtención de los datos filtrados
    const filterLetterCourse =
      clickedLetter === selectedLetter
        ? course.filter((data) => data.grado === parseInt(selectedGrade))
        : selectedLetter === null
        ? filterCourseContex.filter((data) => data.curso === clickedLetter)
        : course.filter((data) => data.curso === clickedLetter);

    // actualizar lista de datos para mostrar en la tabla
    updateDataCourse({ filterCourseContex: filterLetterCourse });
  };

  // función para manejar el click en el boton de descarga de una tarjeta de letra
  const handleDownloadLetterCardClick = (clickedLetter) => {
    // alert(clickedLetter + authPeriodo);
    getReportCourse({ periodo: authPeriodo, course: clickedLetter });
  };

  // obtención del array de cursos al seleccionar un grado
  useEffect(() => {
    getDataForLetter();
  }, [selectedGrade, course]);

  const letterCourse = useMemo(() => generateLetterDataForUI(), [letter]);

  return (
    <section className="w-full flex-wrap relative flex gap-3">
      {letterCourse.map(
        ({ letterCourse, countMale, countFemale, countTotal }) => (
          <CardLetter
            key={letterCourse}
            letterString={letterCourse}
            countMale={countMale}
            countFemale={countFemale}
            countTotal={countTotal}
            active={letterCourse === selectedLetter}
            onLetterClick={handleLetterCardClick}
            onDownloadClick={handleDownloadLetterCardClick}
          />
        )
      )}
    </section>
  );
};

export default ListLetter;
