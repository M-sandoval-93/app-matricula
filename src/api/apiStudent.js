export const apiStudent = async () => {
  const STUDENT_URL = "/student";
  const token = sessionStorage.getItem("authToken") ?? null;
  try {
    const response = await axios.get(STUDENT_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return { response };
  } catch (error) {
    if (error.response) return { error: error.response.data.message };
    return { error: error.message };
  }
};
