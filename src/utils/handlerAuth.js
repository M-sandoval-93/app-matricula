import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const handlerAuth = async () => {
  const { authToken } = useAuth();
  const URL = "/validateSession";

  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    return { response };
  } catch (error) {
    return { error };
  }
};

export default handlerAuth;
