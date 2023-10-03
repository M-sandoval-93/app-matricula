import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";



import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const SidebarContext = createContext();

const Sidebar = ({ children }) => {
  const { authEmail, authUserName } = useAuth();
  const saveExpand = sessionStorage.getItem("expand");
  const [expand, setExpand] = useState(saveExpand === "true");

  const handlerExpand = () => {
    const changeExpand = !expand;
    setExpand(changeExpand);
    sessionStorage.setItem("expand", changeExpand.toString());
  };

  return (
    <aside className="h-screen">
      <nav className=" bg-gradient-to-tr from-secondary-blue to-primary-blue h-full flex flex-col border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            alt="logo prueba"
            className={`overflow-hidden transition-all ${
              expand ? "w-10" : "w-0"
            }`}
          />
          <div
            className={`flex justify-start flex-col leading-none text-white absolute left-16 origin-left ${
              !expand && "scale-0"
            } duration-100`}
          >
            <span>Liceo</span>
            <span>Valentín Letelier</span>
          </div>
          <button
            onClick={handlerExpand}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expand ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expand }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="icon"
            className="w-10 h-10 rounded-md"
          />

          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expand ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{authUserName}</h4>
              <span className="text-xs text-gray-600">{authEmail}</span>
            </div>
            <MoreVertIcon />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
