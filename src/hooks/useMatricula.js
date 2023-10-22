import { useContext } from "react";
import MatriculaContext from "../context/MatriculaProvider";

const useMatricula = () => {
  return useContext(MatriculaContext);
};

export default useMatricula;
