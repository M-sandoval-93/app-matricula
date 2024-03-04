const InformationCountMH = ({ left, top, male, female }) => {
  return (
    <div
      className={`flex flex-col invisible opacity-0 absolute p-2 ${top} ${left}
          bg-cyan-100 text-blue-500 text-sm transition-all delay-500 duration-300 
          group-hover:visible group-hover:opacity-100 whitespace-nowrap rounded-md
          font-semibold w-20`}
    >
      <span className="flex justify-between items-center">
        <p>H:</p>
        <p className="text-blue-800">{male} .-</p>
      </span>

      <span className="flex justify-between items-center">
        <p>M:</p>
        <p className="text-blue-800">{female} .-</p>
      </span>
    </div>
  );
};

export default InformationCountMH;
