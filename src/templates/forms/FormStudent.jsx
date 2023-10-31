import { useEffect, useRef, useState } from "react";
import { initialValuesStudent } from "../../utils/initialValues";
import { Formik } from "formik";
import {
  calculateCheckDigit,
  getStudent,
  stringFormat,
} from "../../utils/funciones";
import FooterForm from "../formComponents/FooterForm";

const FormStudent = ({ setFormMatricula, open, rut, setEditSubForm }) => {
  const [error, setError] = useState(null);
  const formikStudentRef = useRef();
  const initialValues = initialValuesStudent();

  const onSubmit = ({ values }) => {
    console.log(values);
  };

  // pasar los valores de la consulta del estudiante hacia la api
  // para condicion para cuando tengo que editarlo desde matricula
  useEffect(() => {
    if (rut) {
      getStudent(rut, "student/getStudent").then((response) => {
        // console.log(response);
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
  }, [rut]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
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
          <main className="relative w-full flex-grow overflow-hidden overflow-y-auto p-2 gap-y-4">
            <section className="relative flex">
              <article className="relative flex flex-col">
                <label htmlFor="rut_estudiante">Rut estudiante</label>
                <div className="relative flex gap-2">
                  <input
                    type="text"
                    name="rut_estudiante"
                    id="rut_estudiante"
                    autoComplete="off"
                    disabled
                    value={values.rut_estudiante}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border rounded-md`}
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
                    className={`border rounded-md`}
                  />
                </div>
              </article>
            </section>

            <section className="relative flex">
              <article className="relative flex flex-col">
                <label htmlFor="nombres_estudiante">Nombres estudiante</label>
                <input
                  type="text"
                  name="nombres_estudiante"
                  id="nombres_estudiante"
                  autoComplete="off"
                  value={values.nombres_estudiante}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border rounded-md`}
                />
              </article>

              <article className="relative flex flex-col">
                <label htmlFor="apellido_paterno">Apellido paterno</label>
                <input
                  type="text"
                  name="apellido_paterno"
                  id="apellido_paterno"
                  autoComplete="off"
                  value={values.apellido_paterno}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border rounded-md`}
                />
              </article>

              <article>
                <label htmlFor="apellido_materno">Apellido materno</label>
                <input
                  type="text"
                  name="apellido_materno"
                  id="apellido_materno"
                  autoComplete="off"
                  value={values.apellido_materno}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border rounded-md`}
                />
              </article>
            </section>

            <section className="relative flex">
              <article className="relative flex flex-col">
                <label htmlFor="nombre_social">Nombre social</label>
                <input
                  type="text"
                  name="nombre-social"
                  id="nombre_social"
                  autoComplete="off"
                  value={values.nombre_social}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border rounded-md`}
                />
              </article>

              <article className="relative flex flex-col">
                <label htmlFor="genero">Género</label>
                <select
                  name="genero"
                  id="genero"
                  value={values.sexo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled>
                    ------
                  </option>
                  <option value="M">MASCULINO</option>
                  <option value="F">FEMENINO</option>
                </select>
              </article>

              <article className="relative flex flex-col">
                <label htmlFor="fecha_nacimiento">Fecha nacimiento</label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  id="fecha_nacimiento"
                  autoComplete="off"
                  value={values.fecha_nacimiento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border rounded-md`}
                />
              </article>
            </section>
          </main>

          <FooterForm onClose={setFormMatricula} isSubmitting={isSubmitting} />
        </form>
      )}
    </Formik>
  );
};

export default FormStudent;
