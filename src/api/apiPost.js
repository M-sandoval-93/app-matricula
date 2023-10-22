import axios from "./axios";

const apiPost = async ({ route, object }) => {
  const DATA_URL = router;
  const token = sessionStorage.getItem("authToken") ?? null;

  // trabajar en peticion post
  const response = await axios.get(DATA_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export default apiPost;
