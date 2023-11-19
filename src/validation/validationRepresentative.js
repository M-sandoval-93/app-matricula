import * as Yup from "yup";

const validationRepresentative = () => {
  return Yup.object().shape({
    rut_apoderado: Yup.string()
      .trim()
      .min(7, "El rut debe tener un minimo de 7 caracteres !")
      .max(9, "El rut no debe tener más de 9 caracteres !")
      .required("Campo requerido !"),

    dv_rut_apoderado: Yup.string()
      .trim()
      .max(1, "Solo se admite un caracter !")
      .matches(
        /^[0-9kK]*$/,
        "Solo de admite un digito numérico o la letra k/K !"
      )
      .required("Campo requerido !"),

    nombres_apoderado: Yup.string().trim().required("Campo requerido !"),

    apellido_paterno: Yup.string().trim().required("Campo requerido !"),

    apellido_materno: Yup.string().trim().required("Campo requerido !"),

    telefono: Yup.string()
      .optional()
      .trim()
      .min(8, "Mínimo de 8 digitos !")
      .max(8, "Máximo de 8 digitos !")
      .matches(/^[0-9]*$/, "Solo de admiten digitos numéricos !"),

    direccion: Yup.string().optional().trim(),
  });
};

export default validationRepresentative;
