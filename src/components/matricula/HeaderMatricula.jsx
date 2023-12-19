import useMatricula from "../../hooks/useMatricula";
import { BsDatabaseFillDash } from "react-icons/bs";
import { BsDatabaseFillAdd } from "react-icons/bs";
import HeaderTitle from "../HeaderTitle";

const HeaderMatricula = () => {
  const { countMatriculados, countRetirados } = useMatricula();

  return (
    <HeaderTitle title={"Registro matrículas"}>
      <section className="w-full flex-wrap sm:flex-nowrap sm:w-1/2 relative flex items-center justify-center sm:justify-end gap-4 xs:px-2">
        {/* tarjeta altas del año */}
        <article
          className="w-full xs:w-44 min-w-[11rem] flex gap-4 items-center justify-center py-1
          text-green-500 border border-green-600 rounded-md transition-all duration-300
            hover:shadow-md hover:shadow-green-400 hover:cursor-pointer hover:scale-105"
        >
          <BsDatabaseFillAdd size={35} />
          <div className="relative flex flex-col items-center justify-center">
            <p>Matriculados</p>
            {countMatriculados}
          </div>
        </article>

        {/* Tarjeta bajas del año */}
        <article
          className="w-full xs:w-44 min-w-[11rem] flex gap-4 items-center justify-center py-1
         text-red-500 border border-red-500 rounded-md transition-all duration-300
         hover:shadow-md hover:shadow-red-400 hover:cursor-pointer hover:scale-105"
        >
          <BsDatabaseFillDash size={35} />
          <div className="relative flex flex-col items-center justify-center">
            <p>Retirados</p>
            {countRetirados}
          </div>
        </article>
      </section>
    </HeaderTitle>
  );
};

export default HeaderMatricula;
