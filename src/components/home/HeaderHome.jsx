import HeaderTitle from "../HeaderTitle";
import CardProcesoMatricula from "./CardProcesoMatricula";
import { MdPlaylistAdd } from "react-icons/md";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { MdOutlinePlaylistRemove } from "react-icons/md";

const HeaderHome = () => {
  // estado para controlar las cantidades acordadas

  return (
    <HeaderTitle title={"Sistema matrículas"}>
      <section className="relative flex gap-4 items-center pr-1 w-full sm:w-1/2 sm:justify-end xs:px-2">
        <CardProcesoMatricula
          icon={<MdPlaylistAdd size={50} />}
          name={"Lista SAE"}
          count={0}
          color={`blue`}
        />

        <CardProcesoMatricula
          icon={<MdOutlinePlaylistAddCheck size={50} />}
          name={"Registrados"}
          count={0}
          color={`green`}
        />

        <CardProcesoMatricula
          icon={<MdOutlinePlaylistRemove size={50} />}
          name={"Pendientes"}
          count={0}
          color={`red`}
        />
      </section>
    </HeaderTitle>
  );
};

export default HeaderHome;
