import { getCurrentDate } from "./funciones";

export const initialValuesMatricula = () => {
  return {
    n_matricula: "",
    fecha_matricula: getCurrentDate(),
    rut_estudiante: "",
    dv_rut_estudiante: "",
    nombres_estudiante: "",
    grado: "",
    rut_titular: "",
    dv_rut_titular: "",
    nombres_titular: "Asignar apoderado(a) titular !",
    rut_suplente: "",
    dv_rut_suplente: "",
    nombres_suplente: "Asignar apoderado(a) suplente !",
  };
};

export const initialValuesStudent = () => {
  return {
    id_estudiante: "",
    rut_estudiante: "",
    dv_rut_estudiante: "",
    nombres_estudiante: "",
    nombre_social: "",
    apellido_paterno: "",
    apellido_materno: "",
    sexo: "",
    fecha_nacimiento: "",
  };
};

export const initialValuesRepresentative = () => {};
