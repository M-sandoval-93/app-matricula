import { useEffect, useMemo, useState } from "react";
import useCourse from "../../hooks/useCourse";
import HeaderTitle from "../HeaderTitle";
import CardGradeCourse from "./CardGradeCourse";

const HeaderCourse = () => {
  const { course, updateDataCourse, grade, selectGrade } = useCourse();

  // efecto para obtener la cantidad de estudiantes por grado
  useEffect(() => {
    // inicialización del objeto y sus propiedades
    const gradeData = [7, 8, 1, 2, 3, 4].reduce((acc, grade) => {
      acc[grade] = {
        total: 0,
        masculino: 0,
        femenino: 0,
      };
      return acc;
    }, {});

    // asignación de los valores
    course.forEach(({ grado, sexo }) => {
      const gradeKey = grado;
      const sexoLower = sexo.toLowerCase();

      if (gradeData[gradeKey]) {
        gradeData[gradeKey].total++;
        gradeData[gradeKey][sexoLower]++;
      }
    });

    updateDataCourse({ grade: gradeData });
  }, [course]);

  // obtener los datos del grado mediante la memorización
  const gradeCourse = useMemo(
    // ver si le paso como estado el active:false;
    () => [
      {
        grade: "7",
        level: "Básico",
        countMale: grade[7]?.masculino,
        countFemale: grade[7]?.femenino,
        countTotal: grade[7]?.total,
        active: false,
      },
      {
        grade: "8",
        level: "Básico",
        countMale: grade[8]?.masculino,
        countFemale: grade[8]?.femenino,
        countTotal: grade[8]?.total,
        active: false,
      },
      {
        grade: "1",
        level: "Medio",
        countMale: grade[1]?.masculino,
        countFemale: grade[1]?.femenino,
        countTotal: grade[1]?.total,
        active: false,
      },
      {
        grade: "2",
        level: "Medio",
        countMale: grade[2]?.masculino,
        countFemale: grade[2]?.femenino,
        countTotal: grade[2]?.total,
        active: false,
      },
      {
        grade: "3",
        level: "Medio",
        countMale: grade[3]?.masculino,
        countFemale: grade[3]?.femenino,
        countTotal: grade[3]?.total,
        active: false,
      },
      {
        grade: "4",
        level: "Medio",
        countMale: grade[4]?.masculino,
        countFemale: grade[4]?.femenino,
        countTotal: grade[4]?.total,
        active: false,
      },
    ],

    [grade]
  );

  // selección y filtro de grado seleccionado
  const handleCardClick = (clickedGrade) => {
    // setActiveGrade(clickedGrade === activeGrade ? null : clickedGrade);
    updateDataCourse({
      selectGrade: clickedGrade === selectGrade ? null : clickedGrade,
    });

    // obtención de los datos filtrados;
    const filterGradeCourse =
      clickedGrade === selectGrade
        ? course
        : course.filter((data) => data.grado === parseInt(clickedGrade));

    // actualizar lista de datos
    updateDataCourse({ filterCourseContex: filterGradeCourse });
  };

  return (
    <HeaderTitle title={"Registro cursos"}>
      <section className="w-full flex-wrap sm:flex-nowrap sm:w-1/2 relative flex items-center justify-center sm:justify-end gap-4 xs:px-2">
        {gradeCourse.map(
          ({ grade, level, countMale, countFemale, countTotal }) => (
            <CardGradeCourse
              key={grade}
              grade={grade}
              level={level}
              countMale={countMale}
              countFemale={countFemale}
              countTotal={countTotal}
              active={grade === selectGrade}
              onCardClick={handleCardClick}
            />
          )
        )}
      </section>
    </HeaderTitle>
  );
};

export default HeaderCourse;
