import { axiosPrivate } from "../axiosPrivate";

type LoteriaType = {
  id: number, 
  nombre: string
};

export const fetchAllLoterias = async (): Promise<any[]> => {
  const apiUrl = "/api/v1/models/loteria";
  const { data } = await axiosPrivate.get<LoteriaType[]>(apiUrl);

  return data;
};

export const loteriaService = {
  fetchAllLoterias
};


