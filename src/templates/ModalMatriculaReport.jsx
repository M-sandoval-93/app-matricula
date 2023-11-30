import { useState } from "react";
import Modal from "./Modal";
import { TbExchange } from "react-icons/tb";
import { LiaSchoolSolid } from "react-icons/lia";
import { MdOutlineExitToApp } from "react-icons/md";

const ModalMatriculaReport = ({ stateMatricula, onCloseModal }) => {
  const { stateModalReport } = stateMatricula;

  const [modalReport, setModalReport] = useState({
    fullPeriod: false,
    form: "",
    to: "",
  });

  return (
    <Modal
      title={"DESCARGAR REGISTROS MATRICULA"}
      stateModal={stateModalReport}
      onCloseModal={onCloseModal}
      width={"50%"}
      height={"50%"}
      color={"green"}
    >
      <section className="relative flex flex-col gap-4 mb-4">
        {/* ver como mejorar este erticle, dejar como select, como checbox  o como radiobutton */}
        <article className="relative flex flex-col w-full gap-2">
          <div className="relative flex gap-2">
            <input
              type="checkbox"
              name="checkFullPeriod"
              id="checkFullPeriod"
            />
            <label htmlFor="checkFullPeriod">Periodo actual completo</label>
          </div>

          <div className="relative  flex gap-2">
            <input
              type="checkbox"
              name="checkPartialPeriod"
              id="checkPartialPeriod"
            />
            <label htmlFor="checkPartialPeriod">Periodo actual parcial</label>
          </div>
        </article>

        <article className="flex justify-center items-center gap-6">
          <div className="relative flex flex-col gap-y-2 xs:w-40">
            <label htmlFor="dateFrom" className="text-blue-600 font-semibold">
              Fecha inicial
            </label>
            <input
              type="date"
              name="dateFrom"
              id="dateFrom"
              autoComplete="off"
              className={`border outline-none rounded-md p-2 text-center w-full bg-transparent`}
            />
          </div>

          <div className="relative flex flex-col gap-y-2 xs:w-40">
            <label htmlFor="dateTo" className="text-blue-600 font-semibold">
              Fecha final
            </label>
            <input
              type="date"
              name="dateTo"
              id="dateTo"
              className={`border outline-none rounded-md p-2 text-center w-full bg-transparent`}
            />
          </div>
        </article>
      </section>

      <section className="relative flex justify-between items-center m-8  px-4">
        <button
          className={`relative flex items-center justify-center bg-gray-100
            rounded-full w-10 h-10 p-1 shadow-md text-blue-500
            hover:text-white hover:bg-blue-500
            transition-all duration-300 group`}
        >
          <span className="flex justify-center items-center">
            <TbExchange size={30} />
          </span>

          <div
            className={`invisible opacity-0 absolute p-1 rounded-md text-sm
              bg-blue-500 text-white top-12 font-medium
              group-hover:visible group-hover:opacity-100 
              transition-all duration-300 whitespace-nowrap
          `}
          >
            Cambio apoderados
          </div>
        </button>

        <button
          className={`relative flex items-center justify-center bg-gray-100
            rounded-full w-10 h-10 p-1 shadow-md text-green-500
            hover:text-white hover:bg-green-500
            transition-all duration-300 group`}
        >
          <span className="flex justify-center items-center">
            <LiaSchoolSolid size={30} />
          </span>

          <div
            className={`invisible opacity-0 absolute p-1 rounded-md text-sm
              bg-green-500 text-white top-12 font-medium
              group-hover:visible group-hover:opacity-100 
              transition-all duration-300 whitespace-nowrap
          `}
          >
            Registro Matrículas
          </div>
        </button>

        <button
          className={`relative flex items-center justify-center bg-gray-100
            rounded-full w-10 h-10 p-1 shadow-md text-red-500
            hover:text-white hover:bg-red-500
            transition-all duration-300 group`}
        >
          <span className="flex justify-center items-center">
            <MdOutlineExitToApp size={30} />
          </span>

          <div
            className={`invisible opacity-0 absolute p-1 rounded-md text-sm
              bg-red-500 text-white top-12 font-medium
              group-hover:visible group-hover:opacity-100 
              transition-all duration-300 whitespace-nowrap
          `}
          >
            Matrículas de baja
          </div>
        </button>
      </section>
    </Modal>
  );
};

export default ModalMatriculaReport;
