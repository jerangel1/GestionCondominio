import axios from "axios";
import Cookies from "js-cookie";

import { memoizedRefreshToken } from "./refreshToken";
import constants from "./constants";

axios.defaults.baseURL = constants.BASE_URL;

axios.interceptors.request.use(
  async (config: any) => {
    const accessToken = Cookies.get("access_token");
  
    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    }
  
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
  
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
  
      const result = await memoizedRefreshToken();
  
      if (result?.access_token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.access_token}`,
        };
      }
  
      return axios(config);
    }
    // if(error?.response?.status === 401) {
    //   window.location.href = "/login";
    // }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;