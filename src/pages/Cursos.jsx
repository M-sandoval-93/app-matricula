import HeaderCurso from "../components/curso/HeaderCurso";
import ListCourse from "../components/curso/ListCourse";

const Cursos = () => {
  return (
    <section className="relative w-auto flex flex-col gap-2 mb-3 overflow-hidden overflow-x-auto">
      <HeaderCurso />
      <ListCourse />
    </section>
  );
};

export default Cursos;
