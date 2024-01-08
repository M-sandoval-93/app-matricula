// mostrar lista de cursos según filtro aplicado a la consulta primaria para la tabla
// actualizar por cada asignacion del curso
// solicitar asignación de fecha para el caso del cambio de curso
import { useEffect } from "react";
import useCourse from "../../hooks/useCourse";
import CardLetter from "./CardLetter";

// ver si paso la lógica desde la data en el componente en si
// Esto quiere decir que se obtiene la lista y se ahce el conteo
const ListLetter = () => {
  const { filterCourseContex, selectGrade, letters, updateDataCourse } =
    useCourse();

  useEffect(() => {
    // if (selectGrade !== null) {
    //   const letterCourse = filterCourseContex
    //     .filter((course) => course.curso !== null)
    //     .map((course) => course.curso.replace(/\d+/g, ""));
    //   const letterUniqueSet = new Set(letterCourse);
    //   const letterUnique = Array.from(letterUniqueSet).sort();
    //   updateDataCourse({ lettersForCourse: letterUnique });
    // } else {
    //   updateDataCourse({ lettersForCourse: [] });
    // }

    // se obtiene la lista de letras según el grado seleccionado
    const lettersForCourse =
      selectGrade !== null
        ? Array.from(
            new Set(
              filterCourseContex
                .filter((course) => course.curso !== null)
                .map((course) => course.curso.replace(/\d+/g, ""))
            )
          ).sort()
        : [];

    updateDataCourse({ lettersForCourse });

    // pasar a condicion if
    // probar si es factible conbinar con script anterior

    if (selectGrade !== null) {
      // inicialización del objeto y sus propiedades
      const letterData = lettersForCourse.reduce((acc, letter) => {
        acc[selectGrade + letter] = {
          total: 0,
          masculino: 0,
          femenino: 0,
        };
        return acc;
      }, {});

      // asignacion de los valores
      filterCourseContex.forEach(({ curso, sexo }) => {
        const letterKey = curso;
        const sexoLower = sexo.toLowerCase();

        if (letterData[letterKey]) {
          letterData[letterKey].total++;
          letterData[letterKey][sexoLower]++;
        }
      });

      console.log(letterData);
    }
  }, [filterCourseContex]);

  return (
    <section className="w-full flex-wrap relative flex justify-start mt-2 gap-4 px-1">
      {letters.map((letters) => (
        <CardLetter key={letters} letter={letters} />
      ))}
    </section>
  );
};

export default ListLetter;
