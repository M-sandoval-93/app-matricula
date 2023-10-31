import { data } from "autoprefixer";
import apiGet from "../api/apiGet";

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
export const removeSpaces = ({ values }) => {
  const newValues = {};
  Object.keys(values).map((key) => {
    if (typeof values[key] === "string") {
      newValues[key] = values[key].trim();
    } else {
      newValues[key] = values[key];
    }
  });

  return newValues;
};

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

// funcion para manejar el rut del estudiante
// function tomanage the student`s rut
export const getNameStudent = ({
  val,
  setFieldValue,
  inputDv,
  inputNombre,
  setError,
  route,
  setId,
  property,
}) => {
  const data = val.target.value;

  if (data.length >= 7 && data.length <= 9) {
    setFieldValue(inputDv, calculateCheckDigit(data));

    if (inputNombre)
      getStudent(data, route)
        .then(({ data }) => {
          const id = data?.id ? data?.id : null;
          const name = data?.message ? data?.message : data?.nombres;

          setFieldValue(inputNombre, name);
          setId((prev) => ({ ...prev, [property]: id }));
        })
        .catch((error) => setError(error));
  } else {
    setFieldValue(inputDv, "");
    if (inputNombre) setFieldValue(inputNombre, "");
  }

  return numberFormat(val);
};

// export const getDataStudent = ({ rut }) => {
//   // setFieldValue(inputDv, calculateCheckDigit(data));

//   getStudent(rut, "student/getStudent")
//     .then(({ data }) => {
//       console.log(data);
//     })
//     .catch((error) => console.log(error));
// };

// function para obtener el nombre del estudiante
// function to get student name
export const getStudent = async (rut, route) => {
  const response = await apiGet({ route: route, param: rut });
  const data = response?.data;
  return { data };
};

export const getCurrentDate = () => {
  const fecha = new Date();
  const y = fecha.getFullYear();
  const m = fecha.getMonth() + 1;
  const d = fecha.getDate();

  let number = (data) => (data <= 9 ? "0" + data : data);

  return `${number(y)}-${number(m)}-${number(d)}`;
};

export const getCurrentYear = () => {
  const fecha = new Date();
  const y = fecha.getFullYear();
  return y;
};
