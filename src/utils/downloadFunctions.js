import apiGetDocument from "../api/apiGetDocument";

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

// función para exportar certificados
export const exportCertificates = ({
  bloqueoPeriodoActual,
  authProcesoMatricula,
  rut,
  authPeriodo,
  authPrivilege,
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
    updateDataMatricula({
      error: { message: "Advertencia: Privilegios insuficientes !" },
    });
    return;
  }

  // condición para lanzar error por estudiante retirado
  if (estado === "RETIRADO (A)") {
    updateDataMatricula({
      error: { message: "Advertencia: Estudiante retirado !" },
    });
    return;
  }

  // condición para lanzar error por matricula sin curso asignado
  if (!curso) {
    updateDataMatricula({
      error: { message: "Matrícula sin curso asignado !!" },
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
export const getReportCourses = ({ periodo, updateStateCourse }) => {
  apiGetDocument({
    route: "report/getReportCourses",
    param: periodo,
  }).then((response) => {
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
  });
};

// función para descargar reporte de curso
export const getReportCourse = ({ periodo, course }) => {
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
      // updateStateCourse({ errorCourse: response.data });
      console.log("error");
    }
  });
};
