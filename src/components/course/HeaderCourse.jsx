import { useEffect, useMemo, useState } from "react";
import useCourse from "../../hooks/useCourse";
import HeaderTitle from "../HeaderTitle";
import CardGradeCourse from "./CardGradeCourse";

const HeaderCourse = () => {
  const { course, updateDataCourse, grade } = useCourse();



  // efecto para obtener la cantidad de estudiantes por grado
  useEffect(() => {
    // inicialización del objeto y sus propiedades
    const gradeData = [7, 8, 1, 2, 3, 4].reduce((acc, grade) => {
      acc[grade] = {
        total: 0,
        masculino: 0,
        femenino: 0,
      };
      return acc;
    }, {});

    // asignación de los valores
    course.forEach(({grado, sexo}) => {
      const gradeKey = grado;
      const sexoLower = sexo.toLowerCase();

      if (gradeData[gradeKey]) {
        gradeData[gradeKey].total++;
        gradeData[gradeKey][sexoLower]++;
      }
    });

    updateDataCourse({grade: gradeData});

  }, [course]);

    

  // estado para almacenar la activación de cada grado
  // const [activeGrade, setActiveGrade] = useState({
  //   7: false,
  //   8: false,
  //   1: false,
  //   2: false,
  //   3: false,
  //   4: false,
  // });



  // obtener los datos del grado mediante la memorización
  const gradeCourse = useMemo(
    // ver si le paso como estado el active:false;
    () => [
      { grade: "7", level: "Básico", countMale: grade[7]?.masculino, countFemale: grade[7]?.femenino,  countTotal: grade[7]?.total },
      { grade: "8", level: "Básico", countMale: grade[8]?.masculino, countFemale: grade[8]?.femenino, countTotal: grade[8]?.total },
      { grade: "1", level: "Medio", countMale: grade[1]?.masculino, countFemale: grade[1]?.femenino, countTotal: grade[1]?.total },
      { grade: "2", level: "Medio", countMale: grade[2]?.masculino, countFemale: grade[2]?.femenino, countTotal: grade[2]?.total },
      { grade: "3", level: "Medio", countMale: grade[3]?.masculino, countFemale: grade[3]?.femenino, countTotal: grade[3]?.total },
      { grade: "4", level: "Medio", countMale: grade[4]?.masculino, countFemale: grade[4]?.femenino, countTotal: grade[4]?.total },
    ],
    // .map(({grade, level, countMale, countFemale, countTotal}) => ({
    //   grade,
    //   level,
    //   countMale,
    //   countFemale,
    //   countTotal,
    //   active: activeGrade[grade],
    // })),
    [grade]
  );



  // useEffect(() => {
  //   const updateActiveGradeCourse = gradeCourse.map(({grade, level, countMale, countFemale, countTotal, active}) => ({
  //     grade,
  //     level,
  //     countMale,
  //     countFemale,
  //     countTotal,
  //     active: activeGrade[grade],
  //   }));

  //   updateDataCourse({grade: updateActiveGradeCourse});
  // }, [activeGrade, gradeCourse]);

  

 

  return (
    <HeaderTitle title={"Registro cursos"}>
      <section className="w-full flex-wrap sm:flex-nowrap sm:w-1/2 relative flex items-center justify-center sm:justify-end gap-4 xs:px-2">
        {gradeCourse.map(({ grade, level, countMale, countFemale, countTotal }) => (
          <CardGradeCourse
            key={grade}
            grade={grade}
            level={level}
            countMale={countMale}
            countFemale={countFemale}
            countTotal={countTotal}
            // active={active}
            // onClick={() => {
            //   setActiveGrade((prev) => ({...prev, [grade]:!prev[grade] }));
            // }}
          />
        ))}
      </section>
    </HeaderTitle>
  );
};

export default HeaderCourse;

