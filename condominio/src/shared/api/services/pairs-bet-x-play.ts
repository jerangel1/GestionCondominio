import { axiosPrivate } from "../axiosPrivate";

type PairType = {
  tipo_apuesta_id:number, 
  tipo_pago_id: number,
  proporcion: number,
  id: number
}

export const fetchAllPairs = async (): Promise<PairType[]> => {
  const apiUrl = "/api/v1/models/admin/administrative/banking/bet-types-pay-types";
  const { data } = await axiosPrivate.get<PairType[]>(apiUrl);

  return data.map(pair => {
    return {
      id: 0,
      proporcion: 0,
      tipo_apuesta_id: pair.tipo_apuesta_id,
      tipo_pago_id: pair.tipo_pago_id
    };
  });
};

export const pairsPlaysAndBetsService = {
  fetchAllPairs,
};
