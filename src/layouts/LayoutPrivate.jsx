import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Aside from "../components/sidebar/Aside";
import Main from "../components/main/Main";
import { DesigneProvider } from "../context/ResponsiveProvider";

const LayoutPrivate = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) return navigate("/");
  }, [auth]);

  return (
    <div className="relative h-screen bg-gray-400 dark:bg-gray-200 min-h-[500px] flex transition-all duration-300">
      <DesigneProvider>
        <Aside />
        <Main>{<Outlet />}</Main>
      </DesigneProvider>
    </div>
  );
};

export default LayoutPrivate;
