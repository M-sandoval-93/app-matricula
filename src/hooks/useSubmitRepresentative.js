import apiGet from "../api/apiGet";

const useSubmitRepresentative = ({setErrors, updateModalMatricula}) => {
    const onSubmit = async (
        values,
        {setSubmitting, setErrors, errors, resetForm}
    ) => {
        setSubmitting(true);

        try {
            console.log(values);

        } catch (error) {
            console.log(error);
        } finally {
            // actualización de la tabla de matricula
            apiGet({ route: "matricula/getAll", param: periodo }).then(
                (responseGet) => getDataMatricula(responseGet?.data)
            );
            setSubmitting(false);
        }
    };

    return {onSubmit};
}

export default useSubmitRepresentative;