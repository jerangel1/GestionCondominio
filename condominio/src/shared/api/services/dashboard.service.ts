import { axiosPrivate } from "../axiosPrivate";

export const getAcountPayByPlayers = async () => {
  const apiUrl = "/api/v1/models/admin/cash-receipts/count";
  const result = await axiosPrivate.post(apiUrl, {}); 
  return result.data;
};

export const getAcountPayByAward = async () => {
  try {  
    const { data } =  await axiosPrivate.get("/api/v1/models/admin/expenditure/count"); 
    return data;
  } catch (error) {
    return 0;
  }
};