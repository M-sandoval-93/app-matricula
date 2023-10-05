import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Aside from "../components/sidebar/Aside";
import Main from "../components/main/Main";
import { DesigneProvider } from "../context/ResponsiveProvider";

// export const responsiveContext = createContext();

const LayoutPrivate = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  // const saveExpand = sessionStorage.getItem("expand");
  // const [expand, setExpand] = useState(saveExpand === "true");

  // const handlerResponsive = useCallback(() => {
  //   const changeResponsive = !expand;
  //   setExpand(changeResponsive);
  //   sessionStorage.setItem("expand", changeResponsive.toString());
  // }, [expand]);

  useEffect(() => {
    if (!auth) return navigate("/");
  }, [auth]);

  return (
    <div className="relative h-screen bg-gray-300 min-h-[500px] flex">
      {/* <responsiveContext.Provider value={{ expand, handlerResponsive }}> */}
      <DesigneProvider>
        <Aside />
        <Main>{<Outlet />}</Main>
      </DesigneProvider>
      {/* </responsiveContext.Provider> */}
    </div>
  );
};

export default LayoutPrivate;
