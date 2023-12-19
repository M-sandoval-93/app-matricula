import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const HeaderTableMatricula = ({ filter, updateStateMatricula }) => {
  const { bloqueoPeriodoActual } = useAuth();

  return (
    <div className="relative w-full flex flex-wrap gap-3 items-center justify-center sm:justify-between my-2">
      <button
        className={`px-2 py-1 border rounded-md hover:shadow-md hover:scale-105 group
        text-blue-500 border-blue-500 hover:shadow-blue-600 transition-all duration-200
        ${
          bloqueoPeriodoActual
            ? "opacity-0 scale-125 cursor-not-allowed pointer-events-none"
            : "opacity-100 scale-100"
        }`}
        onClick={() => updateStateMatricula({ stateModalMatricula: true })}
      >
        <FaUserPlus size={35} />
        <div
          className={`invisible opacity-0 absolute p-2 ml-12 -top-[.8rem]
            bg-cyan-100 text-blue-500 text-sm transition-all duration-300
            group-hover:visible group-hover:opacity-100 whitespace-nowrap
            rounded-md
          `}
        >
          Nuevo registro
        </div>
      </button>

      <div className="flex gap-3">
        <button
          onClick={() => updateStateMatricula({ stateModalReport: true })}
          className="px-2 py-1 border rounded-md hover:shadow-md hover:scale-105 group
          text-green-700 border-green-700 hover:shadow-green-900 transition-all duration-300"
        >
          <BsFileEarmarkExcelFill size={35} />
          <div
            className={`invisible opacity-0 absolute p-2 -ml-[8.6rem] -top-[.5rem]
            bg-cyan-100 text-blue-500 text-sm transition-all duration-300
              group-hover:visible group-hover:opacity-100 whitespace-nowrap rounded-md`}
          >
            Descargar datos
          </div>
        </button>

        <div className="relative flex items-center justify-end gap-2">
          <span className="absolute left-2 text-gray-400">
            <IoSearchSharp size={25} />
          </span>
          <input
            type="text"
            placeholder="Search ..."
            value={filter}
            onChange={(event) =>
              updateStateMatricula({ filter: event.target.value })
            }
            className="border outline-none border-gray-300 focus:shadow focus:shadow-gray-400 rounded-md py-2 pl-10"
          />

          <span
            className={`absolute right-2 text-gray-400 cursor-pointer rounded-full p-1 shadow-sm 
              shadow-gray-200 hover:scale-105 hover:bg-gray-100 transition-all duration-300
              ${filter ? "opacity-100 scale-100" : "opacity-0 scale-125"}`}
            onClick={() => updateStateMatricula({ filter: "" })}
          >
            <MdClear size={25} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderTableMatricula;
