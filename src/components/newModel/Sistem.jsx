import logo from "../../assets/logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const Sistem = () => {
  return (
    <div className="flex relative h-screen bg-gray-300 min-h-[500px]">
      <aside
        className="flex flex-col overflow-hidden w-0 md:w-[5.5rem] lg:w-56 bg-gradient-to-br from-blue-500 to-cyan-500 
        transition-all duration-300 relative min-h-screen"
      >
        <div className="w-full flex justify-center items-center">
          <div className="p-4 pb-2 mt-4 flex justify-center items-center">
            <img src={logo} alt="Logo liceo" className="w-0 md:w-24" />
          </div>
        </div>

        <div className="relative mt-4 w-0 flex flex-col md:w-full cursor-pointer h-full transition-all duration-[400]">
          <Link className="relative hidden md:flex items-center text-white gap-4 h-14 ml-6 hover:ml-8 lg:ml-8 lg:hover:ml-12 transition-all duration-[400ms]">
            <span>
              <HomeRoundedIcon sx={{ fontSize: 35 }} />
            </span>
            <h3 className="text-xl font-semibold pl-8 lg:pl-0 transition-all duration-[400ms]">
              Home
            </h3>
          </Link>

          <Link className="relative hidden md:flex items-center text-white gap-4 h-14 ml-6 hover:ml-8 lg:ml-8 lg:hover:ml-12 transition-all duration-[400ms]">
            <span>
              <AssignmentIndIcon sx={{ fontSize: 35 }} />
            </span>
            <h3 className="text-xl font-semibold pl-8 lg:pl-0 transition-all duration-[400ms]">
              Matricula
            </h3>
          </Link>

          <Link className="absolute bottom-8 hidden md:flex items-center text-white gap-4 h-14 ml-6 hover:ml-8 lg:ml-8 lg:hover:ml-12 transition-all duration-[400ms]">
            <span>
              <LogoutIcon sx={{ fontSize: 35 }} />
            </span>
            <h3 className="text-xl font-semibold pl-8 lg:pl-0 transition-all duration-[400ms]">
              Logout
            </h3>
          </Link>
        </div>
      </aside>

      <main className="flex flex-col min-h-screen flex-1">
        <header className="py-6 bg-white my-1 mx-2 rounded-md">
          <nav className="relative pl-14 md:pl-6 flex gap-4 items-center transition-all duration-300">
            <span
              className="bg-gradient-to-bl from-blue-400 to-cyan-400 text-white border-2 border-gray-300 
                w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center absolute left-2 md:-left-6 
                transition-all duration-300 rotate-180 lg:rotate-0 cursor-pointer"
              onClick={() => {
                console.log("presion");
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 30 }} />
            </span>
            <h1>Mi navbar</h1>
          </nav>
        </header>

        <section
          id="section_main"
          className="flex flex-1 bg-white my-1 mx-2 rounded-md overflow-hidden overflow-y-auto"
        >
          <div className="w-full p-5">
            <h1 className="p-5 flex">Seccion principal</h1>
          </div>
        </section>

        <footer className="relative rounded-md flex items-center justify-center py-1 bg-transparent mx-2 bg-white">
          <div className="flex items-center justify-center flex-wrap text-sm">
            <p>Copyright &copy; Departamento de Informática 2023.</p>
            <p>Todos los derechos reservados.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Sistem;
