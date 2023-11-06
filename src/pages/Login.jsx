import img_03 from "../assets/lvl_03.jpg";
import img_logo from "../assets/logo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import FormLogin from "../components/FormLogin";

const Login = () => {
  return (
    <div className="relative bg-gradient-to-tr from-cyan-200 to-blue-300 w-screen min-h-screen flex items-center justify-center overflow-y-auto">
      <div className="relative bg-white w-full h-full rounded-xl flex shadow-xl max-w-6xl min-h-[40rem] max-h-[45rem] m-10 p-4 gap-2 lg:gap-4 opacity-95">
        <div className="relative w-full md:w-1/2 lg:w-3/5 sm:px-12">
          <div className="w-full flex justify-center items-center">
            <img
              className="w-1/5 mt-5 animate-rotateY"
              src={img_logo}
              alt="Logo del establecimiento"
            />
          </div>

          <h2 className="font-bold text-3xl text-blue-700 text-center mt-8">
            MATRÍCULAS
          </h2>

          <p className="text-md sm:text-xl mt-4 text-center text-gray-500">
            Registro de matriculas periodo 2024
          </p>

          <FormLogin />

          <div className="mt-10 border-t border-gray-300">
            <span className="block w-max mx-auto -mt-4 px-4 text-center text-gray-400 bg-white text-lg">
              or
            </span>
          </div>

          <div className="flex justify-center items-center gap-10 my-8 transition-all duration-300 ease-in-out text-gray-500">
            <span className="hover:scale-110 transition-all duration-300 ease-in-out hover:text-blue-500">
              <FacebookIcon sx={{ fontSize: 40 }} />
            </span>

            <span className="hover:scale-110 transition-all duration-300 ease-in-out hover:text-red-400">
              <InstagramIcon sx={{ fontSize: 40 }} />
            </span>

            <span className="hover:scale-110 transition-all duration-300 ease-in-out hover:text-sky-400">
              <LanguageIcon sx={{ fontSize: 40 }} />
            </span>
          </div>
        </div>

        <div className="hidden md:block w-full md:w-1/2 lg:w-2/5">
          <img
            src={img_03}
            alt="directora"
            className="h-full w-full rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
