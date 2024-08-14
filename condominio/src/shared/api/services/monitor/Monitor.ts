import { axiosPrivate } from "@/shared/api/axiosPrivate";
import { useAuth } from "@/hooks/useAuth";

export function useFetchBetData() {
  const { user } = useAuth();
const fetchBetData = async (date: string) => {
    if (!user) {
      throw new Error("User is not authenticated");
    }

    try {
      const response = await axiosPrivate.post("/bets/monitor", { bets_date: date });
      if (response.status !== 200) {
        throw new Error("Error al cargar los datos: " + response.status);
      }
      const jsonData = response.data;
      if (!Array.isArray(jsonData)) {
        throw new Error("Los datos recibidos no son un array");
      }
      return jsonData;
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      throw error;
    }
  };

  return fetchBetData;
}

export interface Bet {
  number_animal: string;
  total_tickets: number;
  amount: number;
  possible_prize: number;
  distribution: number;
}

export interface BetData {
  [key: string]: Bet[];
}