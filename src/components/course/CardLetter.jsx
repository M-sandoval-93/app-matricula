import { MdFileDownload } from "react-icons/md";
import InformationCountMH from "./InformationCountMH";

const CardLetter = ({
  letterString,
  countMale,
  countFemale,
  countTotal,
  active,
  onLetterClick,
  onDownloadClick,
}) => {
  // manejador del evento click
  const handleClick = () => {
    onLetterClick(letterString);
  };

  const handleDowloadClick = (event) => {
    // detener la propagación del evento, para que no afecte al article
    event.stopPropagation();
    onDownloadClick(letterString);
  };

  const activeColorCourse = active
    ? "bg-blue-500 text-white hover:bg-blue-300 hover:text-white"
    : "text-gray-500 border-gray-600";

  const activeColorDownload = active
    ? "bg-blue-500 border-blue-400 hover:bg-blue-300"
    : "bg-white border-gray-600";

  return (
    <article
      onClick={handleClick}
      className={`relative flex justify-center items-center border rounded-md p-1
        hover:shadow-md hover:scale-105 hover:text-blue-500 group
        hover:shadow-blue-400 hover:border-blue-400 w-20 gap-3
        cursor-pointer transition-all duration-300 ${activeColorCourse}`}
    >
      <span className="flex gap-1 text-2xl font-bold">{letterString}</span>

      <div className="relative flex flex-col text-lg">
        <button
          onClick={handleDowloadClick}
          className={`absolute -top-4 left-2 p-1
             border  rounded-full
            ${activeColorDownload}
            group-hover:border-blue-500 hover:bg-green-500 hover:text-white`}
        >
          <MdFileDownload />
        </button>
        <span className="mt-4">{countTotal}</span>
      </div>

      <InformationCountMH
        left={"-ml-[9rem]"}
        male={countMale}
        female={countFemale}
      />
    </article>
  );
};

export default CardLetter;
