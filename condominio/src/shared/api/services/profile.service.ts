
import { axiosPrivate } from "../axiosPrivate";

type ProfileModel = {
  nombre: string,
  id: number
};

const getProfiles = async (data:{ parther_type_id?: number}): Promise<ProfileModel[]> => {
  const result = await axiosPrivate.post<ProfileModel[]>("/api/v1/models/profile", data);
  return result.data;
};

export const profile = {
  getProfiles
};