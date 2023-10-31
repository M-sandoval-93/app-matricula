import { useEffect, useState } from "react";

import useMatricula from "../../hooks/useMatricula";
import apiGet from "../../api/apiGet";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import HeaderTitle from "../HeaderTitle";

const HeaderMatricula = () => {
  const { altas, bajas, getCountMatricula, periodo } = useMatricula();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      apiGet({ route: "matricula/getCount", param: periodo })
        .then((response) => {
          getCountMatricula(response.data);
        })
        .catch((error) => setError(true))
        .finally(() => setLoading(false));
    }, 200);
  }, [periodo]);

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
            {loading || error ? "loading .." : altas}
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
            {loading || error ? "loading .." : bajas}
          </div>
        </article>
      </section>
    </HeaderTitle>
  );
};

export default HeaderMatricula;
