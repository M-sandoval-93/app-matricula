import { useLoaderData } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler";
import SelectPeriodo from "../components/SelectPeriodo";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { CourseProvider } from "../context/CourseProvider";
import HeaderCourse from "../components/course/HeaderCourse";
import TableCourse from "../components/course/TableCourse";

const Course = () => {
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
          <CourseProvider>
            <SelectPeriodo />
            <HeaderCourse />

            <TableCourse />
          </CourseProvider>
        </section>
      )}
    </>
  );
};

export default Course;
