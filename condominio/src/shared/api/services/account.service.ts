import { NewAccountSchemaType } from "@/components/templates/account";
import { Account } from "../../models/Account";
import { axiosPrivate } from "../axiosPrivate";

export type AccountType = {
  name: string;
  id: number;
  reference: string;
  description: string;
  consolidated: boolean;
  dependsOnList: boolean;
  owner: string | undefined;
}

export const fetchAccountsData = async ():Promise<AccountType[]> => {
  const { data } = await axiosPrivate.get<Account[]>("/api/v1/models/account");
  const accounts = data.map((account) => ({
    name: account.nombre,
    id: account.id,
    reference: account.referencia,
    description: account.descripcion,
    consolidated: account.consolidado,
    dependsOnList: account.depende_de_lista,
    owner: account.owner
  }));
  return accounts;
};

export const saveAccount = async (data: NewAccountSchemaType) => {
  const apiUrl = "/api/v1/models/account";
  await axiosPrivate.post(apiUrl, data);
};

export const updateAccount = async (data: any, id: any): Promise<boolean> => {
  try {
    const result =   await axiosPrivate.put(`/api/v1/models/account/${id}`, {
      nombre: data.name,
      referencia: data.reference,
      descripcion: data.description,
      estatus_id: 1,
      depende_de_lista: data.dependsOnList,
      consolidado: data.consolidated,
    });
    
    if(result){
      return true;
    }else{
      return false;
    }    
  } catch (error) {
    return false;
  }
};

export const deleteAccount = async (id: any): Promise<boolean> => {
  try {
    const result = await axiosPrivate.delete(`/api/v1/models/account/${id}`); console.log(result);
    if(!result){
      return false;
    }
    return true;
  } catch (error) { 
    return false;
  }
};
