const CardLetter = ({ grade, letter, active }) => {
  const activeColorLetter = active
    ? "text-blue-500 border-blue-600 hover:shadow-blue-400"
    : "text-gray-500 border-gray-600 hover:shadow-gray-400";

  return (
    <article
      className={`relative flex justify-center items-center border rounded-md p-2
        hover:shadow-md hover:scale-105 group cursor-pointer
        transition-all duration-300 ${activeColorLetter}`}
    >
      <div className="relative flex gap-1 text-2xl font-bold">
        <span>{grade}º</span>
        <span>{letter}</span>
      </div>
      <span className="relative flex items-end pl-2 text-sm">(36)</span>
    </article>
  );
};

export default CardLetter;
