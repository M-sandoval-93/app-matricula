// mostrar lista de cursos según filtro aplicado a la consulta primaria para la tabla
// actualizar por cada asignacion del curso
// solicitar asignación de fecha para el caso del cambio de curso
import { useEffect, useState } from "react";
import useCourse from "../../hooks/useCourse";
import CardLetter from "./CardLetter";

// ver si paso la lógica desde la data en el componente en si
// Esto quiere decir que se obtiene la lista y se ahce el conteo
const ListLetter = () => {
  const { filterCourseContex, selectGrade, letters } = useCourse();

  useEffect(() => {
    // se obtiene la lista de letras según el grado seleccionado
    if (selectGrade !== null) {
      const letterCourse = filterCourseContex
        .filter((course) => course.curso !== null)
        .map((course) => course.curso.replace(/\d+/g, ""));
      const letterUniqueSet = new Set(letterCourse);
      const letterUnique = Array.from(letterUniqueSet).sort();
      console.log(letterUnique);
    }
  }, [filterCourseContex]);

  return (
    <section className="w-full flex-wrap relative flex justify-start mt-2 gap-4 px-1">
      {letters.map((letters) => (
        <CardLetter
          key={letters}
          grade={"1"}
          countTotal={36}
          letter={letters}
        />
      ))}
    </section>
  );
};

export default ListLetter;
