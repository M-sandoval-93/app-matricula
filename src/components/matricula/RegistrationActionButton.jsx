import { FaFileDownload } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { ImExit } from "react-icons/im";
import useAuth from "../../hooks/useAuth";
import InformativeToolpin from "../InformativeToolpin";
import { useState } from "react";

// diseño del boton de acción
const componentButtonActionMatricula = {
  "Descargar certificado": {
    colorText: "text-blue-500",
    textDisabled: "text-gray-500",
    background: "bg-blue-100",
    hoverBackground: "hover:bg-blue-500",
    hoverBackgroundDisabled: "hover:bg-gray-500",
    iconButton: <FaFileDownload size={26} />,
  },
  "Editar matrícula": {
    colorText: "text-green-500",
    textDisabled: "text-gray-500",
    background: "bg-green-100",
    hoverBackground: "hover:bg-green-500",
    hoverBackgroundDisabled: "hover:bg-gray-500",
    iconButton: <MdEditSquare size={26} />,
  },
  "Baja de matrícula": {
    colorText: "text-red-500",
    textDisabled: "text-gray-500",
    background: "bg-red-100",
    hoverBackground: "hover:bg-red-500",
    hoverBackgroundDisabled: "hover:bg-gray-500",
    iconButton: <ImExit size={26} />,
  },
};

const RegistrationActionButton = ({ title, onClick }) => {
  // variables del contexto, para desabilitar estilos
  const { bloqueoPeriodoActual, authProcesoMatricula } = useAuth();

  // asignación del diseño por medio del title asignado
  const componentButton = componentButtonActionMatricula[title] || {};

  // manejo de la visivilidad del tolpin
  const [istoolpinVisible, setIsToolpinVisible] = useState(false);

  return (
    <div className="relative">
      <button
        disabled={
          title === "Baja de matrícula" &&
          !bloqueoPeriodoActual &&
          authProcesoMatricula
        }
        onClick={onClick}
        className={`rounded-full hover:text-white transition-all duration-300
        shadow-sm flex items-center justify-center w-16 h-10
        ${
          title === "Baja de matrícula"
            ? !bloqueoPeriodoActual && authProcesoMatricula
              ? `${componentButton.textDisabled} ${componentButton.hoverBackgroundDisabled}`
              : `${componentButton.colorText} ${componentButton.hoverBackground}`
            : `${componentButton.colorText} ${componentButton.hoverBackground}`
        }`}
        onMouseEnter={() => setIsToolpinVisible(true)}
        onMouseLeave={() => setIsToolpinVisible(false)}
      >
        {componentButton.iconButton}
      </button>

      <InformativeToolpin
        text={title}
        visible={istoolpinVisible}
        colorText={componentButton.colorText}
        background={componentButton.background}
      />
    </div>
  );
};

export default RegistrationActionButton;
