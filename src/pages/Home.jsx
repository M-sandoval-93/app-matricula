import HeaderHome from "../components/home/HeaderHome";
import InfoProcesoMatricula from "../components/home/InfoProcesoMatricula";
import TableProcessMatricula from "../components/home/TableProcessMatricula";
import { ProcesoMatriculaProvider } from "../context/ProcesoMatriculaProvider";

const Home = () => {
  return (
    <section className="relative w-auto flex flex-col gap-2 mb-3 overflow-hidden overflow-x-auto">
      <ProcesoMatriculaProvider>
        <HeaderHome />
        {/* <InfoProcesoMatricula /> */}
        <TableProcessMatricula />
      </ProcesoMatriculaProvider>
    </section>
  );
};

export default Home;
