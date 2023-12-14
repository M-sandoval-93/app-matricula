import Swal from "sweetalert2";
import apiGet from "../api/apiGet";
import apiGetDocument from "../api/apiGetDocument";

// funcion para restringir number, devuelve un number
// function to restrict number, returns a number
export const numberFormat = (val) => {
  val.target.value = val.target.value.replace(/[^0-9]/g, "");
  return val;
};

// funcion para restringir string, devuelve un string
// function to restrict string, returns a string
export const stringFormat = (val) => {
  val.target.value = val.target.value.replace(/[^A-Za-z\s]/g, "");
  return val;
};

// funcion para remover espacios en blanco
// function to remove whitespace
// export const removeSpaces = ({ values }) => {
//   const newValues = {};
//   Object.keys(values).map((key) => {
//     if (typeof values[key] === "string") {
//       newValues[key] = values[key].trim();
//     } else {
//       newValues[key] = values[key];
//     }
//   });

//   return newValues;
// };

// funcion para calcular el digito verificador del rut
// function to calculate the verification digit of the rut
export const calculateCheckDigit = (T) => {
  let M = 0,
    S = 1;

  for (; T; T = Math.floor(T / 10)) {
    S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  }
  return S ? S - 1 : "K";
};

// función para validar el formato del rut, devuelve un booleano
// function to validate the format of the rut, returns a boolean
export const validateRut = (rut, dv) => {
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(`${rut}-${dv}`)) {
    return false;
  }

  if (dv == "K") dv = "K";
  return calculateCheckDigit(rut) == dv;
};

// funcion para obtener el nombre de una persona, por medio del rut
export const getName = ({
  val,
  setFieldValue,
  inputGrade,
  inputDv,
  inputNombre,
  setId,
  property,
  periodo,
}) => {
  const rut = val.target.value;
  const route =
    property === "idEstudiante"
      ? "student/getNameStudent"
      : "representative/getNameRepresentative";

  const param = property === "idEstudiante" ? `${rut}/${periodo}` : `${rut}`;

  if (rut.length >= 7 && rut.length <= 9) {
    setFieldValue(inputDv, calculateCheckDigit(rut));

    getPerson(param, route)
      .then(({ data }) => {
        const id = data?.id ? data?.id : null;
        const name = data?.message ? data?.message : data?.nombres;
        const grade = data?.grado ? data?.grado : null;
        setFieldValue(inputNombre, name);
        grade && setFieldValue(inputGrade, grade);
        setId((prev) => ({ ...prev, [property]: id }));
      })
      .catch((error) => {
        setFieldValue(
          inputNombre,
          error?.response ? error?.response?.data?.message : error?.message
        );
      });
  } else {
    setFieldValue(inputDv, "");
    setId((prev) => ({ ...prev, [property]: "" }));
    setFieldValue(inputNombre, "");
  }

  return numberFormat(val);
};

// funcion para obtener los datos de una persona
export const getPerson = async (param, route) => {
  const response = await apiGet({ route: route, param: param });
  const data = response?.data;
  return { data };
};

// funcion para obtener la fecha actual
export const getCurrentDate = () => {
  const fecha = new Date();
  const y = fecha.getFullYear();
  const m = fecha.getMonth() + 1;
  const d = fecha.getDate();

  let number = (data) => (data <= 9 ? "0" + data : data);

  return `${number(y)}-${number(m)}-${number(d)}`;
};

// funcion para obtener el año actual
export const getCurrentYear = () => {
  const fecha = new Date();
  const y = fecha.getFullYear();
  return y;
};

// funcion para obtener excel con registro matriculas
export const getReportMatricula = ({ stateObject, periodo }) => {
  const { fullPeriod, dateFrom, dateTo } = stateObject;

  if (!fullPeriod && (dateFrom === "" || dateTo === "")) {
    Swal.fire({
      icon: "warning",
      title: "Excepción detectada",
      text: "Seleccionar fechas",
    });
    return;
  }

  const from = fullPeriod ? "2023-01-01" : dateFrom;
  const to = fullPeriod ? `${getCurrentYear()}-12-31` : dateTo;

  apiGetDocument({
    route: "report/getReportMatricula",
    param: `${from}/${to}/${periodo}`,
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ReporteMatricula_${periodo}.xlsx`);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    })
    // TRABAJAR EN EXPIRACION DEL TOKEN
    .catch((error) => console.log(error));
};

export const getReportProcessMatricula = ({ periodo }) => {
  apiGetDocument({
    route: "report/getReportProcessMatricula",
    param: periodo,
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Proceso_matricula_${periodo}.xlsx`);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    })
    // TRABAJAR EN EXPIRACION DEL TOKEN
    .catch((error) => console.log(error));
};
