import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const handlerUpdate = (id) => {
  console.log("Actualizar id: " + id);
};

const handlerDelete = (id) => {
  console.log("eliminar id: " + id);
};

export const columnsMatricula = [
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
    name: "Curso",
    selector: (row) => row.curso,
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
        <button
          className="rounded-full p-1 transition-all duration-300 text-blue-500 
          hover:bg-blue-500 hover:text-white shadow-sm"
        >
          <DownloadIcon sx={{ fontSize: 30 }} />
        </button>

        <button
          className="rounded-full p-1 transition-all duration-300 text-green-500 
          hover:bg-green-500 hover:text-white shadow-sm"
        >
          <EditIcon sx={{ fontSize: 30 }} />
        </button>

        <button
          className="rounded-full p-1 transition-all duration-300 text-red-500 
          hover:bg-red-500 hover:text-white shadow-sm"
        >
          <ExitToAppIcon sx={{ fontSize: 30 }} />
        </button>
      </div>
    ),
  },
];
