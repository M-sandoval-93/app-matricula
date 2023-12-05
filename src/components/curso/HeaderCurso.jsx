import { useState } from "react";
import HeaderTitle from "../HeaderTitle";
import GradeCard from "./GradeCard";

const HeaderCurso = () => {
  // const [] = useState();

  return (
    <HeaderTitle title={"Regitro cursos"}>
      <section className="w-full flex-wrap sm:flex-nowrap sm:w-1/2 relative flex items-center justify-center sm:justify-end gap-4 xs:px-2">
        <GradeCard grade={"7°"} level={"Básico"} count={93} />
        <GradeCard grade={"8°"} level={"Básico"} count={98} />
        <GradeCard grade={"1°"} level={"Medio"} count={230} />
        <GradeCard grade={"2°"} level={"Medio"} count={300} />
        <GradeCard grade={"3°"} level={"Medio"} count={278} />
        <GradeCard grade={"4°"} level={"Medio"} count={750} />
      </section>
    </HeaderTitle>
  );
};

export default HeaderCurso;
