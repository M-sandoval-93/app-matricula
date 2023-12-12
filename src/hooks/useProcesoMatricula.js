import { useContext } from "react";
import ProcesoMatriculaContext from "../context/ProcesoMatriculaProvider";

const useProcesoMatricula = () => {
  return useContext(ProcesoMatriculaContext);
};

export default useProcesoMatricula;
