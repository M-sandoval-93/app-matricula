import { createContext, useCallback, useMemo, useState } from "react";
import { getCurrentYear } from "../utils/funciones";

const CursoContext = createContext({});

export const CursoProvider = ({children, response}) => {
    const year = getCurrentYear();
    const [data, setData] = useState({
        curso: [],
        grade: null,
        periodo: localStorage.getItem("periodo") || year,
        proceso_matricula: localStorage.getItem("proceso_matricula") || response,
    });

    // restablecer periodo cuando se active o desactive el proceso de matricula
    const bloqueo_periodo_actual =
    parseInt(data.periodo) === parseInt(year) && data.proceso_matricula;

    // Actualizador del objeto de contextos
    const updateDataCurso = useCallback((newData) => {
        setData((prevData) => ({...prevData, ...newData}));
    }, []);

    const value = useMemo(
        () => ({
            bloqueo_periodo_actual,
            updateDataCurso,
            ...data,
        }),
        [
            bloqueo_periodo_actual,
            updateDataCurso,
            data,
        ]
    );

    return (
        <CursoContext.Provider value={value}>
            {children}
        </CursoContext.Provider>
    );
};

export default CursoContext;