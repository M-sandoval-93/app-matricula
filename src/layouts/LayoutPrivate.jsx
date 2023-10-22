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
    <div className="relative w-screen h-screen bg-zinc-800 dark:bg-white min-h-[500px] flex overflow-auto">
      <DesigneProvider>
        <Aside />
        <Main>{<Outlet />}</Main>
      </DesigneProvider>
    </div>
  );
};

export default LayoutPrivate;
