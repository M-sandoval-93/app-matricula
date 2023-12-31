const CardGradeCourse = ({
  grade,
  level,
  countMale,
  countFemale,
  countTotal,
  active,
  onCardClick,
}) => {
  const handleClick = () => {
    onCardClick(grade);
  };

  const activeColorGrade = active
    ? "text-blue-500 border-blue-600 hover:shadow-blue-400"
    : "text-gray-500 border-gray-600 hover:shadow-gray-400";
  return (
    <article
      onClick={handleClick}
      className={`relative flex rounded-md border px-3 py-1 items-center
        hover:shadow-md hover:text-blue-500 hover:scale-105 group ${activeColorGrade}
        trasition-all duration-300 cursor-pointer`}
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
          bg-cyan-100 text-blue-500 text-sm transition-all delay-500 duration-300 w-36
          group-hover:visible group-hover:opacity-100 whitespace-nowrap rounded-md
          font-semibold `}
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
