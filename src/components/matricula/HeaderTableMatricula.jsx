import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";


import useMatricula from "../../hooks/useMatricula";

const HeaderTableMatricula = ({ filter, updateStateMatricula }) => {
  const { bloqueo_periodo_actual } = useMatricula();
  const showModalMatricula = () => {
    updateStateMatricula({
      stateModal: true,
      idMatricula: "",
      // ver si utilizo esta funcion, o paso el update directamente al click
    });
  };

  return (
    <div className="relative w-full flex flex-wrap gap-3 items-center justify-center sm:justify-between my-2">
      <button
        className={`px-2 py-1 border rounded-md hover:shadow-md hover:scale-105
        text-blue-500 border-blue-500 hover:shadow-blue-600 transition-all duration-200
        ${
          bloqueo_periodo_actual
            ? "opacity-0 scale-125"
            : "opacity-100 scale-100"
        }`}
        disabled={bloqueo_periodo_actual}
        onClick={showModalMatricula}
      >
        <FaUserPlus size={30} />
      </button>

      <div className="flex gap-3">
        <button className="px-2 py-1 border rounded-md hover:shadow-md hover:scale-105
          text-green-700 border-green-700 hover:shadow-green-900 transition-all duration-200">
          <BsFileEarmarkExcelFill size={30} />
        </button>

        <div className="relative flex items-center justify-end gap-2">
          <span className="absolute left-2 text-gray-400">
            <SearchIcon sx={{ fontSize: 25 }} />
          </span>
          <input
            type="search"
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
            <ClearIcon sx={{ fontSize: 25 }} />
          </span>
        </div>
      </div>

    </div>
  );
};

export default HeaderTableMatricula;
