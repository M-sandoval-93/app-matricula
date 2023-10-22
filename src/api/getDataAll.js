import axios from "./axios";

const getDataAll = async (route) => {
  const DATA_URL = `/${route}`;
  const token = sessionStorage.getItem("authToken") ?? null;

  try {
    const response = await axios.get(DATA_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return { data: response?.data };
  } catch (error) {
    return { error: error };
  }
};

export default getDataAll;
