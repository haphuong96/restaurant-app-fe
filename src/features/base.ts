import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { UserTokens } from "./auth/types";
import { refreshToken } from "./auth/api";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
const ADMIN_URL = `${BASE_URL}/admin`;

export const API = axios.create({
  baseURL: BASE_URL,
});

export const ADMIN_API = axios.create({
  baseURL: ADMIN_URL,
});

const authRequestInterceptor = (reqConfig: InternalAxiosRequestConfig) => {
  const profile : string | null = localStorage.getItem("profile");
  const tokens: UserTokens = profile ? JSON.parse(profile) : null;
  if (tokens) {
    reqConfig.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return reqConfig;
};

const authAdminResponseSuccessInterceptor = (
  res: AxiosResponse
): AxiosResponse => {
  return res;
};
const authAdminResponseErrorInterceptor = async (error: any): Promise<any> => {
  // if no refresh token, redirect to login

  // retrieve original request config
  const originalReqConfig: InternalAxiosRequestConfig = error.config;
  // if error response is 401 || 403 && not a refresh token request, try to refresh token
  if (
    (error.response.status === 401 || error.response.status === 403) &&
    originalReqConfig.url !== "auth/refresh/"
  ) {
    // get refresh token from local storage
    const { refresh }: UserTokens = JSON.parse(
      localStorage.getItem("profile") || ""
    );

    if (refresh) {
      const res = await refreshToken(refresh);
      // if refresh token is valid, retry original request
      if (res.data) {
        return ADMIN_API(originalReqConfig);
      }
    }

    localStorage.removeItem("profile");
    
  } else if (originalReqConfig.url === "auth/refresh/") {
    localStorage.removeItem("profile");
  }
  window.location.reload();
  return Promise.reject(error);
};

API.interceptors.request.use(authRequestInterceptor);
ADMIN_API.interceptors.request.use(authRequestInterceptor);
ADMIN_API.interceptors.response.use(
  authAdminResponseSuccessInterceptor,
  authAdminResponseErrorInterceptor
);
