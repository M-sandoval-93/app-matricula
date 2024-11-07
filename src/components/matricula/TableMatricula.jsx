import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import InfoDataTable from "../dataTable/InfoDataTable";
import HeaderTableMatricula from "./HeaderTableMatricula";
import { columnsMatricula } from "./DataMatricula";
import {
  providerFilter,
  providerPaginationComponent,
} from "../../utils/providerDataTable";
import SubTableMatricula from "./SubTableMatricula";
import useMatricula from "../../hooks/useMatricula";
import apiGet from "../../api/apiGet";

import ModalMatricula from "../../templates/ModalMatricula";
import ErrorHandler from "../ErrorHandler";
import ModalMatriculaReport from "../../templates/ModalMatriculaReport";
import useAuth from "../../hooks/useAuth";
import customStyle from "../../style/styleDataTable";
import { getDataOfSheets } from "../../utils/funciones";
import { dataLoader } from "../../utils/dataLoadStudent";

const TableMatricula = () => {
  // hook personalizados para trabajar con el contexto de matricula
  const { authPeriodo, authProcesoMatricula } = useAuth();
  const { matricula, updateDataMatricula } = useMatricula();

  // estado para las variables del modulo de matricula
  const [stateMatricula, setStateMatricula] = useState({
    filter: "", // datos para el filtro de la tabla
    loading: false, // estado de la carga de datos
    stateModalMatricula: false, // estado del modal de matricula
    stateModalReport: false, // estado del modal de reportes
    newMatricula: true, // estado para el ingreso de una matricula agregar/editar
    idMatricula: "", // id para modificar una matricula
    errorMatricula: null, // estado para el control de errores
  });

  // actualizador del estado de las variables del modulo de matricula
  const updateStateMatricula = (newState) => {
    setStateMatricula((prev) => ({ ...prev, ...newState }));
  };

  // función para setear estados al cerrar el modal de matricula
  const onCloseModal = () => {
    updateStateMatricula({
      stateModalMatricula: false,
      stateModalReport: false,
      newMatricula: true,
      idMatricula: "",
    });
  };

  // efecto inicial, para consultar la data de la tabla
  // a la escucha del cambio de periodo seleccionado
  useEffect(() => {
    updateStateMatricula({ loading: true });

    apiGet({ route: "matricula/getAll", param: authPeriodo })
      .then((response) => {
        // lista de matriculados
        const listMatricula = response?.data;

        // cantidad de matriculados
        const matriculados = listMatricula.filter(
          (count) =>
            count.estado === "MATRICULADO (A)" ||
            count.estado === "SUSPENDIDO (A)"
        ).length;

        // cantidad de retirados
        const retirados = listMatricula.filter(
          (count) => count.estado === "RETIRADO (A)"
        ).length;

        updateDataMatricula({
          matricula: listMatricula,
          countMatriculados: matriculados,
          countRetirados: retirados,
        });
        
        // obtener datos de matricula del formulario y almacenarlos en un contexto
        if (authProcesoMatricula) {
          dataLoader({updateStateMatricula: updateStateMatricula, updateDataMatricula: updateDataMatricula});
        } else {
          updateStateMatricula({loading: false});
        }

      })
      .catch((error) => {
        updateStateMatricula({
          errorMatricula: error,
          loading: false,
        });
      });

  }, [authPeriodo]);



  return (
    <main className="relative flex flex-col rounded-md border border-gray-200 p-2 my-2">
      <section >
        <DataTable
          customStyles={customStyle}
          subHeader
          subHeaderComponent={HeaderTableMatricula({
            filter: stateMatricula.filter,
            updateStateMatricula,
          })}
          columns={columnsMatricula({ updateStateMatricula })}
          data={providerFilter({
            data: matricula,
            filter: stateMatricula.filter,
          })}
          highlightOnHover
          responsive
          persistTableHead
          noDataComponent={InfoDataTable()}
          pagination
          paginationComponentOptions={providerPaginationComponent}
          expandableRows
          expandOnRowDoubleClicked
          expandableRowsComponent={SubTableMatricula}
          progressPending={stateMatricula.loading}
        />
      </section>

      {/* Modal multiuso para matricula */}
      <ModalMatricula
        stateMatricula={stateMatricula} // estado del modulo de matricula
        onCloseModal={onCloseModal} // metodo para setear modal al cerrar
      />

      {/* Modal para descargar registro de matricula */}
      <ModalMatriculaReport
        stateMatricula={stateMatricula}
        onCloseModal={onCloseModal}
      />

      {/* componente para manejar los errores */}
      <ErrorHandler error={stateMatricula.errorMatricula} />
    </main>
  );
};

export default TableMatricula;
