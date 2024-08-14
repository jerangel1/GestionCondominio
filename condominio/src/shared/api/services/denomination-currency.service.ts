
import { DenominationCurrency } from "../../models/DenominationCurrency";
import { axiosPrivate } from "../axiosPrivate";

export const fetchDenominationCurrency = async (currencyCode: string): Promise<DenominationCurrency[]> => {
  const endpoint = `/api/v1/models/denomination-currency/${currencyCode || "VEF"}`;
  const { data } = await axiosPrivate.get<DenominationCurrency[]>(endpoint);

  return data;
};