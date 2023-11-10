import { useLoaderData } from "react-router-dom";
import TableMatricula from "../components/matricula/TableMatricula";
import HeaderMatricula from "../components/matricula/HeaderMatricula";
import ErrorHandler from "../components/ErrorHandler";
import { MatriculaProvider } from "../context/MatriculaProvider";
import SelectPeriodo from "../components/SelectPeriodo";

const Matricula = () => {
  const { response, error } = useLoaderData();

  return (
    <>
      {error ? (
        <ErrorHandler error={error} />
      ) : (
        <section className="relative w-auto flex flex-col gap-2 mb-3 overflow-hidden overflow-x-auto">
          <MatriculaProvider response={response}>
            <SelectPeriodo />
            <HeaderMatricula />
            <TableMatricula />
          </MatriculaProvider>
        </section>
      )}
    </>
  );
};

export default Matricula;

