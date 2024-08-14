import axios from "axios";

interface DailyRates {
  monitors: {
    usd: {
      price: number;
    };
    eur: {
      price: number;
    };
  };
  datetime: {
    date: string;
  };
}

export const fecthDailyRates = async (): Promise<DailyRates> => {
  const { data } = await axios.get<DailyRates>("https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv");
  return data;
};