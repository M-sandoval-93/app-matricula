const FormRepresentative = ({ setFormMatricula, open, getRut }) => {
  return (
    <form className={``}>
      <h1>Formulario para trabajar con apoderados</h1>
      <h3>{getRut}</h3>
      <button type="button" onClick={setFormMatricula}>
        Volver
      </button>
    </form>
  );
};

export default FormRepresentative;
