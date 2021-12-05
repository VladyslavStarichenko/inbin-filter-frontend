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
      config.headers.authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     try {
//       const originalRequest = error.config;

//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;

//         localStorage.removeItem('token');
//       }
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }
// );

export default axiosInstance;
