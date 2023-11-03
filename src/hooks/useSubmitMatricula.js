import Swal from "sweetalert2";
import apiGet from "../api/apiGet";
// import axios from "../api/axios";
import useMatricula from "./useMatricula";
import apiPost from "../api/apiPost";

const useSubmitMatricula = ({ setError, id }) => {
  const { getDataMatricula, getCountMatricula } = useMatricula();
  const { periodo } = useMatricula();
  const onSubmit = async (
    values,
    { setSubmitting, setErrors, errors, resetForm } // ver como usar setErrors y errors
  ) => {
    setSubmitting(true);
    const dataSet = {
      id_matricula: id.idMatricula,
      id_estudiante: id.idEstudiante,
      id_titular: id.idTitular,
      id_suplente: id.idSuplente,
      grado: parseInt(values.grado.trim()),
      fecha_matricula: values.fecha_matricula,
      anio_lectivo: periodo,
    };

    
    try {
      if (dataSet.id_matricula !== "") {
        console.log("editar matricula"); // trabajando primero en la api de update matricula
        return;
      }
      const response = await apiPost({route: "matricula/setMatricula", object: dataSet});
      const numeroMatricula = await response?.data?.numero_matricual

      apiGet({route: "matricula/getAll", param: periodo})
        .then((responseGet) => getDataMatricula(responseGet?.data));

      apiGet({ route: "matricula/getCount", param: periodo })
        .then((responseCount) => getCountMatricula(responseCount.data)),

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Número de matrícua asignado: ${numeroMatricula}`,
      }).then(() => {
        resetForm();
      });
        
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return { onSubmit };
};

export default useSubmitMatricula;
