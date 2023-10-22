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
export const handleCustomRut = ({
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
      getName(data, route)
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

// function para obtener el nombre del estudiante
// function to get student name
const getName = async (rut, route) => {
  const response = await apiGet({ route: route, param: rut });
  const data = response?.data;
  return { data };
};
