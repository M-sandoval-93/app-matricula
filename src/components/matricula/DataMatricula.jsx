import useAuth from "../../hooks/useAuth";
import StudenStatusButton from "../StudentStatusButton";
import withDrawalMatricula from "./withDrawalMatricula";

// funciones
import { functionSortStates } from "../../utils/sortFunctions";
import { exportCertificates, exportRegistrationForm } from "../../utils/downloadFunctions";

// iconos
import RegistrationActionButton from "./RegistrationActionButton";
import useMatricula from "../../hooks/useMatricula";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import { FaBan, FaCheck } from "react-icons/fa";
import ButtonEditMatricula from "./ButtonEditMatricula";
import apiGet from "../../api/apiGet";

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

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-blue-500 rounded-lg px-3 py-3 text-white mx-2",
      cancelButton: "bg-red-500 rounded-lg px-3 py-3 text-white mx-2"
    },
    buttonsStyling: false,
  });

  // función para descargar ficha de matricula
  const getFichaMatricula = (row, authUserName) => {
    const { rut, matricula, grado, estudiante_nuevo } = row
    const fichaMatricula = dataFormMatricula.filter((ficha) => ficha["RUN (Ejemplo 12345678-9) ESTUDIANTE"].toUpperCase() === rut.toUpperCase());

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

    fichaMatricula[0].id_registro = row.id;
    fichaMatricula[0].periodo = authPeriodo;
    fichaMatricula[0].n_matricula = matricula;
    fichaMatricula[0].grado_curso = grado;
    fichaMatricula[0].funcionarioRegistrador = authUserName;
    fichaMatricula[0].tipoMatricula = estudiante_nuevo === null ? true : estudiante_nuevo;

    apiGet({ route: `matricula/checkDownloadFile/${row.id}/${authPeriodo}` }).then((response) => {
      if (response.data) {
        swalWithBootstrapButtons.fire({
          title: "Ficha ya descargada",
          text: "Esta seguro que desea descargar nuevamente la ficha ?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Descargar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            exportRegistrationForm({ dataForm: fichaMatricula[0], rut });
          }
        })
      } else {
        exportRegistrationForm({ dataForm: fichaMatricula[0], rut });
      }

    });
  }

  const statePreMatricula = (rut) => {
    const fichaMatricula = dataFormMatricula.filter((ficha) => ficha["RUN (Ejemplo 12345678-9) ESTUDIANTE"].toUpperCase() === rut.toUpperCase());

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
      sortable: true,
    },
    {
      name: "2do apellido",
      selector: (row) => row.materno,
      sortable: true,
    },
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      sortable: true,
    },
    {
      name: "Grado",
      selector: (row) => row.grado,
      center: true,
      sortable: true,
    },
    {
      name: "Curso",
      selector: (row) => row.curso,
      center: true,
    },

    // Condición para mostrar el estado de la matricula
    ...(!authProcesoMatricula
      ? [
        {
          name: "Estado",
          cell: (row) => <StudenStatusButton estado={row.estado} />,
          center: true,
          sortFunction: functionSortStates,
        },
      ]
      : []),

    // condición para mostrar el estado de la prematricula
    ...(authProcesoMatricula
      ? [
        {
          name: "Pre Matricula",
          width: "7rem",
          center: true,
          cell: (row) => statePreMatricula(row.rut)
        },
      ]
      : []),


    // Condición para mostrar el boton de modificacion"
    ...(authProcesoMatricula
      ? [
        {
          name: "Modificación",
          center: true,
          cell: (row) => <ButtonEditMatricula row={row} authPeriodo={authPeriodo} disable={row.tiene_detalle} />
        },
      ]
      : []),
    {
      name: "Acciones",
      center: true,
      width: "20rem",
      cell: (row) => (
        <div className="relative flex gap-4">
          {/* boton para descargar ficha de matricula */}

          {
            authProcesoMatricula && (
              <RegistrationActionButton
                title={"Ficha matricula"}
                onClick={() => getFichaMatricula(row, authUserName)}
              />
            )
          }

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
