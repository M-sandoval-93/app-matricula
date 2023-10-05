import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";
import useAuth from "../hooks/useAuth";

import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const Header = () => {
  const { authPrivilege } = useAuth();
  const [activeItem, setActiveItem] = useState(0);

  const handlerActiveItem = (index) => {
    setActiveItem(index);
    localStorage.setItem("activeItem", index.toString());
  };

  useEffect(() => {
    const storeActiveItem = localStorage.getItem("activeItem");
    if (storeActiveItem) setActiveItem(parseInt(storeActiveItem, 10));
  }, [activeItem]);

  return (
    <header className="flex min-h-screen">
      <Sidebar>
        <SidebarItem
          icon={<HomeIcon />}
          text={"Home"}
          to="/app/home"
          active={activeItem === 0}
          onClick={() => handlerActiveItem(0)}
        />

        <SidebarItem
          icon={<AssignmentIndIcon />}
          text={"Estudiante"}
          to="/app/estudiante"
          active={activeItem === 1}
          onClick={() => handlerActiveItem(1)}
        />

        <SidebarItem
          icon={<SchoolIcon />}
          text={"Matricula"}
          to="/app/matricula"
          active={activeItem === 2}
          onClick={() => handlerActiveItem(2)}
        />

        {authPrivilege === "1" && (
          <SidebarItem
            icon={<SettingsIcon />}
            text={"Setting"}
            to="/app/setting"
            active={activeItem === 3}
            onClick={() => handlerActiveItem(3)}
          />
        )}
      </Sidebar>
    </header>
  );
};

export default Header;
