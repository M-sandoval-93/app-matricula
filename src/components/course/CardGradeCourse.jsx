import InformationCountMH from "./InformationCountMH";

const CardGradeCourse = ({
  grade,
  level,
  countMale,
  countFemale,
  countTotal,
  active,
  onCardClick,
}) => {
  // manejador del evento click
  const handleClick = () => {
    onCardClick(grade);
  };

  const activeColorGrade = active
    ? "bg-blue-500 text-white hover:bg-blue-300 hover:text-white"
    : "text-gray-500 border-gray-600 ";

  return (
    <article
      onClick={handleClick}
      className={`relative flex rounded-md border px-3 py-1 items-center
        hover:shadow-md hover:text-blue-500 hover:scale-105 group 
        hover:shadow-blue-400 hover:border-blue-400
        ${activeColorGrade} trasition-all duration-300 cursor-pointer`}
    >
      <span className="text-[2.2rem] font-bold">{grade}º</span>
      <div className="flex flex-col pl-3">
        <span className="w-full text-md">{level}</span>
        <span className="w-full text-lg flex items-end justify-end">
          {countTotal}
        </span>
      </div>

      <InformationCountMH
        left={"-ml-[5.5rem]"}
        male={countMale}
        female={countFemale}
      />
    </article>
  );
};

export default CardGradeCourse;
