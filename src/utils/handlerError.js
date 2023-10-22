import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const handlerError = ({ error }) => {
  const { logout } = useAuth();

  const errorText = error?.response
    ? error?.response?.data?.message
    : error?.message;

  if (error) {
    Swal.fire({
      icon: "warning",
      title: "Excepción detectada",
      text: errorText,
      showConfirmButton: false,
      timer: 1500,
    });

    if (errorText === "Expired token") {
      localStorage.removeItem("activeItem");
      logout();
    }
  }
};

export default handlerError;
