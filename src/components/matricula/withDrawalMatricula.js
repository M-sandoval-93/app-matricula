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

  if (!acceptedPrivilege.includes(authPrivilege)) {
    updateStateMatricula({
      error: { message: "Advertencia: Privilegios insuficientes !" },
    });
    return;
  }

  // función para actualizar array de course y filtro con nuevas letras de curso
  const updatedArray = (dataArray, state, dateString) => {
    const newArray = dataArray.map((item) => {
      if (item.id === idMatricula) {
        return { ...item, estado: state, fecha_baja: dateString };
      }
      return item;
    });

    return newArray;
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

  // actualización de los datos de la tabla matrícula
  updateDataMatricula({
    matricula: updatedArray(
      matricula,
      "RETIRADO (A)",
      getDateStringFormat(new Date(dischargeDate), true)
    ),
  });

  // petición put
  apiPut({
    route: "matricula/putWithdrawalDateMatricula",
    object: {
      fechaRetiro: dischargeDate,
      idMatricula: idMatricula,
      periodo: authPeriodo,
    },
  }).then(() => {
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
  });
};

export default withDrawalMatricula;
