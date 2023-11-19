import Swal from "sweetalert2";
import apiGet from "../api/apiGet";
import apiPut from "../api/apiPut";
import useMatricula from "./useMatricula";
import apiPost from "../api/apiPost";

const useSubmitRepresentative = ({ setErrors, updateModalMatricula }) => {
  const { getDataMatricula, periodo } = useMatricula();
  const onSubmit = async (
    values,
    { setSubmitting, setErrors, errors, resetForm }
  ) => {
    setSubmitting(true);
    const representative = {
      id: values?.id_apoderado,
      rut: values?.rut_apoderado.trim(),
      dv_rut: values?.dv_rut_apoderado,
      paterno: values?.apellido_paterno.trim(),
      materno: values?.apellido_materno.trim(),
      nombres: values?.nombres_apoderado.trim(),
      telefono: values?.telefono.trim(),
      direccion: values?.direccion.trim(),
    };

    try {
      // condición para la edición de los datos de apoderado
      if (values?.id_apoderado !== "") {
        await apiPut({
          route: "representative/updateRepresentative",
          object: representative,
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `Datos de apoderado actualizados !`,
          }).then(() =>
            updateModalMatricula({
              rut: "",
              formMatricula: true,
              formRepresentative: false,
            })
          );
        });
        return;
      }

      await apiPost({
        route: "representative/setRepresentative",
        object: representative,
      }).then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Apoderado registrado !`,
        }).then(() =>
          // ver como pasar el rut al modal matricula
          updateModalMatricula({
            rut: "",
            formMatricula: true,
            formRepresentative: false,
          })
        );
      });
      // ingresar nuevo apoderado

      // actualizar tabla apoderados

      // actualizar cantidad de apoderados
    } catch (error) {
      console.log(error);
    } finally {
      // actualización de la tabla de matricula
      await apiGet({ route: "matricula/getAll", param: periodo }).then(
        (responseGet) => getDataMatricula(responseGet?.data)
      );
      setSubmitting(false);
    }
  };

  return { onSubmit };
};

export default useSubmitRepresentative;
