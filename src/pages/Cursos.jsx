import HeaderCurso from "../components/curso/HeaderCurso";
import ListCourse from "../components/curso/ListCourse";
import { CursoProvider } from "../context/CursoProvider";
// import SelectPeriodo from "../components/SelectPeriodo";

const Cursos = () => {
  return (
    <section className="relative w-auto flex flex-col gap-2 mb-3 overflow-hidden overflow-x-auto">
      <CursoProvider>
        {/* ver como controlar periodo */}
        <HeaderCurso />
        <ListCourse />

      </CursoProvider>
    </section>
  );
};

export default Cursos;
