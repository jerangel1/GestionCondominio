import { axiosPrivate } from "../axiosPrivate";

export type CurrencyType = {
  abreviatura: string,
  codigo: string,
  id: number,
  simbolo: string,
  uuid: string,
}

export const fetchCurrencies = async (): Promise<CurrencyType[]> => {
  const apiUrl = "/api/v1/models/currency";
  const { data } = await axiosPrivate.get<CurrencyType[]>(apiUrl);
  return data;
};