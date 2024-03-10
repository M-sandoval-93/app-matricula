import { useCallback, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import apiGet from "../../api/apiGet";
import DataTable from "react-data-table-component";
import customStyle from "../../style/styleDataTable";
import ErrorHandler from "../ErrorHandler";
import {
  providerFilter,
  providerPaginationComponent,
} from "../../utils/providerDataTable";
import InfoDataTable from "../dataTable/InfoDataTable";
import { columnsCourse } from "./DataCourse";
import HeaderTableCourse from "./HeaderTableCourse";
import useCourse from "../../hooks/useCourse";

const TableCourse = () => {
  // ver las variables grobales que utilizare
  const { authPeriodo, error } = useAuth();
  const { filterCourseContex, updateDataCourse } = useCourse();

  // estado para las variables del modulo de curso
  const [stateCourse, setStateCourse] = useState({
    filterCourse: "", // datos para el filtro de la tabla
    idMatriculaCourse: "", // id de la matricula para asignar el curso
    loadingCourse: false, // estado de la carga de datos
    // errorCourse: null, // estado para el control de errores
  });

  // actualizador del estado de las variables del modulo de curso
  const updateStateCourse = useCallback((newState) => {
    setStateCourse((prevState) => ({ ...prevState, ...newState }));
  }, []);

  useEffect(() => {
    // se establece el estado de carga
    updateStateCourse({ loadingCourse: true });

    // petición para obtener lista de cursos
    const getCourseAll = apiGet({
      route: "course/getCourseAll",
      param: authPeriodo,
    })
      .then((response) => {
        const dataCourse = response?.data;
        updateDataCourse({
          course: dataCourse,
          filterCourseContex: dataCourse,
        });
      })
      .catch((error) => {
        updateStateCourse({ errorCourse: error });
      });

    // petición para obtener lista grados y sus letras correspondientes
    const getListCourse = apiGet({
      route: "course/getListCourse",
      param: authPeriodo,
    })
      .then((response) => {
        updateDataCourse({ listCourseForGrade: response?.data });
      })
      .catch((error) => {
        updateStateCourse({ errorCourse: error });
      });

    // ejecutar una acción al terminar todas las peticiones (promesas)
    Promise.all([getCourseAll, getListCourse]).finally(() => {
      updateStateCourse({ loadingCourse: false, dataFetched: true });
    });
  }, [authPeriodo]);

  return (
    <main className="relative rounded-md border border-gray-200 p-2 my-2">
      <section>
        <DataTable
          customStyles={customStyle}
          fixedHeader
          fixedHeaderScrollHeight="540px"
          subHeader
          subHeaderComponent={HeaderTableCourse({
            filter: stateCourse.filterCourse,
            updateStateCourse,
          })}
          columns={columnsCourse({ updateStateCourse })}
          data={providerFilter({
            data: filterCourseContex,
            filter: stateCourse.filterCourse,
          })}
          highlightOnHover
          responsive
          persistTableHead
          noDataComponent={InfoDataTable()}
          pagination
          paginationComponentOptions={providerPaginationComponent}
          //   expandableRows
          //   expandOnRowDoubleClicked
          //   expandableRowsComponent={SubTableMatricula}
          progressPending={stateCourse.loadingCourse}
        />
      </section>

      {/* componente para manejar los errores */}
      <ErrorHandler error={error} />
      {/* <ErrorHandler error={stateCourse.errorCourse} /> */}
    </main>
  );
};

export default TableCourse;
