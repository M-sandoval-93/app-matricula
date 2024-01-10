// función de ordenamiento personalizado para los estados
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
