import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import ListLetter from "./ListLetter";
import { getReportCourses } from "../../utils/downloadFunctions";
import useAuth from "../../hooks/useAuth";

const HeaderTableCourse = ({ filter, updateStateCourse }) => {
  const { authPeriodo } = useAuth();

  return (
    <div className="relative flex gap-3 w-full items-center justify-between flex-wrap-reverse">
      <div className="relative flex gap-3">
        <button
          onClick={() =>
            getReportCourses({ periodo: authPeriodo, updateStateCourse })
          }
          className="px-2 py-1 border rounded-md hover:shadow-md hover:scale-105 group
          text-green-700 border-green-700 hover:shadow-green-900 transition-all duration-300"
        >
          <BsFileEarmarkExcelFill size={35} />
          <div
            className={`invisible opacity-0 absolute p-2 ml-[2.6rem] -top-[2.3rem]
            bg-cyan-100 text-blue-500 text-sm transition-all duration-300 z-50
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
              updateStateCourse({ filterCourse: event.target.value })
            }
            className="border outline-none border-gray-300 focus:shadow focus:shadow-gray-400 rounded-md py-2 pl-10"
          />

          <span
            className={`absolute right-2 text-gray-400 cursor-pointer rounded-full p-1 shadow-sm 
              shadow-gray-200 hover:scale-105 hover:bg-gray-100 transition-all duration-300
              ${filter ? "opacity-100 scale-100" : "opacity-0 scale-125"}`}
            onClick={() => updateStateCourse({ filterCourse: "" })}
          >
            <MdClear size={25} />
          </span>
        </div>
      </div>

      {/* Lista de letras por curso */}
      <div className="relative flex justify-end">
        <ListLetter />
      </div>
    </div>
  );
};

export default HeaderTableCourse;
