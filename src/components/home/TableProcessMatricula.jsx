import DataTable from "react-data-table-component";
import InfoDataTable from "../dataTable/InfoDataTable";
import {
  providerFilter,
  providerPaginationComponent,
} from "../../utils/providerDataTable";
import { useCallback, useEffect, useState } from "react";
import useProcesoMatricula from "../../hooks/useProcesoMatricula";
import apiGet from "../../api/apiGet";
import useAuth from "../../hooks/useAuth";
import ErrorHandler from "../ErrorHandler";
import HeaderTableProcessMatricula from "./HeaderTableProcessMatricula";
import { columnsProcessMatricula } from "./DataProcessMatricula";
import customStyle from "../../style/styleDataTable";

const TableProcessMatricula = () => {
  const { authPeriodo } = useAuth();
  const { listProcessMatricula, updateDataProcesoMatricula } =
    useProcesoMatricula();

  const [processMatricula, setProcessMatricula] = useState({
    filterProcessMatricula: "",
    loadingProcessMatricula: false,
    errorProcessMatricula: null,
  });

  // actualizador de estados
  const updateProcessMatricula = useCallback((newState) => {
    setProcessMatricula((prevDate) => ({ ...prevDate, ...newState }));
  }, []);

  useEffect(() => {
    updateProcessMatricula({ loadingProcessMatricula: true });

    apiGet({
      route: "matricula/getStatusProcessMatricula",
      param: authPeriodo,
    })
      .then((response) => {
        const listSae = response?.data;
        const matriculados = listSae.filter((count) => count.estado_matricula === true).length;
        const listSaeNew = listSae.filter((count) => count.estudiante_nuevo === true).length;

        const matriculadosNew = listSae.filter((count) => count.estado_matricula === true && count.estudiante_nuevo === true).length;

        const noMatriculadosNew = listSae.filter((count) => count.estado_matricula === false && count.estudiante_nuevo === true).length;

        // Asignación de los datos del contexto
        updateDataProcesoMatricula({
          listProcessMatricula: listSae,
          countList: listSae.length,
          countMatriculados: matriculados,
          countNoMatriculados: listSae.length - matriculados,
          countListNew: listSaeNew,
          countListContinue: listSae.length - listSaeNew,
          countMatriculadosNew: matriculadosNew,
          countMatriculadosContinue: matriculados - matriculadosNew,
          countNoMatriculadosNew: noMatriculadosNew,
          countNoMatriculadosContinue: (listSae.length - matriculados) - noMatriculadosNew,
        });

        updateProcessMatricula({ loadingProcessMatricula: false });
      })
      .catch((error) => {
        updateProcessMatricula({
          errorProcessMatricula: error,
          loadingProcessMatricula: false,
        });
      });
  }, []);

  return (
    <main className="relative rounded-md border border-gray-200 p-2">
      <section>
        <DataTable
          customStyles={customStyle}
          fixedHeader
          fixedHeaderScrollHeight="540px"
          subHeader
          subHeaderComponent={HeaderTableProcessMatricula({
            filter: processMatricula.filterProcessMatricula,
            updateProcessMatricula,
          })}
          columns={columnsProcessMatricula()}
          data={providerFilter({
            data: listProcessMatricula,
            filter: processMatricula.filterProcessMatricula,
          })}
          highlightOnHover
          persistTableHead
          noDataComponent={InfoDataTable()}
          pagination
          paginationComponentOptions={providerPaginationComponent}
          progressPending={processMatricula.loadingProcessMatricula}
        />
      </section>

      {/* componente para manejar los errores */}
      <ErrorHandler error={processMatricula.errorProcessMatricula} />
    </main>
  );
};

export default TableProcessMatricula;
