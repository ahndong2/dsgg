/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { useNavigate } from "react-router-dom";
import { CLIENT_PAGE } from "@/constants";

export interface Options {
  [key: string]: unknown;
}
export interface Headers extends AxiosRequestHeaders {
  "X-AUTH-TOKEN": string;
}

const APP_BASE_URI = process.env.REACT_APP_APP_URL;
const headers = () => {
  return {
    "Content-Type": "application/json",
  };
};
const createInstance = (url: string, options: Options): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    ...options,
  });
  instance.defaults.timeout = 300000;
  instance.interceptors.request.use(
    (config: any) => {
      if (process.env.REACT_APP_APP_ENV === "local") {
        console.log(`[Request API : ${config.url}]`, config);
      }

      return config;
    },
    (error: string) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (process.env.REACT_APP_APP_ENV === "local") {
        console.log(`[Response API: ${response.config.url}]`, response);
      }

      return JSON.parse(JSON.stringify(response));
    },
    (error: string) => {
      return Promise.reject(error);
    }
  );
  return instance;
};
const API = createInstance(`${APP_BASE_URI}`, { headers: headers() });

export { API };
