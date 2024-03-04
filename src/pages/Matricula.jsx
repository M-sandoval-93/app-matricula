import { useLoaderData } from "react-router-dom";
import TableMatricula from "../components/matricula/TableMatricula";
import HeaderMatricula from "../components/matricula/HeaderMatricula";
import ErrorHandler from "../components/ErrorHandler";
import { MatriculaProvider } from "../context/MatriculaProvider";
import SelectPeriodo from "../components/SelectPeriodo";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const Matricula = () => {
  const { response, error } = useLoaderData();
  const { setProcesoMatricula } = useAuth();
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      setProcesoMatricula(response);
      setDataFetched(true);
    }
  }, [response, dataFetched]);

  return (
    <section className="relative w-auto flex flex-col gap-2 mb-3 overflow-hidden overflow-x-auto">
      {error ? (
        <ErrorHandler error={error} />
      ) : (
        dataFetched && (
          <MatriculaProvider>
            <SelectPeriodo />
            <HeaderMatricula />
            <TableMatricula />
          </MatriculaProvider>
        )
      )}
    </section>
  );
};

export default Matricula;
