import Swal from "sweetalert2";
import apiPut from "../api/apiPut";
import apiGet from "../api/apiGet";
import useMatricula from "./useMatricula";
import useAuth from "./useAuth";
import apiPost from "../api/apiPost";

const useSubmitStudent = ({ setError, updateModalMatricula }) => {
  // const { getDataMatricula, periodo } = useMatricula();
  const { updateDataMatricula } = useMatricula();
  const { authPeriodo } = useAuth();
  const onSubmit = async (
    values,
    { setSubmitting, setErrors, errors, resetForm } // ver como usar setErrors y errors
  ) => {
    setSubmitting(true);
    const student = {
      id: values?.id_estudiante,
      rut: values?.rut_estudiante.trim(),
      dv_rut: values?.dv_rut_estudiante,
      paterno: values?.apellido_paterno.trim(),
      materno: values?.apellido_materno.trim(),
      nombres: values.nombres_estudiante.trim(),
      nombre_social: values?.nombre_social.trim(),
      fecha_nacimiento: values.fecha_nacimiento,
      sexo: values?.sexo,
    };

    try {
      // condición para la edición de los datos del estudiante
      if (values?.id_estudiante !== "") {
        await apiPut({
          route: "student/updateStudent",
          object: student,
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `Datos de estudiante actualizados !`,
          }).then(() =>
            updateModalMatricula({
              rut: "",
              formMatricula: true,
              formStudent: false,
            })
          );
        });

        // actualización de la tabla de matricula
        await apiGet({ route: "matricula/getAll", param: authPeriodo }).then(
          (responseGet) => updateDataMatricula({ matricula: responseGet?.data })
        );
        setSubmitting(false);
        return;
      }

      await apiPost({
        route: "student/setStudent",
        object: student,
      }).then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Estudiante registrado`,
        }).then(() => {
          updateModalMatricula({
            rut: "",
            formMatricula: true,
            formStudent: false,
          });
        });
      });

      // actualización de la tabla de matricula
      await apiGet({ route: "matricula/getAll", param: authPeriodo }).then(
        (responseGet) => updateDataMatricula({ matricula: responseGet?.data })
      );
      setSubmitting(false);
      return;

      // actualizar tabla de estudiantes

      // actualizar cantidad de estudiantes
    } catch (error) {
      setError(error);
    }
  };

  return { onSubmit };
};

export default useSubmitStudent;
