import { FaUserCheck } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";

const StudenStatusButton = ({ estado }) => {
  return (
    <button
      className={`p-[.3rem] border hover:shadow-md rounded-full hover:scale-105 
        transition-all duration-300 flex justify-center items-center group
        ${
          estado === "MATRICULADO (A)" &&
          "text-green-500 border-green-300 shadow-green-400"
        }
        ${
          estado === "SUSPENDIDO (A)" &&
          "text-orange-500 border-orange-300 shadow-orange-400"
        }
        ${
          estado === "RETIRADO (A)" &&
          "text-red-500 border-red-300 shadow-red-400"
        }`}
    >
      {estado === "MATRICULADO (A)" && <FaUserCheck size={26} />}
      {estado === "SUSPENDIDO (A)" && <FaUserLock size={26} />}
      {estado === "RETIRADO (A)" && <FaUserTimes size={26} />}

      <div
        className={`invisible opacity-0 absolute p-2 -ml-[10.8rem] -top-[.1rem] text-xs rounded-md
          transition-all duration-300 group-hover:visible group-hover:opacity-100 whitespace-nowrap 
          ${estado === "MATRICULADO (A)" && "text-green-500 bg-green-100"}
          ${estado === "SUSPENDIDO (A)" && "text-orange-500 bg-orange-100"}
          ${estado === "RETIRADO (A)" && "text-red-500 bg-red-100"}`}
      >
        {estado}
      </div>
    </button>
  );
};

export default StudenStatusButton;
