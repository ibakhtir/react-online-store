import axios from "axios";
import { toast } from "react-toastify";

import config from "../config.json";

import authService from "./auth.service";
import {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate
} from "./localStorage.service";

const http = axios.create({
  baseURL: config.apiEndpoint
});

http.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const expiresDate = getTokenExpiresDate();

    if (refreshToken && expiresDate < Date.now()) {
      const data = await authService.refresh();
      setTokens(data);
    }

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };

    return res;
  },
  (error) => {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      toast.error("Непредвиденная ошибка. Попробуйте позже.");
    }

    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
};

export default httpService;
