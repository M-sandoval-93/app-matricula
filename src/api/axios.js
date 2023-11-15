import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/www/api-matriculas",
  // baseURL: "http://localhost/api-matriculas",
});
