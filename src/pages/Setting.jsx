const Setting = () => {
  return (
    <div>
      <h1>Setting</h1>
      <p>ASignar el inicio del periodo de matricula año siguiente</p>

      <form className="relative flex flex-col gap-2">
        <label htmlFor="fecha_periodo_matricula">
          fecha inicio proceso matricula
        </label>
        <input
          type="date"
          name="fecha_periodo_matricula"
          id="fecha_periodo_matricula"
          className="border rounded-md"
        />

        <button type="submit" className="border rounded-md">
          Asignar fecha
        </button>
      </form>
    </div>
  );
};

export default Setting;
