import DataTable from "react-data-table-component";
import InfoDataTable from "../dataTable/InfoDataTable";
import {
  providerFilter,
  providerPaginationComponent,
} from "../../utils/providerDataTable";
import { useEffect, useState } from "react";
import useProcesoMatricula from "../../hooks/useProcesoMatricula";
import apiGet from "../../api/apiGet";
import useAuth from "../../hooks/useAuth";
import ErrorHandler from "../ErrorHandler";

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
  const updateProcessMatricula = (newState) => {
    setProcessMatricula((prevData) => ({ ...prevData, ...newState }));
  };

  useEffect(() => {
    updateProcessMatricula({ loadingProcessMatricula: true });

    apiGet({
      route: "matricula/getStatusProcessMatricula",
      param: authPeriodo,
    })
      .then((response) => {
        updateDataProcesoMatricula({ listProcessMatricula: response?.data });
        updateProcessMatricula({ loadingProcessMatricula: false });
      })
      .catch((error) => {
        updateProcessMatricula({
          errorProcessMatricula: error,
          loadingProcessMatricula: false,
        });
      });
  }, []);

  // useEfect para consultar data de lista sae
  return (
    <main className="relative rounded-md border border-gray-200 p-2">
      <section>
        <DataTable
          // customStyles={customStyleProcessMatricula}
          fixedHeader
          fixedHeaderScrollHeight="540px"
          subHeader
          // subHeaderComponent={}
          // columns={columnsProcessMatricula({actualizador de datos})}
          //   data={providerFilter({
          //     data: listProcessMatricula,
          //     filter: processMatricula.filterProcessMatricula,
          //   })}
          data={listProcessMatricula}
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
