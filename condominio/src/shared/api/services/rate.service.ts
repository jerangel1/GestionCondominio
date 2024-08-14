import { axiosPrivate } from "../axiosPrivate";

export type RateType = {
  id: number;
  uuid: string;
  moneda_id: number;
  valor: number;
  fecha_tasa: string;
  valor_tasa: number;
  valorInvertido?: number;
};

const fetchCurrentRate = async (data: { currency_id: number }): Promise<RateType> => {
  const apiUrl = "/api/v1/models/rate";
  const response = await axiosPrivate.get<RateType>(apiUrl, {
    params: {
      moneda_id: data.currency_id,
    },
  });

  return {
    ...response.data,
    valorInvertido: response.data.valor === 0 ? 0 : 1 / response.data.valor,
  };
};
export const rate = {
  fetchCurrentRate
}; 
