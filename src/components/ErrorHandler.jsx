import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ErrorHandler = ({ error }) => {
  const { logout } = useAuth();
  const status = error?.response?.status;
  let errorText = "";

  if (status === 403) {
    errorText = "Advertencia: Privilegios insuficientes !";
  } else {
    errorText = error?.response
      ? error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message
      : error?.message;
  }

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "warning",
        title: "Excepción detectada",
        text: errorText,
      }).then(() => {
        // aqui trabajar la renovacion del token
        if (errorText === "Expired token") {
          localStorage.removeItem("activeItem");
          logout();
        }
      });
    }
  }, [error]);
};

export default ErrorHandler;
