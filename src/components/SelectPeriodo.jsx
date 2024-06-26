import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getCurrentYear } from "../utils/funciones";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const SelectPeriodo = () => {
  const { authPeriodo, authProcesoMatricula, setPeriodo } = useAuth();
  const [currentYear, setCurrentYear] = useState(authPeriodo);

  useEffect(() => {
    setCurrentYear(authPeriodo);
  }, [authProcesoMatricula]);

  return (
    <section
      className={`${authProcesoMatricula ? "flex" : "hidden"}
                relative w-full xs:w-[18rem] gap-2 justify-start items-center sx:mx-2`}
    >
      <label
        className="relative flex text-lg font-semibold text-blue-600 w-[20rem]"
        htmlFor="periodo_lectivo"
      >
        Periodo escolar
      </label>
      <select
        name="periodo_lectivo"
        id="periodo_lectivo"
        value={currentYear}
        onChange={(e) => {
          setCurrentYear(e.target.value);
          setPeriodo(e.target.value);
        }}
        className={`relative border outline-none rounded-md p-[.62rem] text-start w-full
          appearance-none cursor-pointer bg-transparent hover:bg-gray-200 transition-all duration-300`}
      >
        <option value={getCurrentYear()}>{getCurrentYear()}</option>
        <option value={getCurrentYear() + 1}>{getCurrentYear() + 1}</option>
      </select>
      <span className="absolute right-2 pointer-events-none">
        <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
      </span>
    </section>
  );
};

export default SelectPeriodo;
