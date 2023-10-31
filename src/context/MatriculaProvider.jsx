import { createContext, useCallback, useMemo, useState } from "react";
import { getCurrentYear } from "../utils/funciones";

const MatriculaContext = createContext({});

export const MatriculaProvider = ({ children, response }) => {
  const year = getCurrentYear();
  const [data, setData] = useState({
    matricula: [],
    altas: null,
    bajas: null,
    periodo: localStorage.getItem("periodo") || year,
    proceso_matricula: localStorage.getItem("proceso_matricula") || response,
  });

  const getDataMatricula = useCallback((matricula) => {
    setData((prevData) => ({ ...prevData, matricula: matricula }));
  }, []);

  const getCountMatricula = useCallback((count) => {
    setData((prevData) => ({
      ...prevData,
      altas: count.altas,
      bajas: count.bajas,
    }));
  }, []);

  const getPeriodo = useCallback((periodo) => {
    localStorage.setItem("periodo", periodo);
    setData((prevData) => ({
      ...prevData,
      periodo: periodo,
    }));
  }, []);

  const value = useMemo(
    () => ({
      getDataMatricula,
      getCountMatricula,
      getPeriodo,
      ...data,
    }),
    [getDataMatricula, getCountMatricula, getPeriodo, data]
  );

  return (
    <MatriculaContext.Provider value={value}>
      {children}
    </MatriculaContext.Provider>
  );
};

export default MatriculaContext;
