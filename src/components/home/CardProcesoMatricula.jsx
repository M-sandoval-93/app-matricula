const CardProcesoMatricula = ({
  icon,
  name,
  count,
  color,
  countNew,
  countContinue,
}) => {
  return (
    <article className="relative flex w-48 cursor-pointer group hover:scale-105 transition-all duration-300">
      <div
        className={`relative w-full flex rounded-md border px-4 py-2 border-${color}-500 text-${color}-600 gap-2`}
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

      <div
        className={`flex flex-col invisible opacity-0 absolute p-2 -ml-[8.6rem] -top-[.4rem]
          bg-cyan-100 text-blue-500 text-sm transition-all duration-300 w-56
          group-hover:visible group-hover:opacity-100 whitespace-nowrap rounded-md
          font-semibold`}
      >
        <span className="flex justify-between items-center">
          <p>Estudiantes Nuevos:</p>
          <p className="text-blue-800">{countNew} .-</p>
        </span>
        <span className="flex justify-between items-center">
          <p>Estudiantes Continuan:</p>
          <p className="text-blue-800">{countContinue} .-</p>
        </span>
      </div>
    </article>
  );
};

export default CardProcesoMatricula;
