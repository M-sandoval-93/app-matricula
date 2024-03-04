import { MdClose } from "react-icons/md";

import { useEffect, useState } from "react";
import ErrorHandler from "../components/ErrorHandler";
import apiGet from "../api/apiGet";
import useAuth from "../hooks/useAuth";

const Modal = ({
  children, // contenido del modal
  stateModal, // estado del modal
  onCloseModal, // función para cerrar y setear el modal
  title, // titulo del modal
  color, // color barra superior del modal
  report = false, // para manejar tamaño del modal reportes
}) => {
  const { authPrivilege } = useAuth();
  const [error, setError] = useState(null);

  // privilegios permitidos para utilizar el modal
  const acceptedPrivilege = ["1", "2", "4"];

  useEffect(() => {
    if (stateModal) {
      apiGet({ route: "validateSession" }).catch((error) => setError(error));

      if (!acceptedPrivilege.includes(authPrivilege)) {
        onCloseModal();
        setError({ message: "Advertencia: Privilegios insuficientes !" });
      }
    }
  }, [stateModal]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-40 duration-300
          ${stateModal ? "visible bg-black/50" : "invisible"}`}
    >
      <div
        className={`bg-white rounded-xl shadow transition-all duration-300
            relative flex flex-col 
            ${
              report
                ? "w-[40%] max-w-[30rem]"
                : "w-[80%] min-h-[37.5rem] max-w-[50rem]  "
            }
            max-h-[37.5rem] min-w-[20rem]        
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
