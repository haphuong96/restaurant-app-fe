import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getUserTokens } from "./utils";
import { refreshToken } from "./auth/api";
import { APIResponse } from "./types";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
const ADMIN_URL = `${BASE_URL}/admin`;

export const PUBLIC_API = axios.create({
  baseURL: BASE_URL,
});

export const ADMIN_API = axios.create({
  baseURL: ADMIN_URL,
});

const authRequestInterceptor = (reqConfig: InternalAxiosRequestConfig) => {
  const access: string | undefined = getUserTokens()?.access;
  if (access) {
    reqConfig.headers.Authorization = `Bearer ${access}`;
  }
  return reqConfig;
};

const authResponseSuccessInterceptor = (res: AxiosResponse): AxiosResponse => {
  return res;
};

// admin error interceptor

// // Option 1: store failed requests and retry them with new access token after refreshing token
// type RefreshSubscribers = (access: string) => void;
// const refreshSubscribers: RefreshSubscribers[] = [];
// let isRefreshing = false;

// /**
//  * Source: https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c
//  * @param error
//  * @returns
//  */
// const authAdminResponseErrorInterceptor = async (error: {
//   config: InternalAxiosRequestConfig;
//   response: AxiosResponse;
// }): Promise<unknown> => {
//   const originalReqConfig: InternalAxiosRequestConfig = error.config;
//   // if error response is 401 || 403, no access rights. Try refresh token first to retrieve valid access token.
//   // If refresh token expired, clear user profile in local storage and require user to login again
//   if (error.response.status === 401 || error.response.status === 403) {
//     const retryOriginalReq = new Promise((resolve) => {
//       refreshSubscribers.push((access: string) => {
//         originalReqConfig.headers.Authorization = `Bearer ${access}`;
//         resolve(ADMIN_API(originalReqConfig));
//       });
//     });

//     if (!isRefreshing) {
//       isRefreshing = true;
//       refreshToken(getUserTokens()?.refresh || "")
//         .then(({ data }) => {
//           isRefreshing = false;
//           if (data) refreshSubscribers.map((cb) => cb(data.access));
//           // recall original requests with new tokens
//           else {
//             // clear user profile in local storage and require user to login again
//             localStorage.removeItem("profile");
//             window.location.reload();
//           }
//         })
//         .finally(() => resetRefreshStates());
//     }
//     return retryOriginalReq;
//   } else {
//     return Promise.reject(error);
//   }
// };

// const resetRefreshStates = () => {
//   refreshSubscribers.length = 0;
// };

// Option 2: store refresh token call and retry each failed request after refresh token call is completed
let isRefreshing = false;
let refreshingCall : Promise<APIResponse>;
/**
 * https://stackoverflow.com/questions/51563821/axios-interceptors-retry-original-request-and-access-original-promise
 * @param error
 * @returns
 */
const authAdminResponseErrorInterceptor = async (error: {
  config: InternalAxiosRequestConfig;
  response: AxiosResponse;
}): Promise<unknown> => {
  const originalReqConfig: InternalAxiosRequestConfig = error.config;
  // if error response is 401 || 403, no access rights. Try refresh token first to retrieve valid access token.
  // If refresh token expired, clear user profile in local storage and require user to login again
  if (error.response.status === 401 || error.response.status === 403) {
    return refreshingToken().then(({data}) => {
      if (data) {
        originalReqConfig.headers["Authorization"] = "Bearer " + data.access;
        return ADMIN_API(originalReqConfig);
      }

      // else error
      localStorage.removeItem("profile");
      window.location.reload();
    });
  } else {
    return Promise.reject(error);
  }
};

const refreshingToken = async (): Promise<APIResponse> => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshingCall = refreshToken(getUserTokens()?.refresh || "").then(
      (res) => {
        isRefreshing = false;
        return res;
      }
    );
  }
  return refreshingCall;
};

PUBLIC_API.interceptors.request.use(authRequestInterceptor);
ADMIN_API.interceptors.request.use(authRequestInterceptor);
ADMIN_API.interceptors.response.use(
  authResponseSuccessInterceptor,
  authAdminResponseErrorInterceptor
);
