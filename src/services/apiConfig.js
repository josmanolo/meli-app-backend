import axios from "axios";

const axiosInstace = axios.create({
  baseURL: "https://api.mercadolibre.com",
});

export default axiosInstace;
