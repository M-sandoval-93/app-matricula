import Swal from "sweetalert2";
import apiGet from "../api/apiGet";
import useMatricula from "./useMatricula";
import useAuth from "./useAuth";
import apiPost from "../api/apiPost";
import apiPut from "../api/apiPut";

const useSubmitMatricula = ({
  setError,
  id,
  idMatricula,
  onCloseModal,
  formikMatriculaRef,
  updateId,
}) => {
  const { updateDataMatricula } = useMatricula();
  const { authPeriodo } = useAuth();
  const { idEstudiante, idTitular, idSuplente } = id;

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
            // setear los id registrados
            updateId({
              idEstudiante: "",
              idTitular: "",
              idSuplente: "",
            });

            // cerrar el modal
            onCloseModal();

            // actualización de la tabla de matricula
            apiGet({ route: "matricula/getAll", param: authPeriodo }).then(
              (responseGet) =>
                updateDataMatricula({ matricula: responseGet?.data })
            );

            setSubmitting(false);
          });
        });
        return;
      }

      // ingreso de una nueva matrícula
      const responseSet = await apiPost({
        route: "matricula/setMatricula",
        object: dataSet,
      });

      // obtención del número de matrícula asignado
      const numeroMatricula = await responseSet?.data?.numero_matricual;

      // visualización del número de matrícula asignado
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Número de matrícua asignado: ${numeroMatricula}`,
      });

      // setear form al registrar datos
      const handleReset = formikMatriculaRef.current.handleReset;
      handleReset();

      // actualización de la tabla de matricula
      apiGet({ route: "matricula/getAll", param: authPeriodo }).then(
        (responseGet) => {
          // lista de matriculados
          const listMatricula = responseGet?.data;

          // cantidad de matriculados
          const matriculados = listMatricula.filter(
            (count) => count.estado === "ACTIVO"
          ).length;

          // cantidad de retirados
          const retirados = listMatricula.filter(
            (count) => count.estado === "RETIRADO"
          ).length;

          updateDataMatricula({
            matricula: listMatricula,
            countMatriculados: matriculados,
            countRetirados: retirados,
          });
        }
      );

      // setear los id registrados
      updateId({
        idEstudiante: "",
        idTitular: "",
        idSuplente: "",
      });

      setSubmitting(false);
    } catch (error) {
      setError(error);
    }
  };

  return { onSubmit };
};

export default useSubmitMatricula;
