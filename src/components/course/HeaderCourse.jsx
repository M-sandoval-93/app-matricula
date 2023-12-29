import { useEffect, useMemo, useState } from "react";
import useCourse from "../../hooks/useCourse";
import HeaderTitle from "../HeaderTitle";
import CardGradeCourse from "./CardGradeCourse";

const HeaderCourse = () => {
  const { course, updateDataCourse, grade } = useCourse();

  // efecto para obtener la cantidad de estudiantes por grado
  useEffect(() => {
    const gradeData = {};

    // inicialización de cantidades por grado
    [7, 8, 1, 2, 3, 4].forEach((grade) => {
      gradeData[grade] = {
        total: 0,
        masculino: 0,
        femenino: 0,
      };
    });

    // calcular cantidad de hombres y mujeres
    course.forEach((student) => {
      const gradeKey = student.grado;
      const sexo = student.sexo.toLowerCase();

      if (gradeData[gradeKey]) {
        gradeData[gradeKey].total++;
        gradeData[gradeKey][sexo]++;
      }
    });

    updateDataCourse({ grade: gradeData });
  }, [course]);

  // obtener los datos del grado mediante la memorización
  const gradeCourse = useMemo(
    () => [
      { grade: "7", level: "Básico", count: grade[7]?.total, active: false },
      { grade: "8", level: "Básico", count: grade[8]?.total, active: false },
      { grade: "1", level: "Medio", count: grade[1]?.total, active: false },
      { grade: "2", level: "Medio", count: grade[2]?.total, active: false },
      { grade: "3", level: "Medio", count: grade[3]?.total, active: false },
      { grade: "4", level: "Medio", count: grade[4]?.total, active: false },
    ],
    [grade]
  );

  return (
    <HeaderTitle title={"Registro cursos"}>
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

// NOTAS
// manejar cantidad de hombres y mujeres por grado

// useEffect(() => {
//   const gradeData = course.reduce(
//     (acc, student) => {
//       const gradeKey = student.grado;
//       const sexo = student.sexo.toLowerCase();

//       if (acc[gradeKey]) {
//         acc[gradeKey].total++;
//         acc[gradeKey][sexo]++;
//       }

//       return acc;
//     },
//     {
//       7: { total: 0, masculino: 0, femenino: 0 },
//       8: { total: 0, masculino: 0, femenino: 0 },
//       1: { total: 0, masculino: 0, femenino: 0 },
//       2: { total: 0, masculino: 0, femenino: 0 },
//       3: { total: 0, masculino: 0, femenino: 0 },
//       4: { total: 0, masculino: 0, femenino: 0 },
//     }
//   );

//   updateDataCourse({ grade: gradeData });
// }, [course, updateDataCourse]);

// const gradeCourse = useMemo(
//   () => [
//     {
//       grade: "7",
//       level: "Básico",
//       count: grade[7].total,
//       male: grade[7].masculino,
//       female: grade[7].femenino,
//       active: false,
//     },
//     {
//       grade: "8",
//       level: "Básico",
//       count: grade[8].total,
//       male: grade[8].masculino,
//       female: grade[8].femenino,
//       active: false,
//     },
//     {
//       grade: "1",
//       level: "Medio",
//       count: grade[1].total,
//       male: grade[1].masculino,
//       female: grade[1].femenino,
//       active: false,
//     },
//     {
//       grade: "2",
//       level: "Medio",
//       count: grade[2].total,
//       male: grade[2].masculino,
//       female: grade[2].femenino,
//       active: false,
//     },
//     {
//       grade: "3",
//       level: "Medio",
//       count: grade[3].total,
//       male: grade[3].masculino,
//       female: grade[3].femenino,
//       active: false,
//     },
//     {
//       grade: "4",
//       level: "Medio",
//       count: grade[4].total,
//       male: grade[4].masculino,
//       female: grade[4].femenino,
//       active: false,
//     },
//   ],
//   [grade]
// );

// VERSION 2 A REVISAR ===============>
// import { useEffect, useMemo } from "react";
// import useCourse from "../../hooks/useCourse";
// import HeaderTitle from "../HeaderTitle";
// import CardGradeCourse from "./CardGradeCourse";

// const HeaderCourse = () => {
//   const { course, updateDataCourse, grade } = useCourse();

//   useEffect(() => {
//     const gradeData = [7, 8, 1, 2, 3, 4].reduce((acc, grade) => {
//       acc[grade] = {
//         total: 0,
//         masculino: 0,
//         femenino: 0,
//       };
//       return acc;
//     }, {});

//     course.forEach(({ grado, sexo }) => {
//       const gradeKey = grado;
//       const sexoLower = sexo.toLowerCase();

//       if (gradeData[gradeKey]) {
//         gradeData[gradeKey].total++;
//         gradeData[gradeKey][sexoLower]++;
//       }
//     });

//     updateDataCourse({ grade: gradeData });
//   }, [course, updateDataCourse]);

//   const gradeCourse = useMemo(
//     () => [
//       { grade: "7", level: "Básico", count: Object.values(grade[7]?.total), active: false },
//       { grade: "8", level: "Básico", count: Object.values(grade[8]?.total), active: false },
//       { grade: "1", level: "Medio", count: Object.values(grade[1]?.total), active: false },
//       { grade: "2", level: "Medio", count: Object.values(grade[2]?.total), active: false },
//       { grade: "3", level: "Medio", count: Object.values(grade[3]?.total), active: false },
//       { grade: "4", level: "Medio", count: Object.values(grade[4]?.total), active: false },
//     ],
//     [grade]
//   );

//   return (
//     <HeaderTitle title={"Registro cursos"}>
//       <section className="w-full flex-wrap sm:flex-nowrap sm:w-1/2 relative flex items-center justify-center sm:justify-end gap-4 xs:px-2">
//         {gradeCourse.map(({ grade, level, count, active }) => (
//           <CardGradeCourse
//             key={grade}
//             grade={grade}
//             level={level}
//             count={count}
//             active={active}
//           />
//         ))}
//       </section>
//     </HeaderTitle>
//   );
// };

// export default HeaderCourse;
