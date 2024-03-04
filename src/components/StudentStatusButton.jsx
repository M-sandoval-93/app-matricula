import { useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import InformativeToolpin from "./InformativeToolpin";

// diseño del boton de estado
const objectComponentButtonStatus = {
  "MATRICULADO (A)": {
    colorText: "text-green-500",
    colorBorder: "border-green-300",
    shadow: "shadow-green-400",
    background: "bg-green-100",
    iconState: <FaUserCheck size={26} />,
  },
  "SUSPENDIDO (A)": {
    colorText: "text-orange-500",
    colorBorder: "border-orange-300",
    shadow: "shadow-orange-400",
    background: "bg-orange-100",
    iconState: <FaUserLock size={26} />,
  },
  "RETIRADO (A)": {
    colorText: "text-red-500",
    colorBorder: "border-red-300",
    shadow: "shadow-red-400",
    background: "bg-red-100",
    iconState: <FaUserTimes size={26} />,
  },
};

const StudenStatusButton = ({ estado }) => {
  // asignación del diseño por medio del estado asignado
  const componentButton = objectComponentButtonStatus[estado] || {};

  // manejo de la visibilidad del tolpin
  const [isToolpinVisible, setIsToolpinVisible] = useState(false);

  return (
    <div className="relative">
      <button
        className={`p-[.3rem] border hover:shadow-md rounded-full hover:scale-105 
        transition-all duration-300 w-16 h-10 flex justify-center items-center
        ${componentButton.colorText} ${componentButton.colorBorder} ${componentButton.shadow}`}
        onMouseEnter={() => setIsToolpinVisible(true)}
        onMouseLeave={() => setIsToolpinVisible(false)}
      >
        {/* icono del boton según estado del estudiante */}
        {componentButton.iconState}
      </button>

      {/* tolpin informativo del boton, según estado del estudiante */}
      <InformativeToolpin
        text={estado}
        visible={isToolpinVisible}
        colorText={componentButton.colorText}
        background={componentButton.background}
      />
    </div>
  );
};

export default StudenStatusButton;
