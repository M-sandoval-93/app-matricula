import { useEffect, useState } from "react";
import useCourse from "../../hooks/useCourse";
import HeaderTitle from "../HeaderTitle";
import CardGradeCourse from "./CardGradeCourse";

const HeaderCourse = () => {
  const { grade } = useCourse();

  // revisar !!
  const [gradeCourse, setGradeCourse] = useState([]);

  useEffect(() => {
    setGradeCourse([
      { grade: "7", level: "Básico", count: grade.septimo, active: true },
      { grade: "8", level: "Básico", count: grade.octavo, active: false },
      { grade: "1", level: "Medio", count: grade.primero, active: false },
      { grade: "2", level: "Medio", count: grade.segundo, active: false },
      { grade: "3", level: "Medio", count: grade.tercero, active: false },
      { grade: "4", level: "Medio", count: grade.cuarto, active: false },
    ]);
  }, [grade]);

  return (
    <HeaderTitle title={"Regitro cursos"}>
      <section className="w-full flex-wrap sm:flex-nowrap sm:w-1/2 relative flex items-center justify-center sm:justify-end gap-4 xs:px-2">
        {gradeCourse.map(({ grade, level, count, active }) => (
          <CardGradeCourse
            key={grade}
            grade={grade}
            level={level}
            count={count}
            active={active}
          />
        ))}
      </section>
    </HeaderTitle>
  );
};

export default HeaderCourse;
