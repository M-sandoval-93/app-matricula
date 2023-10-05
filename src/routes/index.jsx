import { createBrowserRouter } from "react-router-dom";

import LayoutPrivate from "../layouts/LayoutPrivate";
import LayoutPublic from "../layouts/LayoutPublic";
import PrivateRutes from "../utils/PrivateRutes";

import Home from "../pages/Home";
import Matricula from "../pages/Matricula";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Setting from "../pages/Setting";
import Student, { loaderStudent } from "../components/Student";

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
        path: "/app/matricula",
        element: <Matricula />,
      },
      {
        path: "/app/setting",
        // revisar por que no funciona la toma de privilegios al hacer login
        element: (
          <PrivateRutes privilege={"1"}>
            <Setting />
          </PrivateRutes>
        ),
      },
    ],
  },
]);
