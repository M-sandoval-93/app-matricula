import axios from "axios";

export default axios.create({
  // baseURL: "api-matricula",
  baseURL: "http://localhost/api-matriculas",
  // baseURL: "http://172.16.0.92/api-matriculas",
});
