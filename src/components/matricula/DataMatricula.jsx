import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useMatricula from "../../hooks/useMatricula";
import apiGetDocument from "../../api/apiGetDocument";

// funcion para convertir fecha texto a fecha date
// const formatDate = (date) => {
//   const part = date.split(" / ");
//   return `${part[2]}-${part[1]}-${part[0]}`;
// };



const certificadoAlumnoRegular = ({ rut, updateStateMatricula, periodo }) => {
  apiGetDocument({ route: "report/getCertificadoAlumnoRegular", param: `${rut}/${periodo}` })
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
  apiGetDocument({ route: "report/getCertificadoMatricula", param: `${rut}/${periodo}` })
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
      width: "140px",
    },
    {
      name: "Ap. materno",
      selector: (row) => row.materno,
      width: "140px",
    },
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      width: "280px",
    },
    {
      name: "Grado",
      selector: (row) => row.grado,
      width: "80px",
      center: true,
    },
    {
      name: "Estado",
      cell: (row) => (
        <span
          className={`p-2 border hover:shadow-md rounded-md
          ${row.estado === "ACTIVO(A)" && "border-blue-500  text-blue-500"}`}
        >
          {row.estado}
        </span>
      ),
      width: "140px",
      center: true,
    },
    {
      name: "Acciones",
      center: true,
      grow: 2,
      cell: (row) => (
        <div className="flex gap-4">
          {/* boton para descargar certificado */}
          <button
            className="rounded-full p-1 transition-all duration-300 text-blue-500 
            hover:bg-blue-500 hover:text-white shadow-sm"
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
            <DownloadIcon sx={{ fontSize: 26 }} />
          </button>

          {/* boton para editar una matricula */}
          <button
            onClick={() => {
              updateStateMatricula({
                stateModal: true,
                newMatricula: false,
                idMatricula: row.id,
              });
            }}
            className={`rounded-full p-1 transition-all duration-300 shadow-sm hover:text-white text-green-500 hover:bg-green-500`}
          >
            <EditIcon sx={{ fontSize: 26 }} />
          </button>

          {/* boton para suspender una matricula */}
          <button
            onClick={() => console.log("suspender matricula")}
            disabled={!bloqueo_periodo_actual && proceso_matricula}
            className={`rounded-full p-1 transition-all duration-300 shadow-sm hover:text-white
            ${
              !bloqueo_periodo_actual && proceso_matricula
                ? "text-gray-500 hover:bg-gray-700"
                : "text-red-500 hover:bg-red-500"
            }`}
          >
            <ExitToAppIcon sx={{ fontSize: 26 }} />
          </button>
        </div>
      ),
    },
  ];
};
