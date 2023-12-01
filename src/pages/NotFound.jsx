import { Link, useRouteError } from "react-router-dom";
import useStateAuth from "../hooks/useStateAuth";

const NotFound = () => {
  const error = useRouteError();
  const { stateAuth } = useStateAuth();

  const restarSidevarItem = () => {
    localStorage.setItem("activeItem", "0");
  };

  return (
    <div className="container">
      <h1>404</h1>
      <p>Page not found</p>
      <p>{error.statusText || error.message}</p>
      <Link
        to={stateAuth ? "matricula/app/home" : "/matricula"}
        onClick={restarSidevarItem}
      >
        Volver
      </Link>
    </div>
  );
};

export default NotFound;
