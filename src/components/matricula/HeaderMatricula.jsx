import { useCallback, useEffect, useState } from "react";

import useMatricula from "../../hooks/useMatricula";
import apiGet from "../../api/apiGet";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import HeaderTitle from "../HeaderTitle";
import useAuth from "../../hooks/useAuth";

const HeaderMatricula = () => {
  const { authPeriodo } = useAuth();
  const { altas, bajas, updateDataMatricula } = useMatricula();
  const [headerMatricula, setHeaderMatricula] = useState({
    loading: false,
    error: null,
  });

  // actualizadador del estado de los componentes
  const updateHeaderMatricula = useCallback((newData) => {
    setHeaderMatricula((prevData) => ({ ...prevData, ...newData }));
  }, []);

  useEffect(() => {
    updateHeaderMatricula({ loading: true });
    setTimeout(() => {
      apiGet({ route: "matricula/getCount", param: authPeriodo })
        .then((response) => {
          updateDataMatricula({
            altas: response?.data?.altas,
            bajas: response?.data?.bajas,
          });
        })
        .catch((error) => updateHeaderMatricula({ error: error }))
        .finally(() => updateHeaderMatricula({ loading: false }));
    }, 200);
  }, [authPeriodo]);

  return (
    <HeaderTitle title={"Registro matrículas"}>
      <section className="w-full flex-wrap sm:flex-nowrap sm:w-1/2 relative flex items-center justify-center sm:justify-end gap-4 xs:px-2">
        {/* tarjeta altas del año */}
        <article
          className="w-full xs:w-44 min-w-[11rem] flex gap-4 items-center justify-center py-1
          text-green-500 border border-green-600 rounded-md transition-all duration-300
            hover:shadow-md hover:shadow-green-400 hover:cursor-pointer hover:scale-105"
        >
          <GroupAddIcon sx={{ fontSize: 40 }} />
          <div className="relative flex flex-col items-center justify-center">
            <p>Altas</p>
            {headerMatricula?.loading || headerMatricula?.error
              ? "loading .."
              : altas}
          </div>
        </article>

        {/* Tarjeta bajas del año */}
        <article
          className="w-full xs:w-44 min-w-[11rem] flex gap-4 items-center justify-center py-1
         text-red-500 border border-red-500 rounded-md transition-all duration-300
         hover:shadow-md hover:shadow-red-400 hover:cursor-pointer hover:scale-105"
        >
          <GroupRemoveIcon sx={{ fontSize: 40 }} />
          <div className="relative flex flex-col items-center justify-center">
            <p>Bajas</p>
            {headerMatricula?.loading || headerMatricula?.error
              ? "loading .."
              : bajas}
          </div>
        </article>
      </section>
    </HeaderTitle>
  );
};

export default HeaderMatricula;
