import axios from "axios";

export type DollarResponse = {
  datetime: {
    date: string;
    time: string;
  };
  monitors: {
    [key: string]: {
      change: number;
      color: string;
      image: string | null;
      last_update: string;
      percent: number;
      price: number;
      price_old: number;
      symbol: string;
      title: string;
    };
  };
};
export const fetchDollarData = async () => {
  const response = await axios.get(
    "https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv"
  );
  return response.data;
};
