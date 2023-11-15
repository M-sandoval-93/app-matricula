import Swal from "sweetalert2";
import apiPut from "../api/apiPut";
import apiGet from "../api/apiGet";
import useMatricula from "./useMatricula";

const useSubmitStudent = ({ setError, updateModalMatricula }) => {
  const { getDataMatricula, periodo } = useMatricula();
  const onSubmit = async (
    values,
    { setSubmitting, setErrors, errors, resetForm } // ver como usar setErrors y errors
  ) => {
    // console.log(values);
    setSubmitting(true);
    const student = {
      id: values?.id_estudiante,
      rut: values?.rut_estudiante,
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
        await apiPut({ route: "student/update", object: student }).then(
          (res) => {
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
          }
        );
        return;
      }

      console.log("nuevo estudiante");
      // ingresar nuevo estudiante

      // actualizar tabla de estudiantes

      // actualizar cantidad de estudiantes
    } catch (error) {
      setError(error);
    } finally {
      // actualización de la tabla de matricula
      apiGet({ route: "matricula/getAll", param: periodo }).then(
        (responseGet) => getDataMatricula(responseGet?.data)
      );
      setSubmitting(false);
    }

    // try {
    //   const response = await axios.post(URL, dataSet, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.status === 200) {
    //     // actualización de los datos de matrícula
    //     apiGet({ route: "matricula/getAll", param: periodo })
    //       .then((response) => {
    //         getDataMatricula(response.data);
    //       })
    //       .catch((error) => {
    //         setError(error);
    //         // setErrors({ values.rut_estudiante: "error" });
    //       });

    //     // actualización de las cantidades de altas y bajas
    //     apiGet({ route: "matricula/getCount", param: periodo })
    //       .then((response) => {
    //         getCountMatricula(response.data);
    //       })
    //       .catch((error) => setError(error));

    //     const nMatricula = response?.data?.numero_matricual;
    //     Swal.fire({
    //       icon: "success",
    //       title: "Success",
    //       text: `Número de matrícua asignado: ${nMatricula}`,
    //     }).then(() => {
    //       // onClose();
    //       resetForm();
    //     });
    //   }
    // } catch (error) {
    //   setError(error);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return { onSubmit };
};

export default useSubmitStudent;
