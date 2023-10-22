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
    width: "105px",
    center: true,
  },
  {
    name: "Rut",
    selector: (row) => row.rut,
    width: "115px",
  },
  {
    name: "Nombres",
    selector: (row) => row.nombres,
  },
  {
    name: "Apellido paterno",
    selector: (row) => row.paterno,
  },
  {
    name: "Apellido materno",
    selector: (row) => row.materno,
  },
  {
    name: "Estado",
    selector: (row) => row.estado,
    width: "100px",
  },
  {
    name: "Curso",
    selector: (row) => row.curso,
    width: "80px",
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
