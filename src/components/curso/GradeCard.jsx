const GradeCard = ({ grade, level, count, active }) => {
  return (
    <article
      onClick={() => alert(`seleccion grado: ${grade}`)}
      className={`relative flex border-black rounded-md border px-3 py-1 items-center>
      hover:border-blue-700 hover:shadow-md hover:shadow-blue-400 hover:scale-105
      trasition-all duration-300 cursor-pointer`}
    >
      <span className="text-[2.2rem] text-gray-500 font-bold">{grade}</span>
      <div className="flex flex-col pl-3">
        <span className="w-full text-md text-gray-500">{level}</span>
        <span className="w-full text-lg text-gray-500 flex items-end justify-end">
          {count}
        </span>
      </div>
    </article>
  );
};

export default GradeCard;
