import { ExternalSystem } from "../../models/ExternalSystem";
import { axiosPrivate } from "../axiosPrivate";

const fetchExternalSystems = async (): Promise<ExternalSystem[]> => {
  const apiUrl = "/api/v1/models/external-system";
  const { data } = await axiosPrivate.get<ExternalSystem[]>(apiUrl);
  return data;
};

export const externalSystems = {
  fetchExternalSystems
};