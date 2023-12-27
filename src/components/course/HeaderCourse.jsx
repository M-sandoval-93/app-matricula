import { useEffect, useState } from "react";
import useCourse from "../../hooks/useCourse";
import HeaderTitle from "../HeaderTitle";
import CardGradeCourse from "./CardGradeCourse";

const HeaderCourse = () => {
  const { grade } = useCourse();
  // const { active, setActive } = useState(null);

  // revisar !!
  const [gradeCourse, setGradeCourse] = useState([
    { grade: "7", level: "Básico", count: grade.septimo, active: false },
    { grade: "8", level: "Básico", count: grade.octavo, active: false },
    { grade: "1", level: "Medio", count: grade.primero, active: false },
    { grade: "2", level: "Medio", count: grade.segundo, active: false },
    { grade: "3", level: "Medio", count: grade.tercero, active: false },
    { grade: "4", level: "Medio", count: grade.cuarto, active: false },
  ]);

  // useEffect(() => {
  //   console.log(grade);
  // }, []);

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

// probar
// const HeaderCourse = () => {
//   const { grade } = useCourse();
//   const [gradeCourse, setGradeCourse] = useState([
//     { grade: "7", level: "Básico", count: grade.septimo, active: false },
//     { grade: "8", level: "Básico", count: grade.octavo, active: false },
//     { grade: "1", level: "Medio", count: grade.primero, active: false },
//     { grade: "2", level: "Medio", count: grade.segundo, active: false },
//     { grade: "3", level: "Medio", count: grade.tercero, active: false },
//     { grade: "4", level: "Medio", count: grade.cuarto, active: false },
//   ]);

//   // Función para actualizar el estado de un objeto específico
//   const updateGradeCourse = (updatedGrade, index) => {
//     setGradeCourse((prevGradeCourse) => {
//       const newGradeCourse = [...prevGradeCourse];
//       newGradeCourse[index] = updatedGrade;
//       return newGradeCourse;
//     });
//   };

//   // Ejemplo de cómo puedes usar la función updateGradeCourse
//   const handleUpdateGrade = () => {
//     const updatedGrade = { grade: "7", level: "Básico", count: 100, active: true };
//     const indexToUpdate = 0; // El índice del objeto que quieres actualizar
//     updateGradeCourse(updatedGrade, indexToUpdate);
//   };

//   return (
//     <HeaderTitle title={"Registro cursos"}>
//       <section className="w-full flex-wrap sm:flex-nowrap sm:w-1/2 relative flex items-center justify-center sm:justify-end gap-4 xs:px-2">
//         {gradeCourse.map(({ grade, level, count, active }, index) => (
//           <CardGradeCourse
//             key={grade}
//             grade={grade}
//             level={level}
//             count={count}
//             active={active}
//             // Ejemplo de cómo puedes pasar la función de actualización al componente CardGradeCourse
//             onUpdateGrade={(updatedGrade) => updateGradeCourse(updatedGrade, index)}
//           />
//         ))}
//       </section>
//     </HeaderTitle>
//   );
// };

// export default HeaderCourse;
