import axios from "./axios";

const apiPut = async ({ route, object }) => {
  const token = sessionStorage.getItem("authToken") ?? null;

  const response = await axios.put(
    route, object, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export default apiPut;