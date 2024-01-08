import useCourse from "../../hooks/useCourse";

const CardLetter = ({ letter }) => {
  const { selectGrade, lettersForCourse } = useCourse();

  const letterInCourse = lettersForCourse.includes(letter);

  const activeColorLetter = letterInCourse
    ? "text-blue-500 border-blue-600 hover:shadow-blue-400"
    : "text-gray-500 border-gray-600 hover:shadow-gray-400";

  const letterWithGrade = letterInCourse ? `${selectGrade} º` : "? º";
  const letterWithCount = letterInCourse ? "(13)" : "(0)";

  return (
    <article
      className={`relative flex justify-center items-center border rounded-md p-2
        hover:shadow-md hover:scale-105 group cursor-pointer
        transition-all duration-300 ${activeColorLetter}`}
    >
      <div className="relative flex gap-1 text-2xl font-bold">
        <span>{letterWithGrade}</span>
        <span>{letter}</span>
      </div>
      <span className="relative flex items-end pl-2 text-sm">
        {letterWithCount}
      </span>
    </article>
  );
};

export default CardLetter;
