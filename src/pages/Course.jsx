import { useLoaderData } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler";
import SelectPeriodo from "../components/SelectPeriodo";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { CourseProvider } from "../context/CourseProvider";
import HeaderCourse from "../components/course/HeaderCourse";
import TableCourse from "../components/course/TableCourse";
import apiGet from "../api/apiGet";

const Course = () => {
  const { response, error } = useLoaderData();
  const { authPeriodo, setClassStartDate, setProcesoMatricula } = useAuth();
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      // actualización del estado del proceso de matricula
      setProcesoMatricula(response);

      // obtenión de la fecha de inicio de clases
      apiGet({ route: `course/getClassStartDate/${authPeriodo}` }).then(
        (result) => setClassStartDate(result?.data)
      );

      setDataFetched(true);
    }
  }, [response, dataFetched]);

  return (
    <>
      {error ? (
        <ErrorHandler error={error} />
      ) : (
        dataFetched && (
          <section className="relative w-auto flex flex-col gap-2 mb-3 overflow-hidden overflow-x-auto">
            <CourseProvider>
              <SelectPeriodo />
              <HeaderCourse />
              <TableCourse />
            </CourseProvider>
          </section>
        )
      )}
    </>
  );
};

export default Course;
