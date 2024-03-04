import axios from "./axios";

const apiGetDocument = async ({ route, param }) => {
  const DATA_URL = param ? `/${route}/${param}` : `/${route}`;
  const token = sessionStorage.getItem("authToken") ?? null;

  try {
    const response = await axios.get(DATA_URL, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response.status,
      data: error,
    };
  }
};

export default apiGetDocument;
