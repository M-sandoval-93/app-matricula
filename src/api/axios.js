import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost/www/api-matriculas",
  baseURL: "http://172.16.0.92/api-matriculas",
});
