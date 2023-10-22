import { createContext, useCallback, useMemo, useState } from "react";

const MatriculaContext = createContext({});

export const MatriculaProvider = ({ children }) => {
  const [data, setData] = useState({
    matricula: [],
    altas: null,
    bajas: null,
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

  const value = useMemo(
    () => ({
      getDataMatricula,
      getCountMatricula,
      ...data,
    }),
    [getDataMatricula, getCountMatricula, data]
  );

  return (
    <MatriculaContext.Provider value={value}>
      {children}
    </MatriculaContext.Provider>
  );
};

export default MatriculaContext;
