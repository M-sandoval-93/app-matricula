import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useDesigne from "../../hooks/useDesigne";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { responsive, theme, handlerResponsive, handlerTheme } = useDesigne();
  const { authUserName, authEmail } = useAuth();

  return (
    <header className="relative py-4 bg-white dark:bg-zinc-800 my-1 mx-2 rounded-md transition-all duration-300">
      <nav className="relative flex w-full gap-4 items-center transition-all duration-300">
        <span
          className={`absolute flex items-center justify-center rounded-full border w-10 h-10 top-[.40rem]
            text-white dark:text-zinc-800 bg-gradient-to-br from-blue-500 to-cyan-500 border-gray-500 dark:border-white cursor-pointer
            transition-all duration-300 z-10 hover:scale-105
            ${
              responsive
                ? "rotate-180 md:rotate-0 left-5"
                : "md:rotate-180 left-52 md:left-5"
            }
          `}
          onClick={() => handlerResponsive()}
        >
          <ArrowBackIcon sx={{ fontSize: 30 }} />
        </span>
        <div className="relative flex items-center justify-end md:justify-between w-full px-4">
          <span
            className="relative hidden md:flex flex-col md:text-base lg:text-xl
            font-semibold ml-16 transition-all duration-300 leading-5 text-blue-600 dark:text-blue-300"
          >
            <p>Liceo Bicentenario</p>
            <p>Valentín Letelier Madariaga</p>
          </span>
          <div className="relative flex items-center">
            <div className="relative flex flex-col items-end leading-5">
              <span className="text-blue-600 dark:text-blue-300 text-sm md:text-base lg:text-lg transition-all duration-300">
                Hola, <span className="font-semibold">{authUserName}</span>
              </span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-300 transition-all duration-300">
                {authEmail}
              </span>
            </div>
            <div className="mx-3 bg-blue-600 dark:bg-blue-300 w-[.1rem] h-10 transition-all duration-300"></div>
            <div>
              <button
                className="relative text-black dark:text-white cursor-pointer transition-all duration-300"
                onClick={() => handlerTheme()}
              >
                {theme ? (
                  <LightModeIcon sx={{ fontSize: 35 }} />
                ) : (
                  <DarkModeIcon sx={{ fontSize: 35 }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
