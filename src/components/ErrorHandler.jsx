import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ErrorHandler = ({ error }) => {
  const { logout } = useAuth();

  const errorText = error?.response
    ? error?.response?.data?.message
    : error?.message;

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "warning",
        title: "Excepción detectada",
        text: errorText,
        showConfirmButton: false,
        timer: 1500,
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
