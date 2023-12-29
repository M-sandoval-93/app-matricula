const CardGradeCourse = ({ grade, level, countMale, countFemale, countTotal, active }) => {
  return (
    <article
      onClick={() => console.log("prueba")}
      className={`relative flex rounded-md border px-3 py-1 items-center
      hover:border-blue-700 hover:shadow-md hover:shadow-blue-400 hover:scale-105
      trasition-all duration-300 cursor-pointer group
      ${
        active
          ? "text-blue-500 border-blue-700"
          : "text-gray-500 border-gray-700"
      }`}
    >
      <span className="text-[2.2rem] font-bold">{grade}º</span>
      <div className="flex flex-col pl-3">
        <span className="w-full text-md">{level}</span>
        <span className="w-full text-lg flex items-end justify-end">
          {countTotal}
        </span>
      </div>

      <div
        className={`flex flex-col invisible opacity-0 absolute p-2 -ml-[6.6rem] -top-[.4rem]
          bg-cyan-100 text-blue-500 text-sm transition-all duration-300 w-36
          group-hover:visible group-hover:opacity-100 whitespace-nowrap rounded-md
          font-semibold`}
      >
        <span className="flex justify-between items-center">
          <p>Hombres:</p>
          <p className="text-blue-800">{countMale} .-</p>
        </span>
        <span className="flex justify-between items-center">
          <p>Mujeres:</p>
          <p className="text-blue-800">{countFemale} .-</p>
        </span>
      </div>
    </article>
  );
};

export default CardGradeCourse;
