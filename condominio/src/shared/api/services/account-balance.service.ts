import { Paginated } from "@/types/types";
import { axiosPrivate } from "../axiosPrivate";

export type AccountBalanceResponse = {
  id: number;
  Asociado: string;
  Lista_Anterior: number;
  Lista_Actual: number;
  Lista_diaria: number;
  Parley: number;
  Otro: number;
  Total_Saldo: number;
  Total_Dolares: number;
  current_user: boolean;
  has_associates: boolean;
};

export const fetchFilterAccountBalance = async (filters: {
  balance: string | null;
  date: string | null;
  partner_id: number | null;
}) => {
  const apiUrl = "/api/v1/models/account-balance";
  const result = await axiosPrivate.post<Paginated<AccountBalanceResponse>>(
    apiUrl,
    filters
  );
  return result.data;
};
