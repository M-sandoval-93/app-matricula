import apiGetDocument from "../api/apiGetDocument";

// función para obtener certificado de alumno regular
const regularStudentCertificate = ({
  rut,
  updateStateMatricula,
  authPeriodo,
}) => {
  apiGetDocument({
    route: "report/getCertificadoAlumnoRegular",
    param: `${rut}/${authPeriodo}`,
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cert_AlumnoRegular_${rut}.docx`);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) =>
      updateStateMatricula({ error: "Matricula sin curso asignado!" })
    );
};

// función para obtener certificado de matricula
const registrationCertificate = ({
  rut,
  updateStateMatricula,
  authPeriodo,
}) => {
  apiGetDocument({
    route: "report/getCertificadoMatricula",
    param: `${rut}/${authPeriodo}`,
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cert_Matricula_${rut}.docx`);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => updateStateMatricula({ error: error }));
};

// función para exportar certificados
export const exportCertificates = ({
  bloqueoPeriodoActual,
  authProcesoMatricula,
  rut,
  updateStateMatricula,
  authPeriodo,
}) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  if (bloqueoPeriodoActual || !authProcesoMatricula) {
    if (currentMonth === 1 || currentMonth === 2) {
      registrationCertificate({ rut, updateStateMatricula, authPeriodo });
      return;
    }

    regularStudentCertificate({ rut, updateStateMatricula, authPeriodo });
    return;
  }

  registrationCertificate({ rut, updateStateMatricula, authPeriodo });
};
