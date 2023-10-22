import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddIcon from "@mui/icons-material/Add";

import { Formik } from "formik";
import * as Yup from "yup";
import {
  handleCustomRut,
  numberFormat,
  removeSpaces,
  stringFormat,
} from "../../utils/funciones";
import { useEffect, useState } from "react";
import ErrorHandler from "../../components/ErrorHandler";
import axios from "../../api/axios";
import apiGet from "../../api/apiGet";
import useMatricula from "../../hooks/useMatricula";
import Swal from "sweetalert2";

const FormMatricula = ({ onClose, edit = true }) => {
  const [error, setError] = useState(null);
  const { getDataMatricula, getCountMatricula } = useMatricula();

  const [id, setId] = useState({
    idEstudiante: "",
    idTitular: "",
    idSuplente: "",
  });

  const validationSchema = Yup.object().shape({
    n_matricula: Yup.string().trim().optional(),

    n_lista: Yup.string().trim().optional(),

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

    nombres_estudiante: Yup.string().optional().trim(),
    // .required("El nombre del estudiante es requerido !"),

    grado: Yup.string()
      .max(1, "Solo se admite un dígito")
      .required("La asignación del grado es obligatorio !"),

    curso: Yup.string().optional().max(2, "Solo de admiten 2 caracteres !"),
    // .notOneOf([""], "Selecciona un curso válido !")

    rut_titular: Yup.string()
      .optional()
      .trim()
      .min(7, "El rut debe tener un minimo de 7 caracteres !")
      .max(9, "El rut no debe tener más de 9 caracteres !"),

    dv_rut_titular: Yup.string()
      .optional()
      .trim()
      .max(1, "Solo se admite un caracter !")
      .matches(
        /^[0-9kK]*$/,
        "Solo de admite un digito numérico o la letra k/K !"
      ),

    nombres_titular: Yup.string().optional().trim(),
    // .required("El nombre del apoderado titular es requerido !"),

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

    nombres_suplente: Yup.string().optional().trim(),
    // .required("El nombre del apoderado suplente es requerido !"),
  });

  const initialValues = {
    n_matricula: "",
    n_lista: "",
    fecha_matricula: "",
    rut_estudiante: "",
    dv_rut_estudiante: "",
    nombres_estudiante: "",
    grado: "",
    curso: "",
    rut_titular: "",
    dv_rut_titular: "",
    nombres_titular: "",
    rut_suplente: "",
    dv_rut_suplente: "",
    nombres_suplente: "",
  };

  // const [initialFormValues, setInitialFormValues] = useState(initialValues);

  // const resetForm = () => {
  //   setInitialFormValues(initialValues);
  // };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    const dataSet = {
      id_estudiante: id.idEstudiante,
      id_titular: id.idTitular,
      id_suplente: id.idSuplente,
      grado: parseInt(values.grado.trim()),
      n_lista: parseInt(values.n_lista.trim()),
      fecha_matricula: values.fecha_matricula,
      curso: parseInt(values.curso.trim()),
      anio_lectivo: 2024,
    };
    const URL = "/matricula/setMatricula";
    const token = sessionStorage.getItem("authToken") ?? null;

    try {
      const response = await axios.post(URL, dataSet, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // actualización de los datos de matrícula
        apiGet({ route: "matricula/getAll" })
          .then((response) => {
            getDataMatricula(response.data);
          })
          .catch((error) => console.log(error));

        // actualización de las cantidades de altas y bajas
        apiGet({ route: "matricula/getCount" })
          .then((response) => {
            getCountMatricula(response.data);
          })
          .catch((error) => console.log(error));

        const nMatricula = response?.data?.numero_matricual;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Número de matrícua asigada: ${nMatricula}`,
        }).then(() => onClose());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        errors,
        touched,
        handleBlur,
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} className="relative flex flex-col h-full">
          <section className="relative flex flex-col flex-grow overflow-hidden overflow-y-auto mb-2 p-2 gap-4">
            <article className="flex flex-col md:flex-row gap-4 items-center flex-wrap">
              {/* numero matricula */}
              <div className="relative flex flex-col gap-2">
                <label htmlFor="n_matricula">Registro de matrícula nº</label>
                <input
                  type="text"
                  name="n_matricula"
                  id="n_matricula"
                  autoComplete="off"
                  disabled={edit}
                  value={values.n_matricula}
                  onChange={(val) => handleChange(numberFormat(val))}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 text-center w-36 bg-gray-200`}
                />

                <span>
                  {touched.n_lista && errors.n_lista && errors.n_lista}
                </span>
              </div>

              {/* numero de lista */}
              <div className="relative flex flex-col gap-2">
                <label htmlFor="n_lista">Nº lista</label>
                <input
                  type="text"
                  name="n_lista"
                  id="n_lista"
                  autoComplete="off"
                  disabled
                  value={values.n_lista}
                  onChange={(val) => handleChange(numberFormat(val))}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 text-center w-36 bg-gray-200`}
                />

                <span>
                  {touched.n_matricula &&
                    errors.n_matricula &&
                    errors.n_matricula}
                </span>
              </div>

              {/* fecha de matricula */}
              <div className="relative flex flex-col gap-2">
                <label htmlFor="fecha_matricula">Fecha Matricula</label>
                <input
                  type="date"
                  name="fecha_matricula"
                  id="fecha_matricula"
                  autoComplete="off"
                  value={values.fecha_matricula}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 text-center w-48`}
                />

                <span>
                  {touched.fecha_matricula &&
                    errors.fecha_matricula &&
                    errors.fecha_matricula}
                </span>
              </div>
            </article>

            <article className="flex flex-col md:flex-row gap-3 items-center flex-wrap">
              {/* rut estudiante */}
              <div className="relative flex flex-col">
                <label htmlFor="rut_estudiante">Rut estudiante</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="rut_estudiante"
                    id="rut_estudiante"
                    autoComplete="off"
                    value={values.rut_estudiante}
                    onChange={(val) =>
                      handleChange(
                        handleCustomRut({
                          val: val,
                          setFieldValue: setFieldValue,
                          inputDv: "dv_rut_estudiante",
                          inputNombre: "nombres_estudiante",
                          setError: setError,
                          route: "student/getName",
                          setId: setId,
                          property: "idEstudiante",
                        })
                      )
                    }
                    onBlur={handleBlur}
                    className={`border outline-none rounded-md p-2 text-center w-48`}
                  />

                  <span> - </span>

                  <input
                    type="text"
                    name="dv_rut_estudiante"
                    id="dv_rut_estudiante"
                    disabled
                    value={values.dv_rut_estudiante}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border outline-none rounded-md p-2 text-center w-12 bg-gray-200`}
                  />

                  <button
                    className={`flex items-center justify-center p-1 mx-3 rounded-full bg-green-500 text-white transition-all duration-300
                  ${
                    values.nombres_estudiante !== "estudiante no registrado"
                      ? "invisible scale-x-105 opacity-0 "
                      : "visible scale-100 opacity-100"
                  } `}
                  >
                    <AddIcon sx={{ fontSize: 22 }} />
                  </button>
                  <span
                    className={`transition-all duration-300
                  ${
                    values.nombres_estudiante !== "estudiante no registrado"
                      ? "-ml-12"
                      : "ml-0"
                  }`}
                  >
                    <p>
                      {touched.rut_estudiante && errors.rut_estudiante
                        ? errors.rut_estudiante
                        : "Rut sin puntos, sin guión y sin digito verificador"}
                    </p>
                    <p>
                      {touched.dv_rut_estudiante &&
                        errors.dv_rut_estudiante &&
                        errors.dv_rut_estudiante}
                    </p>
                  </span>
                </div>
              </div>

              <div className="relative flex flex-col"></div>
            </article>

            <article className="flex flex-col md:flex-row gap-3 items-center flex-wrap">
              {/* Nombres estudiante */}
              <div className="relative flex flex-col w-8/12">
                <label htmlFor="nombres_estudiante">
                  Nombre completo estudiante
                </label>
                <input
                  type="text"
                  name="nombres_estudiante"
                  id="nombres_estudiante"
                  autoComplete="off"
                  disabled
                  value={values.nombres_estudiante}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 w-full bg-gray-200`}
                />
                {/* <span>
                  {touched.nombres_estudiante &&
                    errors.nombres_estudiante &&
                    errors.nombres_estudiante}
                </span> */}
              </div>

              {/* grado del curso */}
              <div className="relative flex flex-col w-1/12">
                <label htmlFor="grado">Grado</label>
                <select
                  name="grado"
                  id="grado"
                  value={values.grado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 text-center w-full bg-white`}
                >
                  <option value="" disabled>
                    --
                  </option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>

                {/* <span>{touched.grado && errors.grado && errors.grado}</span> */}
              </div>

              {/* Letra del curso */}
              <div className="relative flex flex-col w-2/12">
                <label htmlFor="curso">curso</label>
                <select
                  name="curso"
                  id="curso"
                  value={values.curso}
                  onChange={handleChange}
                  disabled
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 text-center w-full bg-gray-200`}
                >
                  <option value="" disabled>
                    ---
                  </option>
                  <option value="1">A</option>
                  <option value="2">B</option>
                  <option value="3">C</option>
                  <option value="4">D</option>
                </select>
              </div>
            </article>

            <article className="flex flex-col md:flex-row gap-4 items-center">
              {/* rut titular */}
              <div className="relative flex flex-col">
                <label htmlFor="rut_titular">Rut titular</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="rut_titular"
                    id="rut_titular"
                    autoComplete="off"
                    value={values.rut_titular}
                    onChange={(val) =>
                      handleChange(
                        handleCustomRut({
                          val: val,
                          setFieldValue: setFieldValue,
                          inputDv: "dv_rut_titular",
                          inputNombre: "nombres_titular",
                          setError: setError,
                          route: "representative/getName",
                          setId: setId,
                          property: "idTitular",
                        })
                      )
                    }
                    onBlur={handleBlur}
                    className={`border outline-none rounded-md p-2 text-center w-48`}
                  />

                  <span> - </span>

                  <input
                    type="text"
                    name="dv_rut_titular"
                    id="dv_rut_titular"
                    autoComplete="off"
                    disabled
                    value={values.dv_rut_titular}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border outline-none rounded-md p-2 text-center w-12 bg-gray-200`}
                  />

                  <button>
                    <AddIcon sx={{ fontSize: 22 }} />
                  </button>

                  <span className={``}>
                    <p>
                      {touched.rut_titular && errors.rut_titular
                        ? errors.rut_titular
                        : "Rut sin puntos, sin guión y sin digito verificador"}
                    </p>
                    <p>
                      {touched.dv_rut_titular &&
                        errors.dv_rut_titular &&
                        errors.dv_rut_titular}
                    </p>
                  </span>
                </div>
              </div>

              {/* Nombres titular */}
              <div className="relative flex flex-col">
                <label htmlFor="nombres_titular">
                  Nombre apoderado titular
                </label>
                <input
                  type="text"
                  name="nombres_titular"
                  id="nombres_titular"
                  autoComplete="off"
                  disabled
                  value={values.nombres_titular}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border`}
                />
                <span>
                  {touched.nombres_titular &&
                    errors.nombres_titular &&
                    errors.nombres_titular}
                </span>
              </div>
            </article>

            <article className="flex flex-col md:flex-row gap-4 items-center">
              {/* rut suplente */}
              <div className="relative flex flex-col">
                <label htmlFor="rut_suplente">Rut suplente</label>
                <input
                  type="text"
                  name="rut_suplente"
                  id="rut_suplente"
                  autoComplete="off"
                  value={values.rut_suplente}
                  onChange={(val) =>
                    handleChange(
                      handleCustomRut({
                        val: val,
                        setFieldValue: setFieldValue,
                        inputDv: "dv_rut_suplente",
                        inputNombre: "nombres_suplente",
                        setError: setError,
                        route: "representative/getName",
                        setId: setId,
                        property: "idSuplente",
                      })
                    )
                  }
                  onBlur={handleBlur}
                  className={`border`}
                />

                <span> - </span>

                <input
                  type="text"
                  name="dv_rut_suplente"
                  id="dv_rut_suplente"
                  autoComplete="off"
                  disabled
                  value={values.dv_rut_suplente}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border`}
                />

                <button>
                  <AddIcon sx={{ fontSize: 22 }} />
                </button>

                <span className={``}>
                  <p>
                    {touched.rut_suplente && errors.rut_suplente
                      ? errors.rut_suplente
                      : "Rut sin puntos, sin guión y sin digito verificador"}
                  </p>
                  <p>
                    {touched.dv_rut_suplente &&
                      errors.dv_rut_suplente &&
                      errors.dv_rut_suplente}
                  </p>
                </span>
              </div>

              {/* Nombres titular */}
              <div className="relative flex flex-col">
                <label htmlFor="nombres_suplente">
                  Nombre apoderado titular
                </label>
                <input
                  type="text"
                  name="nombres_suplente"
                  id="nombres_suplente"
                  autoComplete="off"
                  disabled
                  value={values.nombres_suplente}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border`}
                />
                <span>
                  {touched.nombres_suplente &&
                    errors.nombres_suplente &&
                    errors.nombres_suplente}
                </span>
              </div>
            </article>
          </section>

          <footer className="relative flex items-center justify-end gap-4 py-2 border-t-[1px]">
            <button
              className="bg-red-500 text-white p-3 rounded-md outline-none
              hover:opacity-90 hover:shadow-sm hover:shadow-gray-600 active:scale-105"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              className="bg-green-500 text-white p-3 rounded-md outline-none
              hover:opacity-90 hover:shadow-sm hover:shadow-gray-600 active:scale-105"
              type="submit"
              disabled={isSubmitting}
            >
              Register
            </button>
          </footer>
          <ErrorHandler error={error} />
        </form>
      )}
    </Formik>
  );
};

export default FormMatricula;
