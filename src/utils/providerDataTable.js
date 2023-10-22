export const providerFilter = ({ data, filter }) => {
  const filteredData = data.filter((row) => {
    const values = Object.values(row).join(" ").toLowerCase();
    return values.includes(filter.toLowerCase());
  });
  return filteredData;
};

export const providerPaginationComponent = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
};
