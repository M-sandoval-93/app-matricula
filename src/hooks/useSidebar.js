import { useContext } from "react";
import { SidebarContext } from "../components/Sidebar";

const useSidebar = () => {
  return useContext(SidebarContext);
};

export default useSidebar;
