import useAuth from "../../hooks/useAuth";
import StudenStatusButton from "../StudentStatusButton";
import withDrawalMatricula from "./withDrawalMatricula";

// funciones
import { functionSortStates } from "../../utils/sortFunctions";
import { exportCertificates } from "../../utils/downloadFunctions";

// iconos
import RegistrationActionButton from "./RegistrationActionButton";
import useMatricula from "../../hooks/useMatricula";

export const columnsMatricula = ({ updateStateMatricula }) => {
  const {
    bloqueoPeriodoActual,
    authProcesoMatricula,
    authPeriodo,
    authPrivilege,
  } = useAuth();
  const { matricula, updateDataMatricula } = useMatricula();

  return [
    {
      name: "Matrícula",
      selector: (row) => row.matricula,
      width: "110px",
      center: true,
    },
    {
      name: "Rut",
      selector: (row) => row.rut,
      width: "130px",
    },
    {
      name: "Ap. paterno",
      selector: (row) => row.paterno,
      width: "130px",
      sortable: true,
    },
    {
      name: "Ap. materno",
      selector: (row) => row.materno,
      width: "130px",
      sortable: true,
    },
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      width: "220px",
      sortable: true,
    },
    {
      name: "Grado",
      selector: (row) => row.grado,
      width: "90px",
      center: true,
      sortable: true,
    },
    {
      name: "Curso",
      selector: (row) => row.curso,
      width: "80px",
      center: true,
    },
    {
      name: "Estado",
      cell: (row) => <StudenStatusButton estado={row.estado} />,
      width: "140px",
      center: true,
      sortFunction: functionSortStates,
    },
    {
      name: "Acciones",
      center: true,
      grow: 2,
      cell: (row) => (
        <div className="flex gap-4">
          {/* boton para descargar certificado */}
          <RegistrationActionButton
            title={"Descargar certificado"}
            onClick={() =>
              exportCertificates({
                bloqueoPeriodoActual,
                authProcesoMatricula,
                rut: row.rut.slice(0, row.rut.length - 2),
                updateStateMatricula,
                authPeriodo,
                authPrivilege,
                estado: row.estado,
                curso: row.curso,
              })
            }
          />

          {/* boton para editar una matricula */}
          <RegistrationActionButton
            title={"Editar matrícula"}
            onClick={() => {
              // comprobar estado de la matricula, para poder hacer la asignación o cambio
              if (row.estado === "RETIRADO (A)") {
                updateStateMatricula({
                  error: {
                    message: "Advertencia: Estudiante retirado !",
                  },
                });
                return;
              }

              updateStateMatricula({
                stateModalMatricula: true, // Cambio de estado para lanzar el modal
                newMatricula: false, // Cambio de estado para modo edicion
                idMatricula: row.id, // asignación del id de la matrícula
              });
            }}
          />

          {/* boton para retirar una matricula */}
          <RegistrationActionButton
            title={"Baja de matrícula"}
            // onClick={() => alert("prueba baja matricula")}
            onClick={() =>
              withDrawalMatricula({
                matricula,
                updateDataMatricula,
                updateStateMatricula,
                idMatricula: row.id,
                authPeriodo,
                authPrivilege,
              })
            }
          />
        </div>
      ),
    },
  ];
};
