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
  // hook personalizados para trabajar con el contexto de matricula
  const { matricula, getDataMatricula, periodo } = useMatricula();

  // estado para lsa variables del modulo de matricula
  const [stateMatricula, setStateMatricula] = useState({
    filter: "",
    loading: false,
    stateModal: false,
    newMatricula: true,
    idMatricula: "",
    error: null,
  });

  // actualizador del estado de las variables del modulo de matricula
  const updateStateMatricula = (newState) => {
    setStateMatricula((prev) => ({ ...prev, ...newState }));
  };

  // función para setear estados al cerrar el modal
  const onCloseModal = () => {
    updateStateMatricula({
      stateModal: false,
      newMatricula: true,
      idMatricula: "",
    });
  };

  // efecto inicial, para consultar la data de la tabla
  // a la escucha del cambio de periodo seleccionado
  useEffect(() => {
    updateStateMatricula({ loading: true });

    apiGet({ route: "matricula/getAll", param: periodo })
      .then((response) => {
        getDataMatricula(response.data);
        updateStateMatricula({ loading: false });
      })
      .catch((error) => {
        updateStateMatricula({
          error: error,
          loading: false,
        });
      });
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
        stateModal={stateMatricula.stateModal} // Estado del modal
        onCloseModal={onCloseModal} // metodo para setear modal al cerrar
        newMatricula={stateMatricula.newMatricula} // Estado para controlar new/edit
        idMatricula={stateMatricula.idMatricula} // estado para el id a editar
      />

      <ErrorHandler error={stateMatricula.error} />
    </main>
  );
};

export default TableMatricula;
