import { axiosPrivate } from "../axiosPrivate";
import { type BankingType } from "@/schemas/bankingSchema";

export const fetchConfigBanking = async (): Promise<BankingType> => {
  const { data } = await axiosPrivate.get<BankingType>(
    "/api/v1/models/config/banca"
  );
  return data;
};

export const updateConfigBanking = async (
  data: Omit<BankingType, "timezone" | "sub_bancas">
): Promise<void> => {
  const { id, ...rest } = data;
  await axiosPrivate.put(`/api/v1/models/config/banca/${id}`, rest);
};
