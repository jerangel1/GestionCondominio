import { axiosPrivate } from "../axiosPrivate";

export type BankType = {
  name: string;
  description: string;
  code: string;
};

export const fetchListBanks = async (): Promise<BankType[]> => {
  const apiUrl = "/api/v1/models/catalog/bank";
  const result = await axiosPrivate.get<BankType[]>(apiUrl);
  return result.data;
};
