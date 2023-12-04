import { useEffect, useState } from "react";
import Modal from "./Modal";
import { TbExchange } from "react-icons/tb";
import { LiaSchoolSolid } from "react-icons/lia";
import { MdOutlineExitToApp } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { getCurrentYear } from "../utils/funciones";
import { parse } from "postcss";

const ModalMatriculaReport = ({ stateMatricula, onCloseModal }) => {
  const { stateModalReport } = stateMatricula;
  const { authPeriodo } = useAuth();

  const [modalReport, setModalReport] = useState({
    fullPeriod: false,
    dateFrom: "",
    dateTo: "",
  });

  const updateModalReport = (newState) => {
    setModalReport((prevData) => ({ ...prevData, ...newState }));
  };

  const handleCheckBox = (e) => {
    updateModalReport({
      fullPeriod: e.target.checked,
    });
  };

  const handleDataChange = (e) => {
    updateModalReport({
      [e.target.name]: e.target.value,
    });
  };

  const getReport = (event) => {
    console.log(event);
  };

  useEffect(() => {
    updateModalReport({
      fullPeriod: false,
      dateFrom: "",
      dateTo: "",
    });
  }, []);

  return (
    <Modal
      title={"DESCARGAR REGISTROS MATRICULA"}
      stateModal={stateModalReport}
      onCloseModal={onCloseModal}
      color={"green"}
      report={true}
    >
      <section className="relative flex flex-col gap-4 mb-4">
        {/* ver como mejorar este erticle, dejar como select, como checbox  o como radiobutton */}
        <article className="relative flex flex-col w-full justify-center items-center">
          <div className="relative flex gap-2">
            <input
              type="checkbox"
              name="checkFullPeriod"
              id="checkFullPeriod"
              checked={modalReport.fullPeriod}
              onChange={handleCheckBox}
            />
            <label
              htmlFor="checkFullPeriod"
              className="text-lg text-blue-600 font-semibold"
            >
              Periodo actual completo
            </label>
          </div>
        </article>

        {/* linea divisoria */}
        <span className="w-full bg-gray-300 p-[1px]"></span>

        <article
          className={`flex justify-center items-center gap-6
            ${modalReport.fullPeriod ? "hidden" : "flex"}`}
        >
          <div className="relative flex flex-col gap-y-2 xs:w-40">
            <label htmlFor="dateFrom" className="text-blue-600 font-semibold">
              Fecha inicial
            </label>
            <input
              type="date"
              name="dateFrom"
              id="dateFrom"
              autoComplete="off"
              value={modalReport.dateFrom}
              onChange={handleDataChange}
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
              autoComplete="off"
              value={modalReport.dateTo}
              onChange={handleDataChange}
              className={`border outline-none rounded-md p-2 text-center w-full bg-transparent`}
            />
          </div>
        </article>
      </section>

      <section className="relative flex justify-between items-center m-8  px-4">
        <button
          disabled={parseInt(authPeriodo) !== getCurrentYear() ? true : false}
          onClick={() => getReport("cambio apoderado")}
          className={`relative flex items-center justify-center
            rounded-full w-10 h-10 p-1 shadow-md
            transition-all duration-300 group
            ${
              parseInt(authPeriodo) !== getCurrentYear()
                ? "bg-gray-400 text-white"
                : "bg-gray-100 text-blue-500 hover:text-white hover:bg-blue-500"
            }
          `}
        >
          <span className="flex justify-center items-center">
            <TbExchange size={30} />
          </span>

          <div
            className={`invisible opacity-0 absolute p-1 rounded-md text-sm
              text-white top-12 font-medium
              group-hover:visible group-hover:opacity-100 
              transition-all duration-300 whitespace-nowrap
              ${
                parseInt(authPeriodo) !== getCurrentYear()
                  ? "bg-gray-400"
                  : "bg-blue-500"
              }
          `}
          >
            Cambio apoderados
          </div>
        </button>

        <button
          onClick={() => getReport(modalReport)}
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
          disabled={parseInt(authPeriodo) !== getCurrentYear() ? true : false}
          onClick={() => getReport("baja matriculas")}
          className={`relative flex items-center justify-center
            rounded-full w-10 h-10 p-1 shadow-md 
            transition-all duration-300 group
            ${
              parseInt(authPeriodo) !== getCurrentYear()
                ? "bg-gray-400 text-white"
                : "bg-gray-100 text-red-500 hover:text-white hover:bg-red-500"
            }
          `}
        >
          <span className="flex justify-center items-center">
            <MdOutlineExitToApp size={30} />
          </span>

          <div
            className={`invisible opacity-0 absolute p-1 rounded-md text-sm
              text-white top-12 font-medium
              group-hover:visible group-hover:opacity-100 
              transition-all duration-300 whitespace-nowrap
              ${
                parseInt(authPeriodo) !== getCurrentYear()
                  ? "bg-gray-400"
                  : "bg-red-500"
              }
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
