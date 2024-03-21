import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { GiCardExchange } from "react-icons/gi";
import { LiaSchoolSolid } from "react-icons/lia";

import ListLetter from "./ListLetter";
import {
  getReportChangeCourse,
  getReportCourses,
} from "../../utils/downloadFunctions";
import useAuth from "../../hooks/useAuth";
import InformativeToolpin from "../InformativeToolpin";
import { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";

const HeaderTableCourse = ({ filter, updateStateCourse }) => {
  const { authPeriodo } = useAuth();

  // manejo de la visibilidad del tolpin
  // const [isToolpinVisible, setIsToolpinVisible] = useState(false);

  // manejo del estado del snipper
  const [spinner, setSpinner] = useState(false);

  // objeto con funciones de descarga
  const downloadFunctions = {
    allCourse: () =>
      getReportCourses({ periodo: authPeriodo, updateStateCourse, setSpinner }),
    changeCourse: () =>
      getReportChangeCourse({
        periodo: authPeriodo,
        updateStateCourse,
        setSpinner,
      }),
  };

  // manejo del evento de seleccion del dropdown
  const onSelection = (selection) => {
    const selectedFunction = downloadFunctions[selection];
    if (selection) {
      selectedFunction();
    }
  };

  return (
    <div className="relative flex gap-3 w-full items-center justify-between flex-wrap-reverse">
      <div className="relative flex gap-3 items-center p-2">
        {/* Descarga de reportes en excel */}
        <Dropdown
          placement="bottom-start"
          showArrow
          radius="sm"
          className={{
            base: "before:bg-default-200",
            content: "p-1 border-small border-divider bg-background",
          }}
        >
          <DropdownTrigger>
            <Button variant="bordered" color="success">
              {spinner ? (
                <Spinner color="success" size="sm" />
              ) : (
                <BsFileEarmarkExcelFill size={25} />
              )}
              Download
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label
            variant="faded"
            selectionMode="single"
            className="p-1"
            onSelectionChange={(e) => onSelection(e.currentKey)}
          >
            {/* descarga de todos los cursos */}
            <DropdownItem
              key="allCourse"
              startContent={
                <LiaSchoolSolid size={30} className="text-blue-500 mx-2" />
              }
              description="Descarga de cursos por nivel"
            >
              Descargar excel cursos
            </DropdownItem>

            {/* descarga de todos los cambios de curso */}
            <DropdownItem
              key="changeCourse"
              startContent={
                <GiCardExchange size={30} className="text-green-500 mx-2" />
              }
              description="Descargar cambios de curso"
            >
              Descargar excel cambios
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

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
        <ListLetter updateStateCourse={updateStateCourse} />
      </div>
    </div>
  );
};

export default HeaderTableCourse;
