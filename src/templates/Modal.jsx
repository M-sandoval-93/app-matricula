import { MdClose } from "react-icons/md";

import { useEffect, useState } from "react";
import ErrorHandler from "../components/ErrorHandler";
import apiGet from "../api/apiGet";

const Modal = ({
  children, // contenido del modal
  stateModal, // estado del modal
  onCloseModal, // función para cerrar y setear el modal
  title, // titulo del modal
  width, // ancho del modal
  height, // largo del modal
  minHeight, // largo maximo del modal
  color, // color barra superior del modal
}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (stateModal) {
      apiGet({ route: "validateSession" }).catch((error) => setError(error));
    }
  }, [stateModal]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-40 duration-300
          ${stateModal ? "visible bg-black/50" : "invisible"}`}
    >
      <div
        className={`bg-white rounded-xl shadow transition-all duration-300
            relative flex flex-col w-[${width}] h-[${height}]
            min-h-[${minHeight}] max-h-[37rem] min-w-[20rem] max-w-[50rem]             
            ${stateModal ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <header
          className={`relative w-full bg-${color}-500 rounded-xl flex items-center justify-between p-4 scale-[102%] gap-4`}
        >
          <span className="text-white text-base md:text-lg font-semibold transition-all duration-300">
            {title}
          </span>

          <button
            onClick={onCloseModal}
            className={`relative p-2 rounded-full w-11 h-11 flex justify-center items-center bg-white text-dark transition-all duration-200
                hover:text-white hover:bg-red-400 hover:shadow-md hover:shadow-white`}
          >
            <span className="flex justify-center items-center">
              <MdClose size={25} />
            </span>
          </button>
        </header>

        <main className="relative p-4 flex-grow max-h-[36rem] overflow-y-auto">
          {children}
        </main>
      </div>

      <ErrorHandler error={error} />
    </div>
  );
};

export default Modal;
