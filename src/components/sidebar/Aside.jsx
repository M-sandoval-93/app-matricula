import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";

const Aside = () => {
  const { authPrivilege, logout } = useAuth();
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const storeActiveItem = localStorage.getItem("activeItem");
    if (storeActiveItem) setActiveItem(parseInt(storeActiveItem, 10));
  }, [activeItem]);

  const handlerActiveItem = (index) => {
    setActiveItem(index);
    localStorage.setItem("activeItem", index.toString());
  };

  return (
    <aside
      className="flex min-h-screen"
      // className="flex flex-col overflow-hidden w-0 md:w-[5.5rem] lg:w-56 bg-gradient-to-br from-blue-500 to-cyan-500
      //   transition-all duration-300 relative min-h-screen"
    >
      <Sidebar>
        {/* <SidebarItem
          icon={<HomeRoundedIcon sx={{ fontSize: 30 }} />}
          text={"Home"}
          to="/app/home"
          active={activeItem === 0}
          onClick={() => handlerActiveItem(0)}
        /> */}

        {/* <SidebarItem
          icon={<AssignmentIndIcon sx={{ fontSize: 30 }} />}
          text={"Estudiante"}
          to="/app/estudiante"
          active={activeItem === 1}
          onClick={() => handlerActiveItem(1)}
        />

        <SidebarItem
          icon={<SchoolIcon sx={{ fontSize: 30 }} />}
          text={"Matrícula"}
          to="/app/matricula"
          active={activeItem === 2}
          onClick={() => handlerActiveItem(2)}
        />

        {authPrivilege === "1" && (
          <SidebarItem
            icon={<SettingsIcon sx={{ fontSize: 30 }} />}
            text={"Setting"}
            to="/app/setting"
            active={activeItem === 3}
            onClick={() => handlerActiveItem(3)}
          />
        )}

        <SidebarItem
          icon={<LogoutIcon sx={{ fontSize: 30 }} />}
          text={"Logout"}
          onClick={() => logout()}
          isLast={true}
        /> */}
      </Sidebar>
    </aside>
  );
};

export default Aside;
