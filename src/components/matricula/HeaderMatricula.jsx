import { useEffect, useState } from "react";

import useMatricula from "../../hooks/useMatricula";
import apiGet from "../../api/apiGet";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import redirectHome from "../../utils/redirectHome";

const HeaderMatricula = () => {
  const { altas, bajas, getCountMatricula } = useMatricula();
  const [loading, setLoading] = useState(false);
  const redirect = redirectHome();
  const title = "Registro matrículas";

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      apiGet({ route: "matricula/getCount" })
        .then((response) => {
          getCountMatricula(response.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }, 200);
  }, []);

  return (
    <header className="relative bg-transparent flex flex-wrap items-center justify-between w-full gap-y-4 py-2">
      <section className="w-full sm:w-1/2">
        <h2 className="text-2xl text-blue-600 dark:text-blue-300"> {title} </h2>
        <div className="relative flex gap-2">
          <p
            className="text-blue-600 dark:text-blue-300 text-base hover:cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={redirect}
          >
            Home
          </p>
          <span className="text-gray-500 dark:text-gray-300 text-base">/</span>
          <p className="text-gray-500 dark:text-gray-300 text-base">{title}</p>
        </div>
      </section>

      <section className="w-full flex-wrap sm:flex-nowrap sm:w-1/2 relative flex items-center justify-center sm:justify-end gap-4 px-3 xs:px-0">
        <article
          className="w-full xs:w-44 min-w-[11rem] flex gap-4 items-center justify-center py-1
        text-green-500 border border-green-600 rounded-md transition-all duration-300
        hover:shadow-md hover:shadow-green-400 hover:cursor-pointer hover:scale-105"
        >
          <GroupAddIcon sx={{ fontSize: 40 }} />
          <div className="relative flex flex-col items-center justify-center">
            <p>Altas</p>
            {loading ? "loading .." : altas}
          </div>
        </article>

        <article
          className="w-full xs:w-44 min-w-[11rem] flex gap-4 items-center justify-center py-1
        text-red-500 border border-red-500 rounded-md transition-all duration-300
        hover:shadow-md hover:shadow-red-400 hover:cursor-pointer hover:scale-105"
        >
          <GroupRemoveIcon sx={{ fontSize: 40 }} />
          <div className="relative flex flex-col items-center justify-center">
            <p>Bajas</p>
            {loading ? "loading .." : bajas}
          </div>
        </article>
      </section>
    </header>
  );
};

export default HeaderMatricula;
