// mostrar lista de cursos según filtro aplicado a la consulta primaria para la tabla
// actualizar por cada asignacion del curso
// solicitar asignación de fecha para el caso del cambio de curso

import { useEffect, useState } from "react";
import useCourse from "../../hooks/useCourse";
import CardCourse from "./CardCourse";


// ver si paso la lógica desde la data en el componente en si
// Esto quiere decir que se obtiene la lista y se ahce el conteo
const ListCourse = () => {

  const {letter} = useCourse();
  // const [letters, setLetters] = useState();

  // useEffect(() => {
  //   setLetters(letter);
  // }, [letter]);

  console.log(letter);

  return (
    <section className="w-full flex-wrap relative flex justify-start mt-2 gap-3">
      {
        letter.map((letra) => (
          <CardCourse grade={"1"} letter={letra} />
        ))
      }
    </section>
  );
};

export default ListCourse;
