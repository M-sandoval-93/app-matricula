const SubTableMatricula = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 px-16 text-sm">
      <span>Otros datos del estudiante:</span>
      <table>
        <thead>
          <tr>
            <th>Fecha Nacimiento</th>
            <th>Fecha Ingreso</th>
            <th>Sexo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.fecha_nacimiento}</td>
            <td>{data.fecha_alta}</td>
            <td>{data.sexo}</td>
          </tr>
        </tbody>
      </table>
      <span>FECHA RETIRO: {data.fecha_baja ?? "SIN FECHA DE RETIRO"}</span>

      <span>Datos apoderados</span>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Rut</th>
            <th>Nombres</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apoderado(a) Titular</td>
            <td>{data.rut_titular ?? "SIN REGISTRO"}</td>
            <td>{data.apoderado_titular ?? "SIN REGISTRO"}</td>
            <td>{data.telefono_titular ?? "SIN REGISTRO"}</td>
          </tr>
          <tr>
            <td>Apoderado(a) Suplente</td>
            <td>{data.rut_suplente ?? "SIN REGISTRO"}</td>
            <td>{data.apoderado_suplente ?? "SIN REGISTRO"}</td>
            <td>{data.telefono_suplente ?? "SIN REGISTRO"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SubTableMatricula;
