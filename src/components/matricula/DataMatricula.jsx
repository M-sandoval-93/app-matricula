import useMatricula from "../../hooks/useMatricula";
import apiGetDocument from "../../api/apiGetDocument";
import { FaFileDownload } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { ImExit } from "react-icons/im";

// funcion para convertir fecha texto a fecha date
// const formatDate = (date) => {
//   const part = date.split(" / ");
//   return `${part[2]}-${part[1]}-${part[0]}`;
// };

const certificadoAlumnoRegular = ({ rut, updateStateMatricula, periodo }) => {
  apiGetDocument({
    route: "report/getCertificadoAlumnoRegular",
    param: `${rut}/${periodo}`,
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cert_AlumnoRegular_${rut}.docx`);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => updateStateMatricula({ error: error }));
};

const certificadoMatricula = ({ rut, updateStateMatricula, periodo }) => {
  apiGetDocument({
    route: "report/getCertificadoMatricula",
    param: `${rut}/${periodo}`,
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cert_Matricula_${rut}.docx`);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => updateStateMatricula({ error: error }));
};

const exportCertificado = ({
  bloqueo_periodo_actual,
  proceso_matricula,
  rut,
  updateStateMatricula,
  periodo,
}) => {
  if (bloqueo_periodo_actual || !proceso_matricula) {
    certificadoAlumnoRegular({ rut, updateStateMatricula, periodo });
    return;
  }

  certificadoMatricula({ rut, updateStateMatricula, periodo });
};

export const columnsMatricula = ({ updateStateMatricula }) => {
  const { bloqueo_periodo_actual, proceso_matricula, periodo } = useMatricula();

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
      cell: (row) => (
        <span
          className={`p-2 border hover:shadow-md rounded-md hover:scale-110 
            transition-all duration-300 w-full flex justify-center items-center
            ${row.estado === "ACTIVO" && "border-blue-500  text-blue-500"}`}
        >
          {row.estado}
        </span>
      ),
      width: "140px",
      center: true,
      sortable: true,
    },
    {
      name: "Acciones",
      center: true,
      grow: 2,
      cell: (row) => (
        <div className="flex gap-4">
          {/* boton para descargar certificado */}
          <button
            title="Descargar certificado"
            className="rounded-full p-1 transition-all duration-300 text-blue-500
            hover:bg-blue-500 hover:text-white shadow-sm w-10 h-10 flex items-center justify-center"
            onClick={() =>
              exportCertificado({
                bloqueo_periodo_actual,
                proceso_matricula,
                rut: row.rut.slice(0, row.rut.length - 2),
                updateStateMatricula,
                periodo,
              })
            }
          >
            <span className="flex justify-center items-center">
              <FaFileDownload size={26} />
            </span>
          </button>

          {/* boton para editar una matricula */}
          <button
            title="Editar matrícula"
            onClick={() => {
              updateStateMatricula({
                stateModalMatricula: true, // Cambio de estado para lanzar el modal
                newMatricula: false, // Cambio de estado para modo edicion
                idMatricula: row.id, // asignación del id de la matrícula
              });
            }}
            className={`rounded-full p-1 transition-all duration-300 shadow-sm hover:text-white text-green-500 
              hover:bg-green-500 w-10 h-10 flex items-center justify-center`}
          >
            <span className="flex justify-center items-center">
              <MdEditSquare size={26} />
            </span>
          </button>

          {/* boton para suspender una matricula */}
          <button
            title="Baja de matrícula"
            onClick={() => alert("Mantenimiento")}
            disabled={!bloqueo_periodo_actual && proceso_matricula}
            className={`rounded-full p-1 transition-all duration-300 shadow-sm hover:text-white
              w-10 h-10 flex items-center justify-center
              ${
                !bloqueo_periodo_actual && proceso_matricula
                  ? "text-gray-500 hover:bg-gray-700"
                  : "text-red-500 hover:bg-red-500"
              }`}
          >
            <span className="flex justify-center items-center">
              <ImExit size={26} />
            </span>
          </button>
        </div>
      ),
    },
  ];
};
