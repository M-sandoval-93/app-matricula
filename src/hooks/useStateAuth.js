import useAuth from "./useAuth";

const useStateAuth = () => {
  const { auth } = useAuth();
  const stateAuth = auth === sessionStorage.getItem("auth");

  return { stateAuth };
};

export default useStateAuth;
