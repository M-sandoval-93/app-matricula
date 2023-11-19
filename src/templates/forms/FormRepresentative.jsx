import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { initialValuesRepresentative } from "../../utils/initialValues";
import useSubmitRepresentative from "../../hooks/useSubmitRepresentative";
import FooterForm from "../formComponents/FooterForm";
import {
  calculateCheckDigit,
  getPerson,
  numberFormat,
  stringFormat,
} from "../../utils/funciones";
import ErrorMessageInput from "../formComponents/ErrorMessageInput";
import ErrorHandler from "../../components/ErrorHandler";
import validationRepresentative from "../../validation/validationRepresentative";

const FormRepresentative = ({
  updateModalMatricula,
  rut,
  editSubForm,
  stateModalRepresentative,
}) => {
  const [error, setError] = useState(null);
  const formikRepresentativeRef = useRef();
  const initialValues = initialValuesRepresentative({ rut });
  const validationSchema = validationRepresentative();
  const { onSubmit } = useSubmitRepresentative({
    setError,
    updateModalMatricula,
  });

  useEffect(() => {
    if (!stateModalRepresentative) {
      const handleResetFormRepresentative =
        formikRepresentativeRef.current.handleReset;
      setTimeout(() => {
        handleResetFormRepresentative();
      }, 100);
    }

    if (rut && !editSubForm) {
      getPerson(rut, "representative/getRepresentative")
        .then((response) => {
          // para edición de datos, se cargan los datos
          formikRepresentativeRef.current.setValues({
            ...initialValues,
            id_apoderado: response?.data?.id,
            rut_apoderado: rut,
            dv_rut_apoderado: calculateCheckDigit(rut),
            nombres_apoderado: response?.data?.nombres,
            apellido_paterno: response?.data?.paterno,
            apellido_materno: response?.data?.materno,
            telefono: response?.data?.telefono ? response?.data?.telefono : "",
            direccion: response?.data?.direccion
              ? response?.data?.direccion
              : "",
          });
        })
        .catch((error) => setError(error));
    } else {
      // para nuevos ingresos, solo se pasa el rut
      formikRepresentativeRef.current.setValues({
        ...initialValues,
        rut_apoderado: rut,
        dv_rut_apoderado: calculateCheckDigit(rut),
      });
    }
  }, [stateModalRepresentative]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      innerRef={formikRepresentativeRef}
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
        <form onSubmit={handleSubmit} className={`relative  flex-col h-full`}>
          <main className="relative flex flex-col flex-grow overflow-hidden overflow-y-auto p-2 gap-y-4 h-[26.5rem]">
            <section className="relative flex w-full">
              <article className="relative flex flex-col gap-y-2 w-full ">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="rut_apoderado"
                >
                  Rut apoderado
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="rut_apoderado"
                    id="rut_apoderado"
                    autoComplete="off"
                    disabled={editSubForm}
                    value={values.rut_apoderado}
                    onChange={(val) => {
                      handleChange(numberFormat(val));
                      setFieldValue(
                        "dv_rut_apoderado",
                        calculateCheckDigit(val.target.value)
                      );
                    }}
                    onBlur={handleBlur}
                    className={`border outline-none rounded-md p-2 text-center w-full xs:w-36`}
                  />

                  <span className="textlg font-bold"> - </span>

                  <input
                    type="text"
                    name="dv_rut_apoderado"
                    id="dv_rut_apoderado"
                    autoComplete="off"
                    disabled
                    // value={calculateCheckDigit(values.rut_apoderado)}
                    value={values.dv_rut_apoderado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border outline-none rounded-md p-2 text-center w-16 xs:w-12 bg-gray-200`}
                  />
                </div>
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"rut_apoderado"}
                />
              </article>
            </section>

            {/* linea divisoria */}
            <span className="w-full bg-gray-300 p-[1px] my-2"></span>

            <section className="relative flex flex-col md:flex-row w-full gap-4">
              <article className="relative flex flex-col gap-y-2 md:w-5/12">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="nombres_apoderado"
                >
                  Nombres apoderado
                </label>
                <input
                  type="text"
                  name="nombres_apoderado"
                  id="nombres_apoderado"
                  autoComplete="off"
                  value={values.nombres_apoderado}
                  onChange={(val) => handleChange(stringFormat(val))}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 w-full`}
                />
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"nombres_apoderado"}
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

            <section className="relative flex flex-col md:flex-row gap-4">
              <article className="relative flex flex-col gap-y-2 w-full md:w-64">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="telefono"
                >
                  Teléfono apoderado
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    autoComplete="off"
                    disabled
                    value={"+ 569"}
                    className={`border outline-none rounded-md p-2 text-center w-full xs:w-20 bg-gray-200`}
                  />

                  <span className="textlg font-bold"> - </span>

                  <input
                    type="text"
                    name="telefono"
                    id="telefono"
                    autoComplete="off"
                    value={values.telefono}
                    onChange={(val) => handleChange(numberFormat(val))}
                    onBlur={handleBlur}
                    className={`border outline-none rounded-md p-2 text-center w-16 xs:w-36`}
                  />
                </div>
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"telefono"}
                />
              </article>

              <article className="relative flex flex-col gap-y-2 w-full md:grow">
                <label
                  className="text-blue-600 font-semibold"
                  htmlFor="direccion"
                >
                  Dirección apoderado
                </label>
                <input
                  type="text"
                  name="direccion"
                  id="direccion"
                  autoComplete="off"
                  value={values.direccion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border outline-none rounded-md p-2 w-full`}
                />
                <ErrorMessageInput
                  touched={touched}
                  errors={errors}
                  value={"direccion"}
                />
              </article>
            </section>
          </main>

          <FooterForm
            isSubmitting={isSubmitting}
            onCloseModal={() =>
              updateModalMatricula({
                rut: "",
                formMatricula: true,
                formRepresentative: false,
              })
            }
          />
          <ErrorHandler error={error} />
        </form>
      )}
    </Formik>
  );
};

export default FormRepresentative;
