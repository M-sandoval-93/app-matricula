import Swal from "sweetalert2";
import { getDateStringFormat } from "../../utils/funciones";
import apiPut from "../../api/apiPut";

const withDrawalMatricula = async ({
  matricula,
  updateDataMatricula,
  updateStateMatricula,
  idMatricula,
  authPeriodo,
  authPrivilege,
}) => {
  // privilegios permitidos para utilizar el modal
  const acceptedPrivilege = ["1", "2"];

  // control de privilegios
  if (!acceptedPrivilege.includes(authPrivilege)) {
    updateStateMatricula({
      errorMatricula: { message: "Advertencia: Privilegios insuficientes !" },
    });
    return;
  }

  // función para actualizar array de course y filtro con nuevas letras de curso
  const updatedArray = (dataArray, state, dateString) => {
    // actualización de datos en data matricula
    const newArray = dataArray.map((item) => {
      if (item.id === idMatricula) {
        return { ...item, estado: state, fecha_baja: dateString };
      }
      return item;
    });

    // actualización cantidad matriculados
    const matriculados = newArray.filter(
      (count) => count.estado === "MATRICULADO (A)"
    ).length;

    // actualización cantidad retirados
    const retirados = newArray.filter(
      (count) => count.estado === "RETIRADO (A)"
    ).length;

    // return newArray;
    return { newArray, matriculados, retirados };
  };

  // modal para solicitar fecha de baja
  const { value: date } = await Swal.fire({
    title: "Fecha retiro matrícula",
    input: "date",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    width: 360,
    allowOutsideClick: false,
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage("Seleccionar fecha válida!");
      }
    },
    customClass: {
      input: "input-date", // clase personalizada desde main.css
    },
  });

  // cancelacion baja de matricula
  if (!date) return;

  // asignación de la fecha ingresada
  const dischargeDate = date.replace(/-/g, "/");

  // obtención de data matricula actualizada
  const newDataMatricula = updatedArray(
    matricula,
    "RETIRADO (A)",
    getDateStringFormat(new Date(dischargeDate), true)
  );

  // petición put
  apiPut({
    route: "matricula/putWithdrawalDateMatricula",
    object: {
      fechaRetiro: dischargeDate,
      idMatricula: idMatricula,
      periodo: authPeriodo,
    },
  })
    .then(() => {
      // actualización de los datos de la tabla matrícula
      updateDataMatricula({
        matricula: newDataMatricula.newArray,
        countMatriculados: newDataMatricula.matriculados,
        countRetirados: newDataMatricula.retirados,
      });

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `Retiro registrado con fecha ${getDateStringFormat(
          new Date(dischargeDate),
          true
        )}`,
      });
    })
    .catch((error) => {
      updateStateMatricula({ errorMatricula: error });
    });
};

export default withDrawalMatricula;
