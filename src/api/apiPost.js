import axios from "./axios";

const apiPost = async ({ route, object }) => {
  const DATA_URL = route;
  const token = sessionStorage.getItem("authToken") ?? null;

  // trabajar en peticion post
  const response = await axios.post(
    DATA_URL, object, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export default apiPost;

export const apiPostDocument = async ({ route, object }) => {
  const DATA_URL = route;
  const token = sessionStorage.getItem("authToken") ?? null;

  // trabajar en peticion post
  const response = await axios.post(
    DATA_URL, object, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};
