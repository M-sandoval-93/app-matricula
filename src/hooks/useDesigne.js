import { useContext } from "react";
import DesigneContext from "../context/ResponsiveProvider";

const useDesigne = () => {
  return useContext(DesigneContext);
};

export default useDesigne;
