import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const PrivateRutes = ({ children, privilege }) => {
  const navigate = useNavigate();
  const { authPrivilege } = useAuth();

  // useEffect(() => {
  //   if (authPrivilege !== privilege) return navigate("/app/home");
  // }, [authPrivilege]);

  useEffect(() => {
    if (!privilege.includes(authPrivilege)) navigate("/matricula/app/home");
  }, [authPrivilege, privilege]);

  return children;
};

export default PrivateRutes;
