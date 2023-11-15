import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { initialValuesRepresentative } from "../../utils/initialValues";
import useSubmitRepresentative from "../../hooks/useSubmitRepresentative";

const FormRepresentative = ({ 
  updateModalMatricula, 
  rut, 
  editSubForm, 
  stateModalRepresentative 
}) => {
  const [error, setError] = useState(null);
  const formikRepresentativeRef = useRef();
  const initialValues = initialValuesRepresentative();
  const {onSubmit} = useSubmitRepresentative({setError, updateModalMatricula});

  useEffect(() => {

  }, [rut, stateModalRepresentative]);
  
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

        </form>
      )}
    </Formik>
  );
};

export default FormRepresentative;
