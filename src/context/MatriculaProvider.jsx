import { createContext, useCallback, useMemo, useState } from "react";

const MatriculaContext = createContext({});

export const MatriculaProvider = ({ children }) => {
  const [data, setData] = useState({
    matricula: [],
    countMatriculados: 0,
    countRetirados: 0,
  });

  // mejorar la actualizacion de los elementos mediante funcion de actualizacion usando objetos como parametros
  const updateDataMatricula = useCallback((newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  const value = useMemo(
    () => ({
      updateDataMatricula,
      ...data,
    }),
    [updateDataMatricula, data]
  );

  return (
    <MatriculaContext.Provider value={value}>
      {children}
    </MatriculaContext.Provider>
  );
};

export default MatriculaContext;
