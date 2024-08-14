
import { axiosPublic } from "../axiosPublic";

export const login = async (username: string, password: string) => {
  const loginData = { username, password };
  const { data } = await axiosPublic.post<{
    access_token: string, 
    refresh_token: string, 
    currency: string 
  }>("api/auth/login", loginData);
  return data;
};

export const refresh = async (username: string, password: string) => {
  const loginData = { username, password };
  const { data } = await axiosPublic.post("api/auth/refresh", loginData);
  return data;
};

export const fresh = async (username: string, password: string) => {
  const loginData = { username, password };
  const { data } = await axiosPublic.post("api/auth/fresh", loginData);
  return data;
};
