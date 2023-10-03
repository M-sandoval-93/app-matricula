import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Aside from "../components/sidebar/Aside";
import Main from "../components/main/Main";

const LayoutPrivate = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) return navigate("/");
  }, [auth]);

  return (
    <div className="flex relative h-screen bg-gray-300 min-h-[500px]">
      <Aside />
      <Main>{<Outlet />}</Main>
    </div>
  );
};

export default LayoutPrivate;
