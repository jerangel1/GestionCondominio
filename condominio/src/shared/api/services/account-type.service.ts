import { AccountType } from "../../models/AccountType";
import { axiosPrivate } from "../axiosPrivate";

export const fetchAccountTypes = async (): Promise<any[]> => {
  const { data } = await axiosPrivate.get<AccountType[]>("/api/v1/models/account-type");
  return data.map((account) => ({
    name: account.nombre,
    id: account.id,
    code: account.codigo,
    description: account.descripcion,
  }));
};
