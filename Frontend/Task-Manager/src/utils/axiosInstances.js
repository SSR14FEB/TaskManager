import axios from "axios";
import { BASE_URL } from "../utils/apiPath";

export const axiosInstances = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstances.interceptors.request.use(
  (configuration) => {
    configuration.withCredentials = true;
    return configuration;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstances.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const errorStatus = error.response?.status;
        if (errorStatus == 401&&window.location.pathname!="/login") {
             console.log("i am in axios");
             window.location.href="/login";
    }
    if (errorStatus == 500) {
        console.log("Error 500 something went wrong")
    }
    if (error.code == "ECONNABORTED") {
      console.log("Server time out please try again after some time");
    }
    return Promise.reject(error);
  }
);

export const axiosInstancesOfForm = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data", // Axios will set the correct boundary
  },
});

axiosInstancesOfForm.interceptors.request.use(
  (configuration) => {
    configuration.withCredentials = true;
    return configuration;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstancesOfForm.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorStatus = error.response?.status;
    if (errorStatus == 401) {
      window.location.href = "/login";
    }
    if (errorStatus == 500) {
      console.log("Please try again");
    }
    if (error.code == "ECONNABORTED") {
      console.log("Server time out please try again after some time");
    }
    return Promise.reject(error);
  }
);
