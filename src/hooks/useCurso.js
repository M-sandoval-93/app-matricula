import { useContext } from "react";
import CursoContext from "../context/CursoProvider";

const useCurso = () => {
  return useContext(CursoContext);
};

export default useCurso;
