import { createBrowserRouter } from "react-router-dom";

import LayoutPrivate from "../layouts/LayoutPrivate";
import LayoutPublic from "../layouts/LayoutPublic";
import PrivateRutes from "../utils/PrivateRutes";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Matricula from "../pages/Matricula";
import Setting from "../pages/Setting";
import NotFound from "../pages/NotFound";
import AltasBajas from "../pages/AltasBajas";
import Student, { loaderStudent } from "../pages/Student";

import apiGet from "../api/apiGet";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/app",
    element: <LayoutPrivate />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/app/home",
        element: <Home />,
      },
      {
        path: "/app/estudiante",
        element: <Student />,
        loader: loaderStudent,
      },
      {
        path: "/app/altasbajas",
        element: <AltasBajas />,
      },
      {
        path: "/app/matricula",
        element: (
          <PrivateRutes privilege={"1"}>
            <Matricula />
          </PrivateRutes>
        ),
        loader: async () => {
          try {
            await apiGet({ route: "validateSession" });
            return true;
          } catch (error) {
            return { error };
          }
        },
      },
      {
        path: "/app/setting",
        element: (
          <PrivateRutes privilege={"1"}>
            <Setting />
          </PrivateRutes>
        ),
      },
    ],
  },
]);
