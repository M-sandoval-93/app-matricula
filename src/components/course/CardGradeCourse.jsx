import { useState } from "react";
import InformationCountMH from "./InformationCountMH";
import AmountToolpin from "./AmountToolpin";

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

  // manejo de la visibilidad del tolpin
  const [isToolpinVisible, setIsToolpinVisible] = useState(false);

  // estado de la tarjeta según el estado
  const activeColorGrade = active
    ? "bg-blue-500 text-white hover:bg-blue-300 hover:text-white"
    : "text-gray-500 border-gray-600 ";

  return (
    <div className="relative">
      <article
        onClick={handleClick}
        className={`relative flex rounded-md border px-3 justify-center py-1 items-center
          hover:shadow-md hover:text-blue-500 hover:scale-105 group 
          hover:shadow-blue-400 hover:border-blue-400 w-28 gap-2
          ${activeColorGrade} trasition-all duration-300 cursor-pointer`}
        onMouseEnter={() => setIsToolpinVisible(true)}
        onMouseLeave={() => setIsToolpinVisible(false)}
      >
        <span className="text-[2.2rem] font-bold">{grade}º</span>
        <div className="flex flex-col">
          <span className="w-full text-md font-semibold">{level}</span>
          <span className="w-full text-lg flex items-end justify-end">
            {countTotal}
          </span>
        </div>
      </article>

      <AmountToolpin
        visible={isToolpinVisible}
        male={countMale}
        female={countFemale}
        ejex={"right-[6.6rem]"}
        ejey={"top-[.2rem]"}
      />
    </div>
  );
};

export default CardGradeCourse;
