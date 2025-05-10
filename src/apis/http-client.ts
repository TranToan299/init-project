import axios, { AxiosInstance, AxiosResponse, ResponseType } from 'axios';
import { LOCAL_STORAGE_KEYS } from '../constants/app.constants';
import { ROUTE_PATHS } from '../constants/router.constants';
import { LocalUtils } from '../utils/local';

const toggleLoading = (value: boolean) => {};

// const getHeaders = (contentType: string) => {
//   return {
//     'Content-Type': contentType,
//     Authorization: `Bearer ${LocalUtils.getCookie(LOCAL_COOKIE_KEY.ACCESS_TOKEN)}`,
//   };
// };

const axiosInstance = (
  contentType: string = 'application/json',
  responseType: ResponseType = 'json',
  isShowLoading: boolean = true,
  isShowErrorMessage = true,
  allowAnonymous = false
): AxiosInstance => {
  const baseURL = `http://localhost:3001`;

  if (isShowLoading) toggleLoading(true);

  const instance = axios.create({
    responseType,
    baseURL,
    headers: {
      'Content-Type': contentType,
    },
  });

  instance.interceptors.response.use(
    (response) => {
      if (isShowLoading) toggleLoading(false);

      return response;
    },
    (error) => {
      if (isShowLoading) toggleLoading(false);

      const data = error.response.data;
      if (isShowErrorMessage) {
        let message = 'An error has occurred please contact the system administrator';

        if (data && data.message) {
          message = data.message;
        } else if (typeof data === 'string' && data !== '') {
          message = data;
        }

        //   showNotification("error", message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const getAsync = (
  url: string,
  params?: { [key: string]: any },
  isShowLoading: boolean = true,
  isShowErrorMessage = true,
  allowAnonymous = false
): Promise<AxiosResponse> => {
  return axiosInstance(
    'application/json',
    'json',
    isShowLoading,
    isShowErrorMessage,
    allowAnonymous
  ).get(url, {
    params,
  });
};

export const postAsync = (
  url: string,
  json?: object,
  isShowLoading = true,
  isShowErrorMessage = true,
  allowAnonymous = false
): Promise<AxiosResponse> => {
  return axiosInstance(
    'application/json',
    'json',
    isShowLoading,
    isShowErrorMessage,
    allowAnonymous
  ).post(url, json);
};

export const putAsync = (
  url: string,
  json?: object,
  isShowLoading: boolean = true,
  isShowErrorMessage = true,
  allowAnonymous = false
): Promise<AxiosResponse> => {
  return axiosInstance(
    'application/json',
    'json',
    isShowLoading,
    isShowErrorMessage,
    allowAnonymous
  ).put(url, json);
};

export const deleteAsync = (
  url: string,
  json?: object,
  isShowLoading: boolean = true,
  isShowErrorMessage = true,
  allowAnonymous = false
): Promise<AxiosResponse> => {
  return axiosInstance(
    'application/json',
    'json',
    isShowLoading,
    isShowErrorMessage,
    allowAnonymous
  ).delete(url, { data: json });
};

function handleUnAuthorize() {
  LocalUtils.clear();
  window.location.replace(ROUTE_PATHS.auth.login);
}
