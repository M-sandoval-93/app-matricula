import axios from "./axios";

const apiPut = async ({ route, object }) => {
//   const DATA_URL = param ? `/${route}/${param}` : `/${route}`;
const DATA_URL = route;
  const token = sessionStorage.getItem("authToken") ?? null;

  const response = await axios.put(
    DATA_URL, object, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export default apiPut;