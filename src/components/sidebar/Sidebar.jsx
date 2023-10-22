import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../assets/logo.png";
import useDesigne from "../../hooks/useDesigne";

const Sidebar = ({ children }) => {
  const { responsive } = useDesigne();

  return (
    <div
      className={`
        absolute md:relative h-full z-10
        transition-all duration-300
        bg-gradient-to-tr from-blue-500 dark:from-cyan-600 to-cyan-500 dark:to-blue-600
        ${
          responsive
            ? "md:w-[5.5rem] lg:w-56 w-0 opacity-0 md:opacity-100"
            : "md:w-0 lg:w-[5.5rem] w-56 opacity-100 md:opacity-0 lg:opacity-100"
        }
      `}
    >
      <div className="relative flex items-center justify-center w-full mt-5 px-4 transition-all duration-300">
        <img
          src={logo}
          alt="Insignia establecimiento"
          className="w-24 md:animate-rotateY"
        />
      </div>

      <div className="mt-8 ml-7 text-white cursor-pointer">{children}</div>
    </div>
  );
};

export default Sidebar;
