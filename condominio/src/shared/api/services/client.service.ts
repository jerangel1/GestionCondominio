import { axiosPrivate } from "../axiosPrivate";
import { type ClientType } from "@/components/NewClientModalForm";

const fetchAllClients = async (): Promise<ClientType[]> => {
  const apiUrl = "/api/v1/models/ticket-office/clients";
  const { data } = await axiosPrivate.get<ClientType[]>(apiUrl);
  return data;
};

const registerNewClient = async (data: ClientType): Promise<void> => {
  const apiUrl = "/api/v1/models/ticket-office/clients";
  await axiosPrivate.post(apiUrl, data);
};

const dbBulkNewClient = async (data: ClientType): Promise<void> => {
  const apiUrl = "/api/v1/models/ticket-office/clients/bulk";
  await axiosPrivate.post(apiUrl, data);
};

const verifyClient = async (data: { dni: string}): Promise<void> => {
  const apiUrl = "/api/v1/models/ticket-office/clients/verify";
  await axiosPrivate.post(apiUrl, data);
};

const fetchClientById = async (data: {id: number}): Promise<void> => {
  const apiUrl = "/api/v1/models/ticket-office/clients";
  await axiosPrivate.post(apiUrl, data);
};

const fetchClientByDni = async (data: {dni: string, type: string }) => {
  const apiUrl = "/api/v1/models/ticket-office/clients/get-by-dni";
  const response = await axiosPrivate.post<ClientType & { id: number}>(apiUrl, data);
  return response.data;
};

export const clients = {
  fetchAllClients,
  registerNewClient,
  verifyClient,
  fetchClientById,
  fetchClientByDni,
  dbBulkNewClient
};
