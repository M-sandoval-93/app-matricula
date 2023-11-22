const GradeCard = ({ grade, level, count }) => {
  return (
    <article
      onClick={() => alert(`seleccion grado: ${grade}`)}
      className={`relative flex border-blue-500 rounded-md border px-3 py-1 items-center>
      hover:border-blue-700 hover:shadow-md hover:shadow-blue-400 hover:scale-105
      trasition-all duration-300 cursor-pointer`}
    >
      <span className="text-[2.2rem] text-blue-600 font-bold">{grade}</span>
      <div className="flex flex-col pl-3">
        <span className="w-full text-md text-blue-600">{level}</span>
        <span className="w-full text-lg text-blue-400 flex items-end justify-end">
          {count}
        </span>
      </div>
    </article>
  );
};

export default GradeCard;
