import { Paginated } from "@/types/types";
import { User } from "../../models/User";
import { axiosPrivate } from "../axiosPrivate";

export const saveUser = async (data: any) => {
  await axiosPrivate.post("/api/v1/models/user/create", data);
};

export const getAllUsers = async (data: any) => {
  const response = await axiosPrivate.post<Paginated<User>>("/api/v1/models/users", data);
  return response.data;
};

export const getUserById = async (data:{ id: number }): Promise<any> => {
  const response = await axiosPrivate.post("/api/v1/models/user", data);
  return response.data;
};

export const updateUser = async (data:any) => {
  return await axiosPrivate.post<User[]>("/api/v1/models/user/update", data);
};

export const users = {
  saveUser,
  getUserById,
  getAllUsers,
  updateUser
};