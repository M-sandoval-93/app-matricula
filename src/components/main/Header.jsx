import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LightModeIcon from "@mui/icons-material/LightMode";
import useDesigne from "../../hooks/useDesigne";
import useAuth from "../../hooks/useAuth";

// import useResponsive from "../../hooks/useResponsive";

const Header = () => {
  // const { expand, handlerResponsive } = useResponsive();
  const { responsive, handlerResponsive } = useDesigne();
  const { authUserName, authEmail } = useAuth();

  return (
    <header className="py-4 bg-white my-1 mx-2 rounded-md">
      <nav className="relative flex w-full gap-4 items-center transition-all duration-300">
        <span
          className={`absolute flex items-center justify-center rounded-full border w-10 h-10 top-[.40rem] lg:-left-5
            text-white bg-gradient-to-br from-blue-500 to-cyan-500 border-gray-500 cursor-pointer
            transition-all duration-300 z-20
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
            className="relative hidden md:flex flex-col
            font-semibold ml-16 lg:ml-4 transition-all duration-300 text-base leading-5 text-blue-600"
          >
            <p>Liceo Bicentenario</p>
            <p>Valentín Letelier Madariaga</p>
          </span>
          <div className="relative flex items-center">
            <div className="relative flex flex-col items-end leading-5">
              <span className="text-blue-600 text-lg">
                Hola, <span className="font-semibold">{authUserName}</span>
              </span>
              <span className="text-sm text-gray-500">{authEmail}</span>
            </div>
            <div className="mx-3 bg-blue-600 w-[.1rem] h-10"></div>
            <div>
              <span className="relative text-black cursor-pointer">
                {<LightModeIcon sx={{ fontSize: 35 }} />}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
