import Swal from "sweetalert2";
import apiGet from "../api/apiGet";
import useMatricula from "./useMatricula";
import apiPost from "../api/apiPost";
import apiPut from "../api/apiPut";

const useSubmitMatricula = ({ setError, id, onCloseModal }) => {
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
      // condicion para la edicion de una matrícula
      if (dataSet.id_matricula !== "") {
        apiPut({ route: "matricula/updateMatricula", object: dataSet }).then(
          (res) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Matricula actualizada !",
            }).then(() => {
              onCloseModal();
              resetForm();
            });
          }
        );

        return;
      }

      // ingreso de una nueva matrícula
      const responseSet = await apiPost({
        route: "matricula/setMatricula",
        object: dataSet,
      });
      const numeroMatricula = await responseSet?.data?.numero_matricual;

      // actualización de la tabla de matricula
      apiGet({ route: "matricula/getAll", param: periodo }).then(
        (responseGet) => getDataMatricula(responseGet?.data)
      );

      // actualizacion de la cantidad de altas y bajas
      apiGet({ route: "matricula/getCount", param: periodo }).then(
        (responseCount) => getCountMatricula(responseCount.data)
      ),
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
