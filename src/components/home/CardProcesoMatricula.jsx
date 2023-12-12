const CardProcesoMatricula = ({ icon, name, count, color }) => {
  return (
    <article className="relative flex w-44">
      <div
        className={`
            relative w-full flex rounded-md border px-4 py-2 border-${color}-500 text-${color}-600
            hover:scale-105 transition-all duration-300
        `}
      >
        <span className="flex justify-center items-center">{icon}</span>
        <div className="flex flex-col">
          <span>{name}</span>
          <div>
            <span>Cantidad:</span>
            <span>{count}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardProcesoMatricula;
