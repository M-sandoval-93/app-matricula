import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const stateSession = ({ response }) => {
  const { logout } = useAuth();

  useEffect(() => {
    if (response === "expired session") {
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Sesión expirada",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        localStorage.removeItem("activeItem");
        logout();
      });
    }
  }, [response]);
};

export default stateSession;
