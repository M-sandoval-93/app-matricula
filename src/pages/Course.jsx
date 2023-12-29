import { useLoaderData } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler";
import SelectPeriodo from "../components/SelectPeriodo";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { CourseProvider } from "../context/CourseProvider";
import HeaderCourse from "../components/course/HeaderCourse";
import TableCourse from "../components/course/TableCourse";
import ListCourse from "../components/course/ListCourse";

const Course = () => {
  const { response, error } = useLoaderData();
  const { setProcesoMatricula } = useAuth();

  useEffect(() => {
    setProcesoMatricula(response);
  }, [response]);

  return (
    <>
      {error ? (
        <ErrorHandler error={error} />
      ) : (
        <section className="relative w-auto flex flex-col gap-2 mb-3 overflow-hidden overflow-x-auto">
          <CourseProvider>
            <SelectPeriodo />
            <HeaderCourse />

            {/* <ListCourse /> */}

            <TableCourse />
          </CourseProvider>
        </section>
      )}
    </>
  );
};

export default Course;
