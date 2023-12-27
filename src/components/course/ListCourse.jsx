// mostrar lista de cursos según filtro aplicado a la consulta primaria para la tabla
// actualizar por cada asignacion del curso
// solicitar asignación de fecha para el caso del cambio de curso

import CardCourse from "./CardCourse";

const ListCourse = () => {
  return (
    <section className="w-full flex-wrap relative flex justify-start mt-2 gap-3">
      <CardCourse grade={"1"} letter={"A"} />
      <CardCourse grade={"1"} letter={"B"} />
      <CardCourse grade={"1"} letter={"C"} />
      <CardCourse grade={"1"} letter={"D"} />
      <CardCourse grade={"1"} letter={"E"} />
      <CardCourse grade={"1"} letter={"F"} />
      <CardCourse grade={"1"} letter={"G"} />
      <CardCourse grade={"1"} letter={"H"} />
      <CardCourse grade={"1"} letter={"J"} />
      <CardCourse grade={"1"} letter={"J"} />
      <CardCourse grade={"1"} letter={"K"} />
    </section>
  );
};

export default ListCourse;
