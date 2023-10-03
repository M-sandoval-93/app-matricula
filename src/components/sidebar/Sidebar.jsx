import { createContext, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import logo from "../../assets/logo.png";

export const SidebarContext = createContext();

const Sidebar = ({ children }) => {
  const saveExpand = sessionStorage.getItem("expand");
  const [expand, setExpand] = useState(saveExpand === "true");

  const handlerExpand = () => {
    const changeExpand = !expand;
    setExpand(changeExpand);
    sessionStorage.setItem("expand", changeExpand.toString());
  };

  return (
    <div
      className={`relative 
      flex flex-col transition-all duration-300 w-0 md:w-[5.5rem] lg:w-56
      bg-gradient-to-br from-blue-500 to-cyan-500`}
    >
      <span
        className={`absolute 
          ${expand ? "rotate-0 lg:rotate-180" : "rotate-180 lg:rotate-0"}
          w-10 h-10 top-6 z-10 -right-16 rotate-180 lg:-right-5
          flex items-center justify-center transition-all duration-300
          bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full border border-gray-300 cursor-pointer`}
        onClick={handlerExpand}
      >
        <ArrowBackIcon sx={{ fontSize: 30 }} />
      </span>

      {/* <div className=""> */}
      <div className="relative flex items-center justify-center w-full mt-6 px-4">
        <img src={logo} alt="Logo liceo" className="w-0 md:w-24" />
      </div>
      {/* </div> */}

      <SidebarContext.Provider value={{ expand }}>
        <div className="">{children}</div>
      </SidebarContext.Provider>

      {/* <div className="relative mt-4 w-0 flex flex-col md:w-full cursor-pointer h-full transition-all duration-[400]">
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
      </div> */}
    </div>
  );
};

export default Sidebar;
