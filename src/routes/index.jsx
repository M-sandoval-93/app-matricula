import { createBrowserRouter } from "react-router-dom";

import LayoutPrivate from "../layouts/LayoutPrivate";
import LayoutPublic from "../layouts/LayoutPublic";
import PrivateRutes from "../utils/PrivateRutes";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Course from "../pages/Course";
import Matricula from "../pages/Matricula";
import Setting from "../pages/Setting";
import NotFound from "../pages/NotFound";

import apiGet from "../api/apiGet";

export const router = createBrowserRouter([
  {
    path: "/matricula/",
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
    path: "/matricula/app",
    element: <LayoutPrivate />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/matricula/app/home",
        element: <Home />,
        loader: async () => {
          try {
            // validación de la sesión
            await apiGet({ route: "validateSession" });

            // consulta del periodo de matricula
            const getProcesoMatricula = await apiGet({
              route: "matricula/getPeriodoMatricula",
            });

            const response = await getProcesoMatricula?.data?.state;

            return { response };
          } catch (error) {
            return { error };
          }
        },
      },
      {
        path: "/matricula/app/cursos",
        element: (
          <PrivateRutes privilege={["1", "2", "4"]}>
            <Course />
          </PrivateRutes>
        ),
        loader: async () => {
          try {
            // validación de la sesión
            await apiGet({ route: "validateSession" });

            // consulta del periodo de matricula
            const getProcesoMatricula = await apiGet({
              route: "matricula/getPeriodoMatricula",
            });
            const response = await getProcesoMatricula?.data?.state;

            return { response };
          } catch (error) {
            return { error };
          }
        },
      },
      {
        path: "/matricula/app/matricula",
        element: (
          <PrivateRutes privilege={["1", "2", "3", "4"]}>
            <Matricula />
          </PrivateRutes>
        ),
        loader: async () => {
          try {
            await apiGet({ route: "validateSession" });
            const getProcesoMatricula = await apiGet({
              route: "matricula/getPeriodoMatricula",
            });
            const response = await getProcesoMatricula?.data?.state;
            return { response };
          } catch (error) {
            return { error };
          }
        },
      },
      {
        path: "/matricula/app/setting",
        element: (
          <PrivateRutes privilege={["1"]}>
            <Setting />
          </PrivateRutes>
        ),
      },
    ],
  },
]);
