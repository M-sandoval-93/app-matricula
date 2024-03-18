import {
  functionSortDateText,
  functionSortStates,
} from "../../utils/sortFunctions";
import StudenStatusButton from "../StudentStatusButton";
import SelectCourse from "./SelectCourse";
import SuspendStudentButton from "./SuspendStudentButton";

export const columnsCourse = ({ updateStateCourse }) => {
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
      width: "120px",
    },
    {
      name: "Nombres estudiante",
      selector: (row) => row.nombres_estudiante,
      sortable: true,
    },
    {
      name: "Grado",
      selector: (row) => row.grado,
      width: "100px",
      center: true,
      sortable: true,
    },
    {
      name: "Curso",
      selector: (row) => row.curso,
      width: "105px",
      center: true,
      cell: (row) => (
        <SelectCourse
          idMatricula={row.id}
          grado={row.grado}
          value={row.curso}
          estado={row.estado}
          updateStateCourse={updateStateCourse}
        />
      ),
    },
    {
      name: "Nº Lista",
      selector: (row) => row.n_lista ?? "-",
      width: "90px",
      center: true,
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
      width: "120px",
      grow: 2,
      cell: (row) => <SuspendStudentButton estado={row.estado} />,
    },
  ];
};
