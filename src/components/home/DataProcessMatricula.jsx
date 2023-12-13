export const columnsProcessMatricula = () => {
  return [
    {
      name: "Rut",
      selector: (row) => row.rut_estudiante,
      width: "160px",
      center: true,
    },
    {
      name: "Nombres estudiante",
      selector: (row) => row.nombres_estudiante,
    },
    {
      name: "Grado",
      selector: (row) => row.grado_matricula,
      width: "130px",
      sortable: true,
      center: true,
    },
    {
      name: "Tipo Estudiante",
      cell: (row) => (
        <span
          className={`p-2 border hover:shadow-md rounded-md hover:scale-110
            transition-all duration-300 w-full flex justify-center items-center
            ${
              row.estudiante_nuevo
                ? "border-green-500 text-green-500"
                : "border-blue-500 text-blue-500"
            }`}
        >
          {row.estudiante_nuevo ? "NUEVO" : "CONTINUA"}
        </span>
      ),
      width: "170px",
      center: true,
      sortable: true,
      sortFunction: (rowA, rowB) => {
        return rowA.estudiante_nuevo === rowB.estudiante_nuevo
          ? 0
          : rowA.estudiante_nuevo
          ? 1
          : -1;
      },
    },
    {
      name: "Estado Estudiante",
      cell: (row) => (
        <span
          className={`p-2 border hover:shadow-md rounded-md hover:scale-110
          transition-all durati w-full flex justify-center items-center
          ${
            row.estado_matricula
              ? "border-green-500 text-green-500"
              : "border-red-500 text-red-500"
          }`}
        >
          {row.estado_matricula ? "MATRICULADO" : "NO MATRICULADO"}
        </span>
      ),
      width: "190px",
      center: true,
      sortable: true,
      sortFunction: (rowA, rowB) => {
        return rowA.estado_matricula === rowB.estado_matricula
          ? 0
          : rowA.estado_matricula
          ? 1
          : -1;
      },
    },
    {
      name: "Fecha Matricula",
      selector: (row) => row.fecha_matricula,
      width: "250px",
      sortable: true,
      center: true,
    },
  ];
};
