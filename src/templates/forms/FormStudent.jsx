import { useEffect, useRef, useState } from "react";
import { initialValuesStudent } from "../../utils/initialValues";
import { Formik } from "formik";
import {
  calculateCheckDigit,
  getStudent,
  stringFormat,
} from "../../utils/funciones";
import FooterForm from "../formComponents/FooterForm";
import validationStudent from "../../validation/validationStudent";
import useSubmitStudent from "../../hooks/useSubmitStudent";
import ErrorMessageInput from "../formComponents/ErrorMessageInput";

const FormStudent = ({
  updateModalMatricula,
  rut,
  editSubForm,
  stateModalStudent,
}) => {
  const [error, setError] = useState(null);
  const formikStudentRef = useRef();
  const initialValues = initialValuesStudent();
  const validationSchema = validationStudent();
  const { onSubmit } = useSubmitStudent({setError});


  // pasar los valores de la consulta del estudiante hacia la api
  // para condicion para cuando tengo que editarlo desde matricula
  useEffect(() => {
    if (rut) {
      getStudent(rut, "student/getStudent").then((response) => {
        formikStudentRef.current.setValues({
          ...initialValues,
          id_estudiante: response?.data?.id,
          rut_estudiante: rut,
          dv_rut_estudiante: calculateCheckDigit(rut),
          nombres_estudiante: response?.data?.nombres,
          apellido_paterno: response?.data?.paterno,
          apellido_materno: response?.data?.materno,
          nombre_social: response?.data?.nombre_social ?? "",
          sexo: response?.data?.sexo,
          fecha_nacimiento: response?.data?.fecha_nacimiento,
        });
      });
    }
  }, [rut, stateModalStudent]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      innerRef={formikStudentRef}
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
        <form onSubmit={handleSubmit} className={`relative flex-col h-full`}>
          <main className="relative flex flex-col flex-grow overflow-hidden overflow-y-auto p-2 gap-y-4 h-[26.5rem]">
            <section className="relative flex w-full">
              <article className="relative flex flex-col gap-y-2 w-full ">
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
                    id="rut_estudiante"
                    autoComplete="off"
                    disabled={editSubForm}
                    value={values.rut_estudiante}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border outline-none rounded-md p-2 text-center w-full xs:w-36`}
                  />

                  <span className="textlg font-bold"> - </span>

                  <input
                    type="text"
                    name="dv_rut_estudiante"
                    id="dv_rut_estudiante"
                    autoComplete="off"
                    disabled
                    // value={values.dv_rut_estudiante}
                    value={calculateCheckDigit(values.rut_estudiante)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border outline-none rounded-md p-2 text-center w-16 xs:w-12 bg-gray-200`}
                  />
                </div>
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"rut_estudiante"}
                />
              </article>
            </section>

            {/* linea divisoria */}
            <span className="w-full bg-gray-300 p-[1px] my-2"></span>

            <section className="relative flex flex-col md:flex-row w-full gap-4">
              <article className="relative flex flex-col gap-y-2 md:w-5/12">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="nombres_estudiante"
                >
                  Nombres estudiante
                </label>
                <input
                  type="text"
                  name="nombres_estudiante"
                  id="nombres_estudiante"
                  autoComplete="off"
                  value={values.nombres_estudiante}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 w-full`}
                />
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"nombres_estudiante"}
                />
              </article>

              <article className="relative flex flex-col gap-y-2 md:w-4/12">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="apellido_paterno"
                >
                  Apellido paterno
                </label>
                <input
                  type="text"
                  name="apellido_paterno"
                  id="apellido_paterno"
                  autoComplete="off"
                  value={values.apellido_paterno}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 w-full`}
                />
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"apellido_paterno"}
                />
              </article>

              <article className="relative flex flex-col gap-y-2 md:w-4/12">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="apellido_materno"
                >
                  Apellido materno
                </label>
                <input
                  type="text"
                  name="apellido_materno"
                  id="apellido_materno"
                  autoComplete="off"
                  value={values.apellido_materno}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 w-full`}
                />
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"apellido_materno"}
                />
              </article>
            </section>

            <section className="relative flex flex-col md:flex-row w-full gap-4">
              <article className="relative flex flex-col gap-y-2 md:w-5/12">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="nombre_social"
                >
                  Nombre social
                </label>
                <input
                  type="text"
                  name="nombre_social"
                  id="nombre_social"
                  autoComplete="off"
                  value={values.nombre_social}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 w-full`}
                />
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"nombre_social"}
                />
              </article>

              <article className="relative flex flex-col gap-y-2 md:w-4/12">
                <label className="text-blue-600 font-semibold" htmlFor="genero">
                  Género
                </label>
                <select
                  name="genero"
                  id="genero"
                  value={values.sexo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 w-full`}
                >
                  <option value="" disabled>
                    ------
                  </option>
                  <option value="M">MASCULINO</option>
                  <option value="F">FEMENINO</option>
                </select>
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"genero"}
                />
              </article>

              <article className="relative flex flex-col gap-y-2 md:w-4/12">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="fecha_nacimiento"
                >
                  Fecha nacimiento
                </label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  id="fecha_nacimiento"
                  autoComplete="off"
                  value={values.fecha_nacimiento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 w-full`}
                />
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"fecha_nacimiento"}
                />
              </article>
            </section>
          </main>

          <FooterForm 
            isSubmitting={isSubmitting} 
            onCloseModal={ () => {
              updateModalMatricula({
                rut: "",
                formMatricula: true,
                formStudent: false,
              });
            }} 
          />
        </form>
      )}
    </Formik>
  );
};

export default FormStudent;
