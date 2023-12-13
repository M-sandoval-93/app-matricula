const CardProcesoMatricula = ({ icon, name, count, color }) => {
  return (
    <button
      onClick={() => alert("Trabajando...")}
      className="relative flex w-48 cursor-pointer"
    >
      <div
        className={`relative w-full flex rounded-md border px-4 py-2 border-${color}-500 text-${color}-600
          hover:scale-105 transition-all duration-300 gap-2`}
      >
        <span className="flex justify-center items-center">{icon}</span>
        <div className="flex flex-col">
          <span>{name}</span>
          <div className="relative flex gap-x-2">
            <span>Cant:</span>
            <span>{count}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CardProcesoMatricula;
