const AmountToolpin = ({ visible, male, female }) => {
  return (
    <div
      className={`absolute p-2 right-[8rem] top-[.2rem] text-sm rounded-md
        flex flex-col bg-cyan-100 text-blue-500 w-20
        transition-all duration-300 whitespace-nowrap z-10 font-semibold
        ${visible ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      {/* amount male */}
      <span className="flex justify-between items-center">
        <p>H:</p>
        {/* <p className="text-blue-800">{male}</p> */}
      </span>

      {/* amoun female */}
      <span>
        <p>M:</p>
        {/* <p className="text-blue-800">{female}</p> */}
      </span>
    </div>
  );
};

export default AmountToolpin;
