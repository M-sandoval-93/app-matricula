import { useNavigate } from "react-router-dom";

const redirectHome = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/matricula/app/home");
  };

  return redirect;
};

export default redirectHome;
