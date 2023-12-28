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
  const { authPeriodo } = useAuth();
  const { course, updateDataCourse } = useCourse();

  // estado para las variables del modulo de curso
  const [stateCourse, setStateCourse] = useState({
    filterCourse: "", // datos para el filtro de la tabla
    idMatriculaCourse: "", // id de la matricula para asignar el curso
    loadingCourse: false, // estado de la carga de datos
    errorCourse: null, // estado para el control de errores
  });

  // actualizador del estado de las variables del modulo de curso
  const updateStateCourse = useCallback((newState) => {
    setStateCourse((prevState) => ({ ...prevState, ...newState }));
  }, []);

  useEffect(() => {
    // updateStateCourse({ loadingCourse: true });

    // const getDataCourse = async () => {
    //   try {
    //     const responseCourse = await apiGet({
    //       route: "course/getCourseAll",
    //       param: authPeriodo,
    //     });

    //     const dataCourse = await responseCourse?.data;
    //     await updateDataCourse({
    //       course: dataCourse,
    //       grade: {
    //         septimo: dataCourse.filter((count) => count.grado === 7).length,
    //         octavo: dataCourse.filter((count) => count.grado === 8).length,
    //         primero: dataCourse.filter((count) => count.grado === 1).length,
    //         segundo: dataCourse.filter((count) => count.grado === 2).length,
    //         tercero: dataCourse.filter((count) => count.grado === 3).length,
    //         cuarto: dataCourse.filter((count) => count.grado === 4).length,
    //       },
    //     });
    //   } catch (error) {
    //     updateStateCourse({ errorCourse: error });
    //   } 
    // };

    // getDataCourse();

    updateStateCourse({ loadingCourse: true });

    // petición para obtener lista de cursos
    apiGet({ route: "course/getCourseAll", param: authPeriodo })
      .then((response) => {
        const dataCourse = response?.data;

        updateDataCourse({
          course: dataCourse,
          grade: {
            septimo: dataCourse.filter((count) => count.grado === 7).length,
            octavo: dataCourse.filter((count) => count.grado === 8).length,
            primero: dataCourse.filter((count) => count.grado === 1).length,
            segundo: dataCourse.filter((count) => count.grado === 2).length,
            tercero: dataCourse.filter((count) => count.grado === 3).length,
            cuarto: dataCourse.filter((count) => count.grado === 4).length,
          },
        });
        updateStateCourse({ loadingCourse: false });
      })
      .catch((error) => {
        updateStateCourse({errorCourse: error});
      });

    // petición para obtener lista de letras 
    apiGet({ route: "course/getListCourse", param: authPeriodo })
      .then((response) => {
        updateDataCourse({letter: response?.data?.listCourse});
        // console.log(response?.data.listCourse);
      })
      .catch((error) => {
        updateStateCourse({errorCourse: error});
      })

    updateStateCourse({ loadingCourse: true });

  }, [authPeriodo]);

  return (
    <main className="relative rounded-md border border-gray-200 p-2">
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
          columns={columnsCourse()}
          data={providerFilter({
            data: course,
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
      <ErrorHandler error={stateCourse.errorCourse} />
    </main>
  );
};

export default TableCourse;
