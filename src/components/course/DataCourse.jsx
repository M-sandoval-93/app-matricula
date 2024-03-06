import {
  functionSortDateText,
  functionSortStates,
} from "../../utils/sortFunctions";
import StudenStatusButton from "../StudentStatusButton";
import SelectCourse from "./SelectCourse";
import SuspendStudentButton from "./SuspendStudentButton";

export const columnsCourse = () => {
  return [
    {
      name: "Matrícula",
      selector: (row) => row.matricula,
      width: "120px",
      center: true,
      sortable: true,
    },
    {
      name: "Rut",
      selector: (row) => row.rut,
      width: "130px",
    },
    {
      name: "Nombres estudiante",
      selector: (row) => row.nombres_estudiante,
      width: "480px",
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
      width: "90px",
      center: true,
      cell: (row) => (
        <SelectCourse
          idMatricula={row.id}
          grado={row.grado}
          value={row.curso}
        />
      ),
    },
    {
      name: "Estado",
      cell: (row) => <StudenStatusButton estado={row.estado} />,
      width: "120px",
      center: true,
      sortFunction: functionSortStates,
    },
    {
      name: "Fecha alta",
      selector: (row) => row.fecha_alta,
      width: "120px",
      center: true,
      sortFunction: functionSortDateText("fecha_alta"),
    },
    {
      name: "Suspensión",
      center: true,
      grow: 2,
      cell: (row) => <SuspendStudentButton estado={row.estado} />,
    },
  ];
};
