import { createContext, useCallback, useMemo, useState } from "react";
// import { getCurrentYear } from "../utils/funciones";

const MatriculaContext = createContext({});

export const MatriculaProvider = ({ children }) => {
  // const year = getCurrentYear();
  const [data, setData] = useState({
    matricula: [],
    altas: null,
    bajas: null,
    // periodo: localStorage.getItem("periodo") || year,
    // proceso_matricula: localStorage.getItem("proceso_matricula") || response,
    // bloqueo_periodo_actual:
    //   (parseInt(localStorage.getItem("periodo") || year) === parseInt(year) &&
    //     localStorage.getItem("proceso_matricula")) ||
    //   response,
  });

  // // // restablecer periodo cuando se active o desactive el proceso de matricula
  // const bloqueo_periodo_actual =
  //   parseInt(data.periodo) === parseInt(year) && data.proceso_matricula; // pasar a context general

  // mejorar la actualizacion de los elementos mediante funcion de actualizacion usando objetos como parametros
  const updateDataMatricula = useCallback((newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  // const getDataMatricula = useCallback((matricula) => {
  //   setData((prevData) => ({ ...prevData, matricula: matricula }));
  // }, []);

  // const getCountMatricula = useCallback((count) => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     altas: count.altas,
  //     bajas: count.bajas,
  //   }));
  // }, []);

  // const getPeriodo = useCallback((periodo) => {
  //   localStorage.setItem("periodo", periodo);
  //   updateDataMatricula({ periodo: periodo });
  // }, []);

  const value = useMemo(
    () => ({
      // bloqueo_periodo_actual,
      // getDataMatricula,
      // getCountMatricula,
      updateDataMatricula,
      // getPeriodo,
      ...data,
    }),
    [
      // bloqueo_periodo_actual,
      // getDataMatricula,
      // getCountMatricula,
      updateDataMatricula,
      // getPeriodo,
      data,
    ]
  );

  return (
    <MatriculaContext.Provider value={value}>
      {children}
    </MatriculaContext.Provider>
  );
};

export default MatriculaContext;
