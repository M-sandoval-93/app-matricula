const SubTableMatricula = ({ data }) => {
  return (
    <div className="flex flex-col gap-2 px-16 text-sm">
      <span className="text-lg font-bold block">Datos estudiantes</span>
      <table className=" border border-gray-300">
        <thead className="bg-gray-200 flex justify-start">
          <tr>
            <th className="py-1 px-2 border-b">Fecha Nacimiento</th>
            <th className="py-1 px-2 border-b">Fecha Ingreso</th>
            <th className="py-1 px-2 border-b">Sexo</th>
          </tr>
        </thead>
        <tbody className="flex justify-start">
          <tr>
            <td className="py-1 px-2 border-b">{data.fecha_nacimiento}</td>
            <td className="py-1 px-2 border-b">{data.fecha_alta}</td>
            <td className="py-1 px-2 border-b">{data.sexo}</td>
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
