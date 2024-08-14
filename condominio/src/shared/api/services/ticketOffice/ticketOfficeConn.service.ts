import { axiosPrivate } from "../../axiosPrivate";

export const registerDb = async (data: {
  username: string;
  password: string;
}) => {
  const apiUrl = "api/auth/register-db";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

export const changeDb = async (data: { db_name: string }) => {
  const apiUrl = "api/auth/change-db";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

export const conns = async () => {
  const apiUrl = "api/auth/conns";
  const { data } = await axiosPrivate.post<{ 
    db_name: string, 
    current: boolean 
  }[]>(apiUrl, {});
  return data;
};

export const ticketOfficeConn = {
  registerDb,
  changeDb,
  conns,
};
