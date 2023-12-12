export const columnsProcessMatricula = () => {
    return [
        {
            name: "Rut",
            selector: (row) => row.rut_estudiante,
            width: "130px",
        },
        {
            name: "Nombres estudiante",
            selector: (row) => row.nombres_estudiante,
            width: "320px",
        },
        {
            name: "Grado",
            selector: (row) => row.grado_matricula,
            width: "90px",
            sortable: true,
            center: true,
        },
        {
            name: "Tipo Estudiante",
            cell: (row) => (
                <span>
                    {row.estudiante_nuevo ? "Nuevo" : "Continua"}
                </span>
            ),
            center: true,
            sortable: true,
        },
        {
            name: "Estado Estudiante",
            cell: (row) => (
                <span>
                    {row.estado_matricula ? "Matriculado" : "Por matricular"}
                </span>
            ),
            center: true,
            sortable: true,
        },
        {
            name: "Fecha Matricula",
            selector: (row) => row.fecha_matricula,
            sortable: true,
            center: true,
        }
    ];
};