// import Swal from "sweetalert2";
// import apiGet from "../api/apiGet";
// import axios from "../api/axios";
// import useMatricula from "./useMatricula";

const useSubmitStudent = () => {
//   const { getDataMatricula, getCountMatricula } = useMatricula();
//   const { periodo } = useMatricula();
  const onSubmit = async (
    values,
    { setSubmitting, setErrors, errors, resetForm } // ver como usar setErrors y errors
  ) => {
    console.log(values);
    // setSubmitting(true);
    // const dataSet = {
    //   id_estudiante: id.idEstudiante,
    //   id_titular: id.idTitular,
    //   id_suplente: id.idSuplente,
    //   grado: parseInt(values.grado.trim()),
    //   fecha_matricula: values.fecha_matricula,
    //   anio_lectivo: periodo, // asignación manual, asignar a una variable global en configuracion
    // };

    // const URL = "/matricula/setMatricula";
    // const token = sessionStorage.getItem("authToken") ?? null;

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
