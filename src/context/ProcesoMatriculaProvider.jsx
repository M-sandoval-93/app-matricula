import { createContext, useCallback, useMemo, useState } from "react";

const ProcesoMatriculaContext = createContext({});

export const ProcesoMatriculaProvider = ({ children }) => {
  const [data, setData] = useState({
    listProcessMatricula: [],
    countList: 0,
    countMatriculados: 0,
    countNoMatriculados: 0,
  });

  const updateDataProcesoMatricula = useCallback((newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  const value = useMemo(
    () => ({
      updateDataProcesoMatricula,
      ...data,
    }),
    [updateDataProcesoMatricula, data]
  );

  return (
    <ProcesoMatriculaContext.Provider value={value}>
      {children}
    </ProcesoMatriculaContext.Provider>
  );
};

export default ProcesoMatriculaContext;
