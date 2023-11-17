import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { initialValuesRepresentative } from "../../utils/initialValues";
import useSubmitRepresentative from "../../hooks/useSubmitRepresentative";
import FooterForm from "../formComponents/FooterForm";
import { calculateCheckDigit } from "../../utils/funciones";
import ErrorMessageInput from "../formComponents/ErrorMessageInput";

const FormRepresentative = ({
  updateModalMatricula,
  rut,
  editSubForm,
  stateModalRepresentative,
}) => {
  const [error, setError] = useState(null);
  const formikRepresentativeRef = useRef();
  const initialValues = initialValuesRepresentative();
  const { onSubmit } = useSubmitRepresentative({
    setError,
    updateModalMatricula,
  });

  useEffect(() => {}, [rut, stateModalRepresentative]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      // validation cheme
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
                    onChange={handleChange}
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
                    value={calculateCheckDigit(values.rut_apoderado)}
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

            <section className="relative flex flex-col md:flex-row w-full gap-4">
              datos personales
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
        </form>
      )}
    </Formik>
  );
};

export default FormRepresentative;
