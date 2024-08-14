import { axiosPrivate } from "../axiosPrivate";

export const fetchCashRegisteredPayMobileTransactions = async () => {
  try {  
    const { data } =  await axiosPrivate.get("/api/v1/models/expenditure/transaction-to-be-confirmed"); 
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchCashRegisteredPayMobileTransactionsDetails = async (id: string) => {
  try {  
    const body = {
      "uuid": id,
    };
    const { data } =  await axiosPrivate.post("/api/v1/models/expenditure/transaction/detail", body); 
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchCashRegisteredTransactionsRejected = async () => {
  try {  
    const { data } =  await axiosPrivate.get("/api/v1/models/expenditure/transaction/refused"); 
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchCashRegisteredTransactionsRejectedDetails = async (id: string) => {
  try {  
    const body = {
      "uuid": id,
    };
    const { data } =  await axiosPrivate.post("/api/v1/models/expenditure/transaction/detail", body); 
    return data;
  } catch (error) {
    return [];
  }
};

export const approveCashRegisterTransaction = async (data:{
  id: string, 
  description: string,  
}) => {
  const apiUrl = "/api/v1/models/expenditure/transaction/status";
  await axiosPrivate.put(apiUrl, data);
};