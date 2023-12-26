import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth";
import useCurso from "../../hooks/useCurso";
import apiGet from "../../api/apiGet";
import DataTable from "react-data-table-component";
import customStyle from "../../style/styleDataTable";
import ErrorHandler from "../ErrorHandler";
import { providerFilter, providerPaginationComponent } from "../../utils/providerDataTable";
import InfoDataTable from "../dataTable/InfoDataTable";

const TableCourse = () => {
    // ver las variables grobales que utilizare
    const {authPeriodo} = useAuth();
    const {course, updateDataCurso} = useCurso();

    // estado para las variables del modulo de curso
    const [stateCourse, setStateCourse] = useState({
        filterCourse: "", // datos para el filtro de la tabla
        idMatriculaCourse: "", // id de la matricula para asignar el curso
        loadingCourse: false, // estado de la carga de datos
        errorCourse: null, // estado para el control de errores
    });

    // actualizador del estado de las variables del modulo de curso
    const updateStateCouse = (newSate) => {
        setStateCourse((prev) => ({...prev, ...newSate}));
    };

    // efecto inicial para consultar la data de la tabla
    // a la escucha del cambio de periodo seleccionado

    useEffect(() => {
        updateStateCouse({loadingCourse: true});

        apiGet({route: "course/getCourseAll", param: authPeriodo})
            .then((response) => {
                // const listMatriculaCourse = response?.data;
            
                // Asignación de datos 
                updateDataCurso({course: response?.data});
                updateStateCouse({loadingCourse: false});
        })
            .catch((error) => {
            updateStateCouse({
                errorCourse: error,
                loadingCourse:false,
            });
        });

    }, [authPeriodo]);

    // adicionalmente el efecto debera esta a la escucha de la seleccion del grado y curso
    // con la finalidad de aplicar filtro sobre la data

    // ver si aplico peticiones por cada filtro 
    return (
        <main className="relative rounded-md border border-gray-200 p-2">
            <section>
                <DataTable
                    customStyles={customStyle}
                    fixedHeader
                    fixedHeaderScrollHeight="540px"
                    subHeader
                    // subHeaderComponent={HeaderTableMatricula({
                    //     filter: stateMatricula.filter,
                    //     updateStateMatricula,
                    // })}
                    // columns={columnsMatricula({ updateStateMatricula })}
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
                    expandableRows
                    expandOnRowDoubleClicked
                    // expandableRowsComponent={SubTableMatricula}
                    progressPending={stateCourse.loadingCourse}
                            
                />
            </section>

            {/* componente para manejar los errores */}
            <ErrorHandler error={stateCourse.errorCourse} />

        </main>
    )


    
}

export default TableCourse;