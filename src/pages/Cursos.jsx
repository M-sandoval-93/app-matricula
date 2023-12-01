import { useLoaderData } from "react-router-dom";
import HeaderCurso from "../components/curso/HeaderCurso";
import ListCourse from "../components/curso/ListCourse";
import { CursoProvider } from "../context/CursoProvider";
import ErrorHandler from "../components/ErrorHandler";
import SelectPeriodo from "../components/SelectPeriodo";

const Cursos = () => {
  const { response, error } = useLoaderData();

  return (
    <>
      {error ? (
        <ErrorHandler error={error} />
      ) : (
        <section className="relative w-auto flex flex-col gap-2 mb-3 overflow-hidden overflow-x-auto">
          <CursoProvider response={response}>
            {/* <SelectPeriodo /> */}
            <SelectPeriodo modulo={"curso"} />
            <HeaderCurso />
            <ListCourse />
          </CursoProvider>
        </section>
      )}
    </>
  );
};

export default Cursos;
