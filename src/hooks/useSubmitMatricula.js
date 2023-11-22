import Swal from "sweetalert2";
import apiGet from "../api/apiGet";
import useMatricula from "./useMatricula";
import apiPost from "../api/apiPost";
import apiPut from "../api/apiPut";

const useSubmitMatricula = ({ setError, id, onCloseModal }) => {
  const { getDataMatricula, getCountMatricula, periodo } = useMatricula();
  const { idEstudiante, idTitular, idSuplente, idMatricula } = id;

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, errors, resetForm } // ver como usar setErrors y errors y si uso resetForm
  ) => {
    setSubmitting(true);
    const dataSet = {
      id_matricula: idMatricula,
      id_estudiante: idEstudiante,
      id_titular: idTitular,
      id_suplente: idSuplente,
      n_matricula: values.n_matricula,
      grado: parseInt(values.grado.trim(), 10),
      fecha_matricula: values.fecha_matricula,
      anio_lectivo: periodo,
    };

    try {
      // condicion para la edicion de una matrícula
      if (idMatricula !== "") {
        await apiPut({
          route: "matricula/updateMatricula",
          object: dataSet,
        }).then((res) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `Datos de matrícula actualizada !`,
          }).then(() => {
            onCloseModal();
          });
        });
        return;
      }

      // ingreso de una nueva matrícula
      const responseSet = await apiPost({
        route: "matricula/setMatricula",
        object: dataSet,
      });
      const numeroMatricula = await responseSet?.data?.numero_matricual;

      // // actualización de la tabla de matricula
      // apiGet({ route: "matricula/getAll", param: periodo }).then(
      //   (responseGet) => getDataMatricula(responseGet?.data)
      // );

      // actualizacion de la cantidad de altas y bajas
      apiGet({ route: "matricula/getCount", param: periodo }).then(
        (responseCount) => getCountMatricula(responseCount.data)
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Número de matrícua asignado: ${numeroMatricula}`,
      });
    } catch (error) {
      setError(error);
    } finally {
      // actualización de la tabla de matricula
      apiGet({ route: "matricula/getAll", param: periodo }).then(
        (responseGet) => getDataMatricula(responseGet?.data)
      );
      setSubmitting(false);
    }
  };

  return { onSubmit };
};

export default useSubmitMatricula;
