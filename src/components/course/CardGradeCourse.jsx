const CardGradeCourse = ({ grade, level, count, active }) => {
  return (
    <article
      onClick={() => console.log("prueba")}
      className={`relative flex border-black rounded-md border px-3 py-1 items-center>
      hover:border-blue-700 hover:shadow-md hover:shadow-blue-400 hover:scale-105
      trasition-all duration-300 cursor-pointer 
      ${active ? "text-blue-500" : "text-gray-500"}`}
    >
      <span className="text-[2.2rem] font-bold">{grade}º</span>
      <div className="flex flex-col pl-3">
        <span className="w-full text-md">{level}</span>
        <span className="w-full text-lg flex items-end justify-end">
          {count === null ? "..." : count}
        </span>
      </div>
    </article>
  );
};

export default CardGradeCourse;
