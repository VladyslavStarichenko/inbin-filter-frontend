// Module
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://inbin-filter.herokuapp.com/",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authToken = Cookies.get("auth-token");

    if (authToken || localStorage.getItem('token')) {
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
