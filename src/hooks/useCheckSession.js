import useAuth from "./useAuth";

const useCheckSession = ({ status }) => {
  const { logout } = useAuth();
  if (status === "Expired session") {
    return logout();
  }
};

export default useCheckSession;
