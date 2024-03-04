// función para ordenar por tipo de estado (matriculado - suspendido - retirado)
export const functionSortStates = (a, b, sortOrder) => {
  // logica para el ordenamiento según el estado
  const orderStates = {
    "MATRICULADO (A)": 1,
    "SUSPENDIDO (A)": 2,
    "RETIRADO (A)": 3,
  };

  // obtencion de los estados
  const orderOne = a.estado;
  const orderTwo = b.estado;

  // condicion para el ordenamiento
  if (orderStates[orderOne] < orderStates[orderTwo]) {
    return sortOrder === "asc" ? -1 : 1;
  } else if (orderStates[orderOne] > orderStates[orderTwo]) {
    return sortOrder === "asc" ? 1 : -1;
  } else {
    return 0;
  }
};

// función para ordenar por tipo de estudiante (nuevo - antiguo)
export const functionSortTypeStudent = (rowA, rowB) => {
  return rowA.estudiante_nuevo === rowB.estudiante_nuevo
    ? 0
    : rowA.estudiante_nuevo
    ? 1
    : -1;
};

// funcion para ordenar fechas
export const functionSortDateText = (datePropertyName) => (rowA, rowB) => {
  // función para transformar fecha de texto a date
  const getDateFromText = (row) => {
    const dateString = row[datePropertyName];
    return dateString
      ? new Date(dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
      : null;
  };

  // obtener las fechas de tipo date
  const dateA = getDateFromText(rowA);
  const dateB = getDateFromText(rowB);

  // condicion para controlar los campos nulos al final
  if (dateA === null && dateB === null) {
    return 0; // ambos datos son nulos, no hay diferencia
  } else if (dateA === null) {
    return 1; // dateA es nulo, colocamos dateB al final
  } else if (dateB === null) {
    return -1; // dateB es nulo, colocamos dateA al final
  } else {
    return dateA - dateB;
  }
};
