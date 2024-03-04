import { useEffect, useMemo } from "react";
import useCourse from "../../hooks/useCourse";
import HeaderTitle from "../HeaderTitle";
import CardGradeCourse from "./CardGradeCourse";

const HeaderCourse = () => {
  const { course, updateDataCourse, grade, selectedGrade } = useCourse();
  const listGrade = [7, 8, 1, 2, 3, 4];

  // función para calcular datos por grado
  const getDataForGrade = () => {
    // inicialización del objeto y sus propiedades
    const gradeData = listGrade.reduce((acc, grade) => {
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

    // actualización de los datos para cada grado
    updateDataCourse({ grade: gradeData });
  };

  // función para generar los datos de grado para la interfaz de usuario
  const generateGradeDataForUI = () => {
    return listGrade.map((numGrade) => ({
      grade: numGrade.toString(),
      level: numGrade === 7 || numGrade === 8 ? "Básico" : "Medio",
      countMale: grade[numGrade]?.masculino,
      countFemale: grade[numGrade]?.femenino,
      countTotal: grade[numGrade]?.total,
      active: false,
    }));
  };

  // función para manejar el clic en una tarjeta de grado
  const handleCardClick = (clickedGrade) => {
    updateDataCourse({
      selectedGrade: clickedGrade === selectedGrade ? null : clickedGrade,
      selectedLetter: null, // setea selección por letra
    });

    // obtención de los datos filtrados
    const filterGradeCourse =
      clickedGrade === selectedGrade
        ? course
        : course.filter((data) => data.grado === parseInt(clickedGrade));

    // actualizar lista de datos para mostrar en la tabla
    updateDataCourse({ filterCourseContex: filterGradeCourse });
  };

  // efecto para obtener la cantidad de estudiantes por grado
  useEffect(() => {
    getDataForGrade();
  }, [course]);

  // obtener los datos del grado mediante la memorización
  const gradeCourse = useMemo(() => generateGradeDataForUI(), [grade]);

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
              active={grade === selectedGrade}
              onCardClick={handleCardClick}
            />
          )
        )}
      </section>
    </HeaderTitle>
  );
};

export default HeaderCourse;
