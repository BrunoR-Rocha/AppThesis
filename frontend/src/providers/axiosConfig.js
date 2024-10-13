import axios from "axios";
import apiUrl from "./apiUrl";

const axiosConfig = axios.create({
  baseURL: apiUrl,
});

if (localStorage.getItem("auth")) {
  const { access_token, token_type } = JSON.parse(localStorage.getItem("auth"));

  axiosConfig.defaults.headers.common = {
    Authorization: `${token_type} ${access_token}`,
  };
}

axiosConfig.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("auth");
    const accessToken = auth ? JSON.parse(auth).access_token : null;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log("No access token found.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    let res = err.response && err.response.data;
    if (res) {
      if (res.message) {
        err.message = res.message;
      } else {
        err.message = `api.errors.${res.error}`;
      }
    }

    return Promise.reject(err);
  }
);

export default axiosConfig;
