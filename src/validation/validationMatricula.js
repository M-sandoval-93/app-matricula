import * as Yup from "yup";

const validationMatricula = () => {
  return Yup.object().shape({
    n_matricula: Yup.string().trim().optional(),

    fecha_matricula: Yup.date().required("Fecha de matrícula requerida !"),

    rut_estudiante: Yup.string()
      .trim()
      .min(7, "El rut debe tener un minimo de 7 caracteres !")
      .max(9, "El rut no debe tener más de 9 caracteres !")
      .required("Rut de estudiante requerido !"),

    dv_rut_estudiante: Yup.string()
      .trim()
      .max(1, "Solo se admite un caracter !")
      .matches(
        /^[0-9kK]*$/,
        "Solo de admite un digito numérico o la letra k/K !"
      )
      .required("Digito verificador requerido !"),

    nombres_estudiante: Yup.string()
      .optional()
      .trim()
      .notOneOf(
        ["Sin registro de estudiante !"],
        "El rut no se encuentra ingresado"
      ),

    grado: Yup.string()
      .max(1, "Solo se admite un dígito")
      .notOneOf([""], "Seleccione un grado válido !")
      .required("La asignación del grado es obligatorio !"),

    rut_titular: Yup.string()
      .trim()
      .min(7, "El rut debe tener un minimo de 7 caracteres !")
      .max(9, "El rut no debe tener más de 9 caracteres !")
      .required("Rut de apoderado(a) titular requerido !"),

    dv_rut_titular: Yup.string()
      .trim()
      .max(1, "Solo se admite un caracter !")
      .matches(
        /^[0-9kK]*$/,
        "Solo de admite un digito numérico o la letra k/K !"
      ),

    nombres_titular: Yup.string()
      .optional()
      .trim()
      .notOneOf(
        ["Sin registro de apoderado(a) !"],
        "El rut no se encuentra ingresado"
      ),

    rut_suplente: Yup.string()
      .optional()
      .trim()
      .min(7, "El rut debe tener un minimo de 7 caracteres !")
      .max(9, "El rut no debe tener más de 9 caracteres !"),

    dv_rut_suplente: Yup.string()
      .optional()
      .trim()
      .max(1, "Solo se admite un caracter !")
      .matches(
        /^[0-9kK]*$/,
        "Solo de admite un digito numérico o la letra k/K !"
      ),

    nombres_suplente: Yup.string()
      .optional()
      .trim()
      .notOneOf(
        ["Sin registro de apoderado(a) !"],
        "El rut no se encuentra ingresado"
      ),
  });
};

export default validationMatricula;
