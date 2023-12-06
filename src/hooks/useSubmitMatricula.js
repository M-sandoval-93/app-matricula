import Swal from "sweetalert2";
import apiGet from "../api/apiGet";
import useMatricula from "./useMatricula";
import useAuth from "./useAuth";
import apiPost from "../api/apiPost";
import apiPut from "../api/apiPut";

const useSubmitMatricula = ({
  setError,
  id,
  onCloseModal,
  formikMatriculaRef,
}) => {
  // const { updateDataMatricula, getCountMatricula } = useMatricula();
  const { updateDataMatricula } = useMatricula();
  const { authPeriodo } = useAuth();
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
      grado: parseInt(values.grado, 10),
      fecha_matricula: values.fecha_matricula,
      anio_lectivo: authPeriodo,
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
            text:
              res?.data === dataSet?.n_matricula
                ? "Datos de matrícula actualizada !"
                : `Numero de matrícula actualizado: ${res?.data}`,
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

      // actualizacion de la cantidad de altas y bajas
      apiGet({ route: "matricula/getCount", param: authPeriodo }).then(
        // (responseCount) => getCountMatricula(responseCount.data)
        (responseCount) =>
          updateDataMatricula({
            altas: responseCount?.data?.altas,
            bajas: responseCount?.data?.bajas,
          })
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Número de matrícua asignado: ${numeroMatricula}`,
      });

      // setear form al registrar datos
      const handleReset = formikMatriculaRef.current.handleReset;
      handleReset();
    } catch (error) {
      setError(error);
    } finally {
      // actualización de la tabla de matricula
      apiGet({ route: "matricula/getAll", param: authPeriodo }).then(
        // (responseGet) => getDataMatricula(responseGet?.data)
        (responseGet) => updateDataMatricula({ matricula: responseGet?.data })
      );
      setSubmitting(false);
    }
  };

  return { onSubmit };
};

export default useSubmitMatricula;
