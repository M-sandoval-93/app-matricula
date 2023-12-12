import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { MdOutlinePlaylistRemove } from "react-icons/md";

const InfoProcesoMatricula = () => {

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-5 md:px-10 py-5">
      <article className="mb-4 md:mb-0 md:mr-4 w-full md:w-[18rem]">
        <div
          className="relative flex rounded-md p-5 h-full justify-center items-center gap-x-5 border 
            border-blue-500 text-blue-600 hover:scale-105 transition-all duration-300 hover:shadow-md hover:shadow-blue-400"
        >
          <span className="flex justify-center items-center">
            <MdPlaylistAdd size={60} />
          </span>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">Lista SAE</span>
            <div className="relative flex gap-x-2 items-center">
              <span className="text-gray-600">Cantidad:</span>
              <span className=" text-lg font-semibold">{count.listaSAE}</span>
            </div>
          </div>
        </div>
      </article>

      <article className="mb-4 md:mb-0 md:mx-4 w-full md:w-[18rem]">
        <div
          className="relative flex rounded-md p-5 h-full justify-center items-center gap-x-5 border 
            border-green-500 text-green-600 hover:scale-105 transition-all duration-300 hover:shadow-md hover:shadow-green-400"
        >
          <span className="flex justify-center items-center">
            <MdOutlinePlaylistAddCheck size={60} />
          </span>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">Matriculados</span>
            <div className="relative flex gap-x-2 items-center">
              <span className="text-gray-600">Cantidad:</span>
              <span className=" text-lg font-semibold">
                {count.matriculados}
              </span>
            </div>
          </div>
        </div>
      </article>

      <article className="w-full md:w-[18rem]">
        <div
          className="relative flex rounded-md p-5 h-full justify-center items-center gap-x-5 border 
            border-red-500 text-red-600 hover:scale-105 transition-all duration-300 hover:shadow-md hover:shadow-red-400"
        >
          <span className="flex justify-center items-center">
            <MdOutlinePlaylistRemove size={60} />
          </span>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">Por matricular</span>
            <div className="relative flex gap-x-2 items-center">
              <span className="text-gray-600">Cantidad:</span>
              <span className=" text-lg font-semibold">
                {count.nomatriculados}
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default InfoProcesoMatricula;
