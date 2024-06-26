import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Formik } from "formik";
import { numberFormat } from "../../utils/funciones";
import { useCallback, useEffect, useRef, useState } from "react";
import ErrorHandler from "../../components/ErrorHandler";
import RutName from "../formComponents/RutName";
import FooterForm from "../formComponents/FooterForm";
import useSubmitMatricula from "../../hooks/useSubmitMatricula";
import ErrorMessageInput from "../formComponents/ErrorMessageInput";
import validationMatricula from "../../validation/validationMatricula";
import { initialValuesMatricula } from "../../utils/initialValues";
import apiGet from "../../api/apiGet";

const FormMatricula = ({
  stateModal,
  newMatricula,
  idMatricula,
  onCloseModal,
  updateModalMatricula,
  stateFormMatricula,
}) => {
  const [error, setError] = useState(null); // estado para el manejo de errores

  // estado para el manejo de los id
  const [id, setId] = useState({
    idEstudiante: null,
    idTitular: null,
    idSuplente: null,
  });

  const updateId = useCallback((newId) => {
    setId((prevId) => ({ ...prevId, ...newId }));
  }, []);

  const formikMatriculaRef = useRef(); // referencia del formulario
  const { onSubmit } = useSubmitMatricula({
    setError,
    id,
    idMatricula,
    onCloseModal,
    formikMatriculaRef,
    updateId,
  }); //obtencion del evento submit del formulario
  const initialValues = initialValuesMatricula(); // obtencion de los valores iniciales del formulario
  const validationSchema = validationMatricula(); // obtencion de las validaciones del formulario

  // useEffect(() => {
  //   // setear los id`s del estado general
  //   updateId({
  //     idEstudiante: null,
  //     idTitular: null,
  //     idSuplente: null,
  //   });
  // }, [stateModal]);

  // Efecto para limpiar formulario de matricula y asignar valores
  useEffect(() => {
    // setear los id`s del estado general
    updateId({
      idEstudiante: null,
      idTitular: null,
      idSuplente: null,
    });

    // setear formulario y sus campos
    if (!stateModal) {
      const handleReset = formikMatriculaRef.current.handleReset;
      setTimeout(() => {
        handleReset();
      }, 100);
    }

    // consumo de api para matricula según id
    if (!newMatricula) {
      apiGet({ route: "matricula/getMatricula", param: idMatricula })
        .then((response) => {
          const data = response?.data;
          formikMatriculaRef.current.setValues({
            ...initialValues,
            n_matricula: data.numero_matricula,
            fecha_matricula: data.fecha_matricula,
            grado: data.grado.toString(),
            rut_estudiante: data.rut_estudiante,
            dv_rut_estudiante: data.dv_rut_estudiante,
            nombres_estudiante: data.nombres_estudiante,
            rut_titular: data.rut_titular ? data.rut_titular : "",
            dv_rut_titular: data.dv_rut_titular ? data.dv_rut_titular : "",
            nombres_titular: data.nombres_titular
              ? data.nombres_titular
              : "Asignar apoderado(a) titular !",
            rut_suplente: data.rut_suplente ? data.rut_suplente : "",
            dv_rut_suplente: data.dv_rut_suplente ? data.dv_rut_suplente : "",
            nombres_suplente: data.nombres_suplente
              ? data.nombres_suplente
              : "Asignar apoderado(a) suplente !",
          });

          updateId({
            idEstudiante: data.id_estudiante,
            idTitular: data.id_apoderado_titular,
            idSuplente: data.id_apoderado_suplente,
          });
        })
        .catch((error) => setError(error));
    }
    // }, [stateModal, stateFormMatricula]); // proboca que al abrir otro modal student/representative, se borren los id
  }, [stateModal]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      innerRef={formikMatriculaRef}
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
          <main className="relative flex flex-col flex-grow overflow-hidden overflow-y-auto p-2 gap-y-4">
            <section className="relative flex flex-col xs:flex-row gap-2 w-full flex-wrap">
              {/* numero matricula */}
              <article className="relative flex flex-col gap-y-2 xs:w-32">
                <label
                  htmlFor="n_matricula"
                  className="text-blue-600 font-semibold"
                >
                  Nº Matrícula
                </label>
                <input
                  type="text"
                  name="n_matricula"
                  id="n_matricula"
                  autoComplete="off"
                  disabled
                  value={values.n_matricula}
                  onChange={(val) => handleChange(numberFormat(val))}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 text-center w-full bg-gray-200`}
                />
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"n_matricula"}
                />
              </article>

              {/* grado del curso */}
              <article className="relative flex flex-col gap-y-2 grow">
                <label className="text-blue-600 font-semibold" htmlFor="grado">
                  Grado
                </label>
                <select
                  name="grado"
                  id="grado"
                  value={values.grado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`relative border outline-none rounded-md p-2 text-start w-full
                  xs:min-w-[8rem] xs:max-w-[8rem] appearance-none hover:cursor-pointer bg-transparent
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
                <span className="absolute right-2 xs:left-24 top-[2.6rem] pointer-events-none">
                  <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
                </span>
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"grado"}
                />
              </article>

              {/* fecha de matricula */}
              <article className="relative flex flex-col gap-y-2 xs:w-48">
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
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"fecha_matricula"}
                />
              </article>
            </section>

            {/* estudiante */}
            <RutName
              labelRut={"Rut estudiante"}
              labelName={"Nombres estudiantes"}
              grade={"grado"}
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
              // setId={setId}
              updateId={updateId}
              property={"idEstudiante"}
              type={"estudiante"}
              updateModalMatricula={updateModalMatricula}
            />

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
              // setId={setId}
              updateId={updateId}
              property={"idTitular"}
              type={"apoderado(a)"}
              updateModalMatricula={updateModalMatricula}
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
              // setId={setId}
              updateId={updateId}
              property={"idSuplente"}
              type={"apoderado(a)"}
              updateModalMatricula={updateModalMatricula}
            />

            {/* linea divisoria */}
            <span className="w-full bg-gray-300 p-[1px] mt-2"></span>
          </main>

          <FooterForm onCloseModal={onCloseModal} isSubmitting={isSubmitting} />
          <ErrorHandler error={error} />
        </form>
      )}
    </Formik>
  );
};

export default FormMatricula;
