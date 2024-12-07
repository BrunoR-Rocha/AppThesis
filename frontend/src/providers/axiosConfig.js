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
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401 || status === 403) {

        window.dispatchEvent(new Event("logout"));
      }

      if (status === 503) {
        window.location.href = '/maintenance';
        return Promise.reject(error);
      }

      if (data && data.message) {
        error.message = data.message;
      } else if (data && data.error) {
        error.message = `api.errors.${data.error}`;
      } else {
        error.message = "An unexpected error occurred.";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosConfig;
