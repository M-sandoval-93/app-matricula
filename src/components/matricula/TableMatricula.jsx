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
import ModalMatricula from "../../templates/ModalMatricula";
import useMatricula from "../../hooks/useMatricula";
import apiGet from "../../api/apiGet";

const TableMatricula = () => {
  const { matricula, getCountMatricula, getDataMatricula } = useMatricula();
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClose = () => setOpen(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // actualización de los datos de matrícula
      apiGet({ route: "matricula/getAll" })
        .then((response) => {
          getDataMatricula(response.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }, 200);
  }, []);

  return (
    <div className="relative rounded-md border border-gray-200 p-2">
      <div>
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
      </div>

      <ModalMatricula open={open} onClose={onClose} />
    </div>
  );
};

export default TableMatricula;
