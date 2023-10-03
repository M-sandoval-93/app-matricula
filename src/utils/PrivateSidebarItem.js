import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const PrivateSidebarItem = ({ children, privilege }) => {
  const { authPrivilege } = useAuth();

  useEffect(() => {
    if (authPrivilege === privilege) {
      return children;
    }
  }, [authPrivilege]);

};

export default PrivateSidebarItem;
