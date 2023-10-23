import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { Formik } from "formik";
import * as Yup from "yup";
import { numberFormat } from "../../utils/funciones";
import { useState } from "react";
import ErrorHandler from "../../components/ErrorHandler";
import axios from "../../api/axios";
import apiGet from "../../api/apiGet";
import useMatricula from "../../hooks/useMatricula";
import Swal from "sweetalert2";
import RutName from "../formComponents/RutName";

const FormMatricula = ({ onClose, edit = true }) => {
  const [error, setError] = useState(null);
  const { getDataMatricula, getCountMatricula } = useMatricula();
  const [id, setId] = useState({
    idEstudiante: "",
    idTitular: "",
    idSuplente: "",
  });

  const initialValues = {
    n_matricula: "",
    fecha_matricula: "",
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

  const validationSchema = Yup.object().shape({
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

    nombres_estudiante: Yup.string().optional().trim(),

    grado: Yup.string()
      .max(1, "Solo se admite un dígito")
      .notOneOf([""], "Seleccione un grado válido !")
      .required("La asignación del grado es obligatorio !"),

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
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    const dataSet = {
      id_estudiante: id.idEstudiante,
      id_titular: id.idTitular,
      id_suplente: id.idSuplente,
      grado: parseInt(values.grado.trim()),
      fecha_matricula: values.fecha_matricula,
      anio_lectivo: 2024, // asignación manual, asignar a una variable global en configuracion
    };

    console.log(dataSet);

    // const URL = "/matricula/setMatricula";
    // const token = sessionStorage.getItem("authToken") ?? null;

    // try {
    //   const response = await axios.post(URL, dataSet, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.status === 200) {
    //     // actualización de los datos de matrícula
    //     apiGet({ route: "matricula/getAll" })
    //       .then((response) => {
    //         getDataMatricula(response.data);
    //       })
    //       .catch((error) => console.log(error));

    //     // actualización de las cantidades de altas y bajas
    //     apiGet({ route: "matricula/getCount" })
    //       .then((response) => {
    //         getCountMatricula(response.data);
    //       })
    //       .catch((error) => console.log(error));

    //     const nMatricula = response?.data?.numero_matricual;
    //     Swal.fire({
    //       icon: "success",
    //       title: "Success",
    //       text: `Número de matrícua asigada: ${nMatricula}`,
    //     }).then(() => onClose());
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setSubmitting(false);
    // }
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
          <section className="relative flex flex-col flex-grow overflow-hidden overflow-y-auto mb-2 p-2 gap-y-4">
            <article className="flex flex-col xs:flex-row gap-2 w-full flex-wrap">
              {/* numero matricula */}
              <div className="relative flex flex-col gap-y-2 xs:w-32">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="n_matricula"
                >
                  Nº Matrícula
                </label>
                <input
                  type="text"
                  name="n_matricula"
                  id="n_matricula"
                  autoComplete="off"
                  disabled={edit}
                  value={values.n_matricula}
                  onChange={(val) => handleChange(numberFormat(val))}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 text-center w-full bg-gray-200`}
                />
              </div>

              {/* grado del curso */}
              <div className="relative flex flex-col gap-y-2 grow">
                <label className="text-blue-600 font-semibold" htmlFor="grado">
                  Grado
                </label>
                <select
                  name="grado"
                  id="grado"
                  value={values.grado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-[.62rem] text-center w-full 
                  xs:min-w-[8rem] xs:max-w-[8rem] bg-transparent
                  ${touched.grado && errors.grado && "border-red-500"}
                  ${touched.grado && !errors.grado && "border-green-500"}`}
                >
                  <option value="" disabled>
                    ----
                  </option>
                  <option value="7">7º básico</option>
                  <option value="8">8º básico</option>
                  <option value="1">1º medio</option>
                  <option value="2">2º medio</option>
                  <option value="3">3º medio</option>
                  <option value="4">4º medio</option>
                </select>
              </div>

              {/* fecha de matricula */}
              <div className="relative flex flex-col gap-y-2 xs:w-48">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="fecha_matricula"
                >
                  Fecha Matricula
                </label>
                <input
                  type="date"
                  name="fecha_matricula"
                  id="fecha_matricula"
                  autoComplete="off"
                  value={values.fecha_matricula}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 text-center w-full bg-transparent
                  ${
                    touched.fecha_matricula &&
                    errors.fecha_matricula &&
                    "border-red-500"
                  }
                  ${
                    touched.fecha_matricula &&
                    !errors.fecha_matricula &&
                    "border-green-500"
                  }`}
                />
              </div>
            </article>
            {/* estudiante */}
            <RutName
              labelRut={"Rut estudiante"}
              labelName={"Nombres estudiantes"}
              rut={"rut_estudiante"}
              dvRut={"dv_rut_estudiante"}
              name={"nombres_estudiante"}
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              setError={setError}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              setId={setId}
              route={"student/getName"}
              property={"idEstudiante"}
              type={"estudiante"}
            />

            {/* estudiante */}
            {/* <article className="relative flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex flex-col gap-y-2 w-full md:w-64">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="rut_estudiante"
                >
                  Rut estudiante
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="rut_estudiante"
                    id="rut_titular"
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
                    className={`border outline-none rounded-md p-2 text-center w-full xs:w-36 
                      ${
                        touched.rut_estudiante &&
                        errors.rut_estudiante &&
                        "border-red-500"
                      }
                      ${
                        touched.rut_estudiante &&
                        !errors.rut_estudiante &&
                        "border-green-500"
                      }
                    `}
                  />

                  <span className="textlg font-bold"> - </span>

                  <input
                    type="text"
                    name="dv_rut_estudiante"
                    id="dv_rut_estudiante"
                    autoComplete="off"
                    disabled
                    value={values.dv_rut_estudiante}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border outline-none rounded-md p-2 text-center w-12 bg-gray-200`}
                  />

                  <button
                    type="button"
                    className={`flex items-center justify-center p-1 rounded-full text-white transition-all duration-300
                    ${
                      values.nombres_estudiante === ""
                        ? "invisible scale-x-105 opacity-0"
                        : "visible scale-100 opacity-100"
                    } 
                    ${
                      values.nombres_estudiante !== "estudiante no registrado"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    {values.nombres_estudiante !== "" &&
                      values.nombres_estudiante !==
                        "estudiante no registrado" && (
                        <EditIcon
                          sx={{ fontSize: 22 }}
                          onClick={() => console.log("edita")}
                        />
                      )}

                    {(values.nombres_estudiante === "" ||
                      values.nombres_estudiante ===
                        "estudiante no registrado") && (
                      <AddIcon
                        sx={{ fontSize: 22 }}
                        onClick={() => console.log("nuevo")}
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="relative flex flex-col gap-y-2 w-full md:grow">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="nombres_estudiante"
                >
                  Nombres estudiante
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="nombres_estudiante"
                    id="nombres_estudiante"
                    autoComplete="off"
                    disabled
                    value={values.nombres_estudiante}
                    onChange={(val) => handleChange(stringFormat(val))}
                    onBlur={handleBlur}
                    className={`border outline-none rounded-md p-2 w-full bg-gray-200
                    transition-all duration-300`}
                  />
                </div>
              </div>
            </article> */}

            {/* linea divisoria */}
            <span className="w-full bg-gray-300 p-[1px] my-2"></span>

            {/* apoderado titular */}
            <RutName
              labelRut={"Rut titular"}
              labelName={"Nombres apoderado(a) titular"}
              rut={"rut_titular"}
              dvRut={"dv_rut_titular"}
              name={"nombres_titular"}
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              setError={setError}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              setId={setId}
              route={"representative/getName"}
              property={"idTitular"}
              type={"apoderado(a)"}
            />

            {/* apoderado suplente */}
            <RutName
              labelRut={"Rut suplente"}
              labelName={"Nombres apoderado(a) suplente"}
              rut={"rut_suplente"}
              dvRut={"dv_rut_suplente"}
              name={"nombres_suplente"}
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              setError={setError}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              setId={setId}
              route={"representative/getName"}
              property={"idSuplente"}
              type={"apoderado(a)"}
            />
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
