import axios from "axios";
import config from "config";
import { useState } from "react";
import storage from "services/storage";

const api = axios.create({
  // baseURL: "https://zavod.pythonanywhere.com",
  // baseURL: "https://ibrohim.pythonanywhere.com",
  baseURL: "https://hisobot.pythonanywhere.com",
  // baseURL: "https://azamatqwerty1.pythonanywhere.com",
  timeout: 7000,
  timeoutErrorMessage: "timeout"
});

const RefreshToken = localStorage.getItem("refresh-token")

// api.defaults.params = {};
// api.defaults.headers.common["Accept"] = "application/json";
// api.defaults.headers.common["Cache-Control"] = "no-cache";
api.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";
// api.defaults.params["_f"] = "json";
// api.defaults.params['author_id'] = storage.get('userId')

api.interceptors.request.use(
  (configs) => {

    const token = storage.get("token") || "";
    if (token) {
      configs.headers.Authorization = `Bearer ${token}`;
    }
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      api.post('/user/refresh/', { refresh: RefreshToken }).then((data) => {
        localStorage.setItem("token", data.data.access)
        localStorage.setItem("refresh-token", data.data.refresh)
      })
    }
    return Promise.reject(error);
  }
);

export default api;