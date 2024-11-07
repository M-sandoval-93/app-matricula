import apiGetDocument from "../api/apiGetDocument";
import { apiPostDocument } from "../api/apiPost";
import { getCurrentYear } from "./funciones";

// función para obtener certificado de alumno regular
const regularStudentCertificate = ({
  rut,
  updateDataMatricula,
  authPeriodo,
}) => {
  apiGetDocument({
    route: "report/getCertificadoAlumnoRegular",
    param: `${rut}/${authPeriodo}`,
  }).then((response) => {
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cert_AlumnoRegular_${rut}.docx`);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } else {
      updateDataMatricula({ error: response.data });
    }
  });
};


// función para obtener certificado de matricula
const registrationCertificate = ({ rut, updateDataMatricula, authPeriodo }) => {
  apiGetDocument({
    route: "report/getCertificadoMatricula",
    param: `${rut}/${authPeriodo}`,
  }).then((response) => {
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cert_Matricula_${rut}.docx`);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } else {
      updateDataMatricula({ error: response.data });
    }
  });
};

// función para obtener ficha de matricula
export const exportRegistrationForm = ({dataForm, rut}) => {
  apiPostDocument({
    route: "report/getRegistrationForm",
    object: dataForm,
  }).then((response) => {
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ficha_matricula_${rut}.docx`);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } else {
      updateDataMatricula({ error: response.data });
    }
  })
} 

// función para exportar certificados
export const exportCertificates = ({
  bloqueoPeriodoActual,
  authProcesoMatricula,
  rut,
  authPeriodo,
  authPrivilege,
  updateStateMatricula,
  updateDataMatricula,
  estado,
  curso,
}) => {
  // variables tipo fecha
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  // privilegios permitidos para utilizar el modal
  const acceptedPrivilege = ["1", "2"];

  // condición para lanzar error por falta de privilegios
  if (!acceptedPrivilege.includes(authPrivilege)) {
    updateStateMatricula({
      errorMatricula: { message: "Advertencia: Privilegios insuficientes !" },
    });
    return;
  }

  // condición para lanzar error por estudiante retirado
  if (estado === "RETIRADO (A)") {
    updateStateMatricula({
      errorMatricula: { message: "Advertencia: Estudiante retirado !" },
    });
    return;
  }

  // condición para lanzar error por matricula sin curso asignado
  if (!curso) {
    updateStateMatricula({
      errorMatricula: { message: "Matrícula sin curso asignado !!" },
    });
    return;
  }

  if (bloqueoPeriodoActual || !authProcesoMatricula) {
    // condición para exportar certificado de matrícula hasta el último día de febrero
    if (currentMonth === 1 || currentMonth === 2) {
      registrationCertificate({ rut, updateDataMatricula, authPeriodo });
      return;
    }

    regularStudentCertificate({ rut, updateDataMatricula, authPeriodo });
    return;
  }

  registrationCertificate({ rut, updateDataMatricula, authPeriodo });
};

// función para descargar reporte de cursos del periodo
export const getReportCourses = ({
  periodo,
  updateStateCourse,
  setSpinner,
}) => {
  setSpinner(true);

  apiGetDocument({
    route: "report/getReportCourses",
    param: periodo,
  })
    .then((response) => {
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `ReporteCursos_${periodo}.xlsx`);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        updateStateCourse({ errorCourse: response.data });
      }
    })
    .catch((error) => {
      updateStateCourse({ errorCourse: "Error en la solicitud del reporte!" });
    })
    .finally(() => setSpinner(false));
};

// función para descargar reporte de cambios de curso
export const getReportChangeCourse = ({
  periodo,
  updateStateCourse,
  setSpinner,
}) => {
  setSpinner(true);

  apiGetDocument({
    route: "report/getReportChangeCourse",
    param: periodo,
  })
    .then((response) => {
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `ReporteCambioCursos_${periodo}.xlsx`);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        updateStateCourse({ errorCourse: response.data });
      }
    })
    .catch((error) => {
      updateStateCourse({ errorCourse: "Error en la solicitud del reporte!" });
    })
    .finally(() => setSpinner(false));
};

// función para descargar reporte de curso
export const getReportCourse = ({
  periodo,
  course,
  authPrivilege,
  updateStateCourse,
}) => {
  // privilegios permitidos para utilizar el modal
  const acceptedPrivilege = ["1", "2", "4"];

  // condición para lanzar error por falta de privilegios
  if (!acceptedPrivilege.includes(authPrivilege)) {
    updateStateCourse({
      errorCourse: { message: "Advertencia: Privilegios insuficientes !" },
    });
    return;
  }

  apiGetDocument({
    route: "report/getReportCourse",
    param: `${periodo}/${course}`,
  }).then((response) => {
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Nómina_${course}_${periodo}.xlsx`);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } else {
      updateStateCourse({ errorCourse: response.data });
    }
  });
};

// function to download license plate withdrawal
export const getReportWithdrawal = ({dateObject, periodo}) => {
  const {fullPeriod, dateFrom, dateTo} = dateObject;

  // comprobar la selección de fechas
  if (!fullPeriod && (dateFrom === "" || dateTo === "")) {
    Swal.fire({
      icon: "warning",
      title: "Excepción detectada",
      text: "Seleccionar fechas",
    });
    return;
  }

  // asignación de las fechas desde y hasta
  const from = fullPeriod ? "2023-01-01" : dateFrom;
  const to = fullPeriod ? `${getCurrentYear()}-12-31` : dateTo;

  // petición a la API
  apiGetDocument({
    route: "report/getReportWithdrawal",
    param: `${from}/${to}/${periodo}`,
  })
    .then((response) => {
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `ReporteRetiros_${periodo}.xlsx`);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        updateStateCourse({ errorCourse: response.data });
      }
    })
    .catch((error) => {
      updateStateCourse({ errorCourse: "Error en la solicitud del reporte!" });
    })


}
