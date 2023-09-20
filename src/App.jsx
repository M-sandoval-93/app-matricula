import img_03 from "./assets/lvl_03.jpg";
import img_logo from "./assets/logo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import FormLogin from "./components/FormLogin";

const App = () => {
  return (
    <section className="bg-blue-100 min-h-screen flex items-center justify-center p-10">
      <div className="bg-white flex rounded-xl shadow-xl max-w-7xl p-5">
        <div className="w-full md:w-3/5 lg:w-1/2 sm:px-12">
          <div className="w-full flex justify-center items-center">
            <img
              className="w-1/6 md:w-1/4"
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

          {/* redirección a redes sociales */}
          <div className="flex justify-center items-center gap-8 my-8 transition-all duration-300 ease-in-out text-gray-500">
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

        {/* sección imagen pantalla principal */}
        <div className="hidden md:block md:w-2/5 lg:w-1/2">
          <img
            src={img_03}
            alt="Imagen directora"
            className="rounded-xl w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default App;
