import { createContext, useCallback, useMemo, useState } from "react";
import { getCurrentYear } from "../utils/funciones";

const CursoContext = createContext({});

export const CursoProvider = ({ children, response }) => {
  const year = getCurrentYear();
  const [data, setData] = useState({
    altaMatricula: [],
    letter: [], // usado para suministrar data en header y select
    selectGrade: null,
    selectLetter: null,
    // grade7: 0,
    // grade8: 0,
  });

  // Actualizador del objeto de contextos
  const updateDataCurso = useCallback((newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  const value = useMemo(
    () => ({
      updateDataCurso,
      ...data,
    }),
    [updateDataCurso, data]
  );

  return (
    <CursoContext.Provider value={value}>{children}</CursoContext.Provider>
  );
};

export default CursoContext;
