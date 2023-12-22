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
  const { logout, authPrivilege } = useAuth();
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
    <aside className="relative flex min-h-screen">
      <Sidebar>
        <SidebarItem
          icon={<HomeRoundedIcon sx={{ fontSize: 30 }} />}
          text={"Home"}
          to="/matricula/app/home"
          active={activeItem === 0}
          onClick={() => handlerActiveItem(0)}
        />

        {/* <SidebarItem
          icon={<AssignmentIndIcon sx={{ fontSize: 30 }} />}
          text={"Estudiante"}
          to="/app/estudiante"
          active={activeItem === 1}
          onClick={() => handlerActiveItem(1)}
        /> */}

        {authPrivilege === "1" && (
          <SidebarItem
            icon={<AssignmentIndIcon sx={{ fontSize: 30 }} />}
            text={"Cursos"}
            to="/matricula/app/cursos"
            active={activeItem === 1}
            onClick={() => handlerActiveItem(1)}
          />
        )}

        {(authPrivilege === "1" || authPrivilege === "2" || authPrivilege === "3") && (
          <SidebarItem
            icon={<SchoolIcon sx={{ fontSize: 30 }} />}
            text={"Matrícula"}
            to="/matricula/app/matricula"
            active={activeItem === 2}
            onClick={() => handlerActiveItem(2)}
          />
        )}

        {authPrivilege === "1" && (
          <SidebarItem
            icon={<SettingsIcon sx={{ fontSize: 30 }} />}
            text={"Setting"}
            to="/matricula/app/setting"
            active={activeItem === 3}
            onClick={() => handlerActiveItem(3)}
          />
        )}

        <SidebarItem
          icon={<LogoutIcon sx={{ fontSize: 30 }} />}
          text={"Logout"}
          to="/matricula/"
          onClick={() => logout()}
          isLast={true}
        />
      </Sidebar>
    </aside>
  );
};

export default Aside;
