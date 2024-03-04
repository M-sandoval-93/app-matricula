import { useLoaderData } from "react-router-dom";
import HeaderHome from "../components/home/HeaderHome";
import TableProcessMatricula from "../components/home/TableProcessMatricula";
import { ProcesoMatriculaProvider } from "../context/ProcesoMatriculaProvider";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import ErrorHandler from "../components/ErrorHandler";
import ModuleUnderMaintenance from "../components/ModuleUnderMaintenance";

const Home = () => {
  const { response, error } = useLoaderData();
  const { authProcesoMatricula, setProcesoMatricula } = useAuth();
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      setProcesoMatricula(response);
      setDataFetched(true);
    }
  }, [response, dataFetched]);

  return (
    <>
      {error ? (
        <ErrorHandler error={error} />
      ) : !authProcesoMatricula ? (
        <ModuleUnderMaintenance />
      ) : (
        dataFetched && (
          <section className="relative w-auto flex flex-col gap-2 mb-3 overflow-hidden overflow-x-auto">
            <ProcesoMatriculaProvider>
              <HeaderHome />
              <TableProcessMatricula />
            </ProcesoMatriculaProvider>
          </section>
        )
      )}
    </>
  );
};

export default Home;
