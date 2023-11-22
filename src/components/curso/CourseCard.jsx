const CourseCard = ({ grade, letter }) => {
  return (
    <article className="relative flex justify-center items-center border border-blue-400 rounded-md p-2">
      <div className="relative flex gap-1 text-2xl text-blue-500 font-bold">
        <span>{grade}º</span>
        <span>{letter}</span>
      </div>
      <span className="relative flex items-end pl-2 text-sm text-blue-500">
        (36)
      </span>
    </article>
  );
};

export default CourseCard;
