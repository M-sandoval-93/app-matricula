import { useLoaderData } from "react-router-dom";
import HeaderCurso from "../components/curso/HeaderCurso";
import ListCourse from "../components/curso/ListCourse";
import { CursoProvider } from "../context/CursoProvider";
import ErrorHandler from "../components/ErrorHandler";
import SelectPeriodo from "../components/SelectPeriodo";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import TableCourse from "../components/curso/TableCourse";

const Cursos = () => {
  const { response, error } = useLoaderData();
  const { setProcesoMatricula } = useAuth();

  useEffect(() => {
    setProcesoMatricula(response);
  }, [response]);

  // consideraciones;
  //  -> obtener cantidad de estudiantes por grado
  //  -> obtener cantidad de cursos, para generar tarjetas
  //  -> colorear y habilitar cantidad de cursos según grado presionado junto con sus respectivas cantidades
  //  -> aplicar filtro en tabla según grado y curso

  // nota; restablecer filtro al cambiar de grado

  return (
    <>
      {error ? (
        <ErrorHandler error={error} />
      ) : (
        <section className="relative w-auto flex flex-col gap-2 mb-3 overflow-hidden overflow-x-auto">
          <CursoProvider>
            <SelectPeriodo />
            <HeaderCurso />

            {/* <ListCourse /> */}

            <TableCourse />
          </CursoProvider>
        </section>
      )}
    </>
  );
};

export default Cursos;
