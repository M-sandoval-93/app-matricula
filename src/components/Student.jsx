import { useLoaderData } from "react-router-dom";
import axios from "../api/axios";
import stateSession from "../utils/stateSession";

const Student = () => {
  const { response } = useLoaderData();
  stateSession({ response });

  return (
    <div>
      <h1>student</h1>
      <ul>
        {response?.data?.length > 0 ? (
          response?.data.map((student) => (
            <li key={student.id_estudiante}>{student.nombres_estudiante}</li>
          ))
        ) : (
          <li>Sin datos del estudiante</li>
        )}
      </ul>
    </div>
  );
};

export default Student;

const STUDENT_URL = "/student";
export const loaderStudent = async () => {
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
    return { response: error?.response?.data?.status };
  }
};
