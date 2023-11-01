import * as Yup from "yup";

const validationStudent = () => {
  return Yup.object().shape({

    rut_estudiante: Yup.string()
      .trim()
      .min(7, "El rut debe tener un minimo de 7 caracteres !")
      .max(9, "El rut no debe tener más de 9 caracteres !")
      .required("Campo requerido !"),

    dv_rut_estudiante: Yup.string()
      .trim()
      .max(1, "Solo se admite un caracter !")
      .matches(
        /^[0-9kK]*$/,
        "Solo de admite un digito numérico o la letra k/K !"
      )
      .required("Campo requerido !"),

    nombres_estudiante: Yup.string()
      .trim()
      .required("Campo requerido !"),

    nombre_social: Yup.string()
        .trim()
        .optional(),

    apellido_paterno: Yup.string()
        .trim()
        .required("Campo requerido !"),

    apellido_materno: Yup.string()
        .trim()
        .required("Campo requerido !"),

    sexo: Yup.string()
        .notOneOf([""], "Seleccione un valor !")
        .required("Campo requerido !"),

    fecha_nacimiento: Yup.date().required("Campo requerido !"),

  });
};

export default validationStudent;
