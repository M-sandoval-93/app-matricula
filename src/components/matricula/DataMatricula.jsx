import useAuth from "../../hooks/useAuth";
import withDrawalMatricula from "./withDrawalMatricula";

// funciones
import { exportCertificates, exportRegistrationForm } from "../../utils/downloadFunctions";

// iconos
import RegistrationActionButton from "./RegistrationActionButton";
import useMatricula from "../../hooks/useMatricula";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import { FaBan, FaCheck } from "react-icons/fa";
import ButtonEditMatricula from "./ButtonEditMatricula";

export const columnsMatricula = ({ updateStateMatricula }) => {
  const {
    bloqueoPeriodoActual,
    authProcesoMatricula,
    authPeriodo,
    authPrivilege,
    updateAuthProvider,
    authUserName,
  } = useAuth();
  const { matricula, updateDataMatricula, dataFormMatricula } = useMatricula();

  // función para descargar ficha de matricula
  const getFichaMatricula = (row, authUserName) => {
    const {rut, matricula, grado, estudiante_nuevo} = row
    const fichaMatricula = dataFormMatricula.filter((ficha) => ficha["RUN (Ejemplo 12345678-9) ESTUDIANTE"] === rut);

    

    // validamos que exista preMatricula, de lo contrario no descarga ficha
    if (!fichaMatricula[0]) {
      // modal para redireccionar al formulario de prematricula
      Swal.fire({
        title: "warning",
        text: "El estudiante no cuenta con datos para la ficha !",
        icon: "warning",
        footer: `<a href="https://forms.gle/7faU4ddcoUBddtfj9" target="_blanck" class="text-blue-600 font-semibold text-xl decoration-2">¡ Completar Pre Matrícula !</a>`
      });

      return;
    }

    fichaMatricula[0].n_matricula = matricula;
    fichaMatricula[0].grado_curso = grado;
    fichaMatricula[0].funcionarioRegistrador = authUserName;
    fichaMatricula[0].tipoMatricula = estudiante_nuevo === null ? true : estudiante_nuevo;
    exportRegistrationForm({dataForm: fichaMatricula[0], rut});
  }

  const statePreMatricula = (rut) => {    
    const fichaMatricula = dataFormMatricula.filter((ficha) => ficha["RUN (Ejemplo 12345678-9) ESTUDIANTE"] === rut);

    return fichaMatricula[0] 
      // ? <Chip radius="md" color="success">Ficha Completa</Chip>
      ? (<Button isIconOnly color="success" aria-label="ficha completa" radius="full" disabled>
          <FaCheck size={20} />
        </Button>)
      // : <Chip radius="md" color="danger">Sin Pre Matrícula</Chip>
      : (<Button isIconOnly color="danger" aria-label="ficha completa" radius="full" disabled>
          <FaBan size={20} />
        </Button>)
  }



  return [
    {
      name: "Matrícula",
      selector: (row) => row.matricula,
      width: "6rem",
      center: true,
    },
    {
      name: "Rut",
      selector: (row) => row.rut,
      width: "7.5rem",
    },
    {
      name: "1er apellido",
      selector: (row) => row.paterno,
      // width: "8.2rem",
      sortable: true,
    },
    {
      name: "2do apellido",
      selector: (row) => row.materno,
      // width: "8.2rem",
      sortable: true,
    },
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      // grow: 1,
      sortable: true,
    },
    {
      name: "Grado",
      selector: (row) => row.grado,
      // width: "6rem",
      center: true,
      sortable: true,
    },
    {
      name: "Curso",
      selector: (row) => row.curso,
      // width: "6rem",
      center: true,
    },
    // // no mostrar en proceso de matricula
    // {
    //   name: "Estado",
    //   cell: (row) => <StudenStatusButton estado={row.estado} />,
    //   center: true,
    //   sortFunction: functionSortStates,
    // },
    {
      name: "Pre Matricula",
      width: "7rem",
      center: true,
      cell: (row) => statePreMatricula(row.rut)
    },
    {
      name: "Modificación",
      center: true,
      cell: (row) => <ButtonEditMatricula row={row} authPeriodo={authPeriodo} disable={row.tiene_detalle} />
    },
    {
      name: "Acciones",
      center: true,
      // grow: 1,
      width: "20rem",
      cell: (row) => (
        <div className="relative flex gap-4">
          {/* boton para descargar ficha de matricula */}
          <RegistrationActionButton 
            title={"Ficha matricula"} 
            onClick={() => getFichaMatricula(row, authUserName )} 
          />

          {/* boton para descargar certificado */}
          {
            authPrivilege !== "5" && (
              <RegistrationActionButton
                title={"Descargar certificado"}
                onClick={() =>
                  exportCertificates({
                    bloqueoPeriodoActual,
                    authProcesoMatricula,
                    rut: row.rut.slice(0, row.rut.length - 2),
                    authPeriodo,
                    authPrivilege,
                    updateStateMatricula,
                    updateDataMatricula,
                    estado: row.estado,
                    curso: row.curso,
                  })
                }
              />
            )
          }
          

          {/* boton para editar una matricula */}
          {
            authPrivilege !== "5" && (
              <RegistrationActionButton
                title={"Editar matrícula"}
                onClick={() => {
                  // comprobar estado de la matricula, para poder hacer la asignación o cambio
                  if (row.estado === "RETIRADO (A)") {
                    updateDataMatricula({
                      error: { message: "Advertencia: Estudiante retirado !" },
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
            )
          }
          

          {/* boton para retirar una matricula */}
          <RegistrationActionButton
            title={"Baja de matrícula"}
            onClick={() =>
              withDrawalMatricula({
                matricula,
                updateStateMatricula,
                updateDataMatricula,
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
