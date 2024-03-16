import { IoMdLock } from "react-icons/io";
import { IoMdUnlock } from "react-icons/io";
import { FaUserSlash } from "react-icons/fa";
import { useState } from "react";
import InformativeToolpin from "../InformativeToolpin";

const objectComponentButtonSuspend = {
  "MATRICULADO (A)": {
    text_toolpin: "Suspender",
    color_text_button: "text-green-500",
    color_text_toolpin: "text-orange-500",
    icon_Button: <IoMdUnlock size={26} />,
    background_toolpin: "bg-orange-100",
    hover_background_button: "hover:bg-orange-500",
  },
  "SUSPENDIDO (A)": {
    text_toolpin: "Quitar suspención",
    color_text_button: "text-orange-500",
    color_text_toolpin: "text-green-500",
    icon_Button: <IoMdLock size={26} />,
    background_toolpin: "bg-green-100",
    hover_background_button: "hover:bg-green-500",
  },
  "RETIRADO (A)": {
    text_toolpin: "Retirado !!",
    color_text_button: "text-red-500",
    color_text_toolpin: "text-red-500",
    icon_Button: <FaUserSlash size={26} />,
    background_toolpin: "bg-red-100",
    hover_background_button: "hover:bg-red-500",
  },
};

const SuspendStudentButton = ({ estado }) => {
  // asignación del diseño según estado del componente
  const componentButton = objectComponentButtonSuspend[estado] || {};

  // manejo de la visivilidad del tolpin
  const [istoolpinVisible, setIsToolpinVisible] = useState(false);

  return (
    <div className="relative">
      <button
        className={`rounded-full p-1 transition-all duration-300 group
        hover:text-white shadow-sm w-16 h-10 flex items-center justify-center
        ${componentButton.color_text_button} ${componentButton.hover_background_button}`}
        onMouseEnter={() => setIsToolpinVisible(true)}
        onMouseLeave={() => setIsToolpinVisible(false)}
      >
        {/* icono del boton según estado del estudiante */}
        {componentButton.icon_Button}
      </button>

      {/* tolpin informativo del boton, según estado del estudiante */}
      <InformativeToolpin
        text={componentButton.text_toolpin}
        visible={istoolpinVisible}
        colorText={componentButton.color_text_toolpin}
        background={componentButton.background_toolpin}
        ejex={"right-[4.5rem]"}
        ejey={"top-[.3rem]"}
      />
    </div>
  );
};

export default SuspendStudentButton;
