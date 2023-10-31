import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import InfoDataTable from "../dataTable/InfoDataTable";
import HeaderTableMatricula from "./HeaderTableMatricula";
import { columnsMatricula } from "./DataMatricula";
import {
  providerFilter,
  providerPaginationComponent,
} from "../../utils/providerDataTable";
import { customStyle } from "./styleDataTable";
import SubTableMatricula from "./SubTableMatricula";
import useMatricula from "../../hooks/useMatricula";
import apiGet from "../../api/apiGet";

import ModalMatricula from "../../templates/ModalMatricula";
import ErrorHandler from "../ErrorHandler";

const TableMatricula = () => {
  const { matricula, getDataMatricula, periodo } = useMatricula();
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      apiGet({ route: "matricula/getAll", param: periodo })
        .then((response) => {
          getDataMatricula(response.data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, 200);
  }, [periodo]);

  return (
    <main className="relative rounded-md border border-gray-200 p-2">
      <section>
        <DataTable
          customStyles={customStyle}
          fixedHeader
          fixedHeaderScrollHeight="540px"
          subHeader
          subHeaderComponent={HeaderTableMatricula({
            filter,
            setFilter,
            setOpen,
          })}
          columns={columnsMatricula}
          data={providerFilter({ data: matricula, filter })}
          highlightOnHover
          responsive
          persistTableHead
          noDataComponent={InfoDataTable()}
          pagination
          paginationComponentOptions={providerPaginationComponent}
          expandableRows
          expandOnRowDoubleClicked
          expandableRowsComponent={SubTableMatricula}
          progressPending={loading}
        />
      </section>

      <ModalMatricula open={open} onClose={onClose} />
      <ErrorHandler error={error} />
    </main>
  );
};

export default TableMatricula;
