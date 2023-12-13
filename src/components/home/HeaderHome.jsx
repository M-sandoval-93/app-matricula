import HeaderTitle from "../HeaderTitle";
import CardProcesoMatricula from "./CardProcesoMatricula";
import { MdPlaylistAdd } from "react-icons/md";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import useProcesoMatricula from "../../hooks/useProcesoMatricula";

const HeaderHome = () => {
  // estado para controlar las cantidades acordadas
  const { countList, countMatriculados, countNoMatriculados } =
    useProcesoMatricula();

  return (
    <HeaderTitle title={"Sistema matrículas"}>
      <section className="relative flex gap-4 items-center pr-1 w-full sm:w-1/2 sm:justify-end xs:px-2">
        <CardProcesoMatricula
          icon={<MdPlaylistAdd size={50} />}
          name={"Lista SAE"}
          count={countList}
          color={`blue`}
        />

        <CardProcesoMatricula
          icon={<MdOutlinePlaylistAddCheck size={50} />}
          name={"Matriculados"}
          count={countMatriculados}
          color={`green`}
        />

        <CardProcesoMatricula
          icon={<MdOutlinePlaylistRemove size={50} />}
          name={"Pendientes"}
          count={countNoMatriculados}
          color={`red`}
        />
      </section>
    </HeaderTitle>
  );
};

export default HeaderHome;
