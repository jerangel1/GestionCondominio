import { type PollaPublicResults } from "@/shared/models/Polla";
import { axiosPrivate } from "../axiosPrivate";
// import { axiosPublic } from "../axiosPublic";
import axios from "axios";
import * as z from "zod";
import type {
  TicketPollaData,
  NewPollaTicketType,
  PollaDrawType,
  TicketPollaTableData,
} from "@components/NewTicketForm";
import { type DailyJackpotTableDataType } from "@/pages/admin/game-management/polla/daily-jackpots";
import { type WeeklyJackpotsTableDataType } from "@/pages/admin/game-management/polla/weekly-jackpots";
import { PrizePollaTableDataType } from "@/components/tables/PrizesTable";

const fetchAllPollaTickets = async (data: {
  date?: string;
  status?: number[];
  page_size: number;
  cursor: number;
}): Promise<{
  page: TicketPollaTableData[];
  total: number;
}> => {
  const apiUrl = "/api/v1/models/draws/polla/tickets";
  const { data: TicketPollaTableData } = await axiosPrivate.post<{
    page: TicketPollaTableData[];
    total: number;
  }>(apiUrl, data);
  return TicketPollaTableData;
};

const anullPollaTicket = async (data: { id: number }): Promise<void> => {
  const apiUrl = "/api/v1/models/draws/polla/tickets/anull";
  await axiosPrivate.put(apiUrl, data);
};

const consultPollaTicketBySerial = async (data: {
  serial: string;
}): Promise<TicketPollaData> => {
  const apiUrl = "/api/v1/models/draws/polla/tickets/consult";
  const { data: TicketPollaData } = await axiosPrivate.post(apiUrl, data);
  return TicketPollaData;
};

const registerNewPollaTicket = async (
  data: NewPollaTicketType
): Promise<TicketPollaData> => {
  const apiUrl = "/api/v1/models/draws/polla/tickets/register";
  const { data: TicketData } = await axiosPrivate.post<TicketPollaData>(
    apiUrl,
    data
  );
  return TicketData;
};

const getPollaDrawTypes = async (): Promise<PollaDrawType[]> => {
  const apiUrl = "/api/v1/models/draws/polla/types";
  const { data } = await axiosPrivate.get<PollaDrawType[]>(apiUrl);
  return data;
};

const getPublicResults = async (data: {
  date: string;
  "polla-type": number;
}): Promise<PollaPublicResults[]> => {
  const apiUrl = "/api/v1/models/draws/polla/public/results";
  axios.defaults.baseURL = "https:/apistaging.betsol.la";
  const result = await axios.post<PollaPublicResults[]>(apiUrl, data);
  return result.data;
};

const getPublicBets = async (data: {
  date: string | undefined;
  "polla-type": number;
  page_size: number;
  cursor: number;
}): Promise<{
  page: TicketPollaTableData[];
  total_rows: number;
}> => {
  const apiUrl = "/api/v1/models/draws/polla/public/bets";
  axios.defaults.baseURL = "https:/apistaging.betsol.la";
  const result = await axios.post<{
    page: TicketPollaTableData[];
    total_rows: number;
  }>(apiUrl, data);
  return result.data;
};

const getPublicJackpots = async (data: {
  date: string;
  "polla-type": number;
}): Promise<
  {
    id: string;
    amount: number;
  }[]
> => {
  const apiUrl = "/api/v1/models/draws/polla/public/jackpots";
  axios.defaults.baseURL = "https:/apistaging.betsol.la";
  const result = await axios.post<
    {
      id: string;
      amount: number;
    }[]
  >(apiUrl, data);
  return result.data;
};

const getWeeklyJackpots = async (data: {
  page_size: number;
  cursor: number;
  polla_type: number;
  start_date: string | undefined;
  end_date: string | undefined;
}): Promise<{
  page: WeeklyJackpotsTableDataType[];
  total: number;
}> => {
  const apiUrl = "/api/v1/models/draws/polla/jackpots/weekly";
  const result = await axios.post<{
    page: WeeklyJackpotsTableDataType[];
    total: number;
  }>(apiUrl, data);

  return result.data;
};

const getDailyJackpots = async (data: {
  page_size: number;
  cursor: number;
  polla_type: number;
  start_date: string | undefined;
  end_date: string | undefined;
}): Promise<{
  page: DailyJackpotTableDataType[];
  total: number;
}> => {
  const apiUrl = "/api/v1/models/draws/polla/jackpots/daily";
  const result = await axios.post<{
    page: DailyJackpotTableDataType[];
    total: number;
  }>(apiUrl, data);

  return result.data;
};

const getDailyJackpotsSummary = async (data: {
  polla_type: number;
  fecha_inicio: string;
  fecha_cierre: string;
}): Promise<any> => {
  const apiUrl = "/api/v1/models/draws/polla/jackpots/daily/summary";
  const result = await axios.post<any>(apiUrl, data);

  return result.data;
};

const getWeeklyJackpotsSummary = async (data: {
  polla_type: number;
  fecha_inicio: string;
  fecha_cierre: string;
}): Promise<any> => {
  const apiUrl = "/api/v1/models/draws/polla/jackpots/weekly/summary";
  const result = await axios.post<any>(apiUrl, data);

  return result.data;
};

export const payDailyJackpotSchema = z.object({
  primer_acu_abono: z.number().optional().default(0),
  segundo_acu_abono: z.number().optional().default(0),
  pote_diario_id: z.number(),
  tipo: z.enum(["INGRESO", "EGRESO"]),
});

export type PayDailyJackpotSchema = z.infer<typeof payDailyJackpotSchema>;

export const payWeeklyJackpotSchema = z.object({
  monto_acu_abono: z.number(),
  pote_semanal_id: z.number(),
  tipo: z.enum(["INGRESO", "EGRESO"]),
});

export type PayWeeklyJackpotSchema = z.infer<typeof payWeeklyJackpotSchema>;

const payDailyJackpot = async (data: PayDailyJackpotSchema): Promise<void> => {
  const apiUrl = "/api/v1/models/draws/polla/jackpots/daily/payment";
  await axios.post(apiUrl, data);
};

const payWeeklyJackpot = async (
  data: PayWeeklyJackpotSchema
): Promise<void> => {
  const apiUrl = "/api/v1/models/draws/polla/jackpots/weekly/payment";
  await axios.post(apiUrl, data);
};

const getCurrentWeeklyJackpot = async (data:{
  polla_type: number
}): Promise<{
  id: number,
  abonos: {
    monto_acu_abono: number,
    tiempo_abono: string,
    tipo: "INGRESO" | "EGRESO"
  }[]
}> => {
  const apiUrl = "/api/v1/models/draws/polla/jackpots/weekly/current";
  const response = await axios.post(apiUrl, data);

  return response.data;
};

const getCurrentDailyJackpot = async (data:{
  polla_type: number
}): Promise<{
  id: number,
  abonos: {
    abonado_primer: number,
    abonado_segundo: number,
    tiempo_abono: string,
    tipo: "INGRESO" | "EGRESO"
  }[]
}> => {
  const apiUrl = "/api/v1/models/draws/polla/jackpots/daily/current";
  const response = await axios.post(apiUrl, data);

  return response.data;
};

const getPollaPrizes = async (data:{
  page_size: number,
  cursor: number,
  date?: string,
}): Promise<{
  page: PrizePollaTableDataType[];
  total_rows: number;
}> => {
  const apiUrl = "/api/v1/models/ticket-office/draws/polla/prizes";
  const response = await axios.post(apiUrl, data);

  return response.data;
};

type PollaPrize = { 
  id: number, 
  fecha: number,
  cliente_nombre: string,
  cliente_apellido: string,
  cliente_cedula: string, 
  cliente_telefono: string,
  agencia_nombre: string,
  estatus_ticket_nombre: string,
  total_monto_premio: number,
  apuestas: {
    monto_premio: number,
    numeros:{[key:string]:number},
    ganadr: boolean,
    monto_premio_diario: number,
    monto_premio_semanal: number,
    sorteo_nombre: string,
  }[]
}

const consultPollaPrizes = async (data:{
  ticket_id: number
}): Promise<PollaPrize> => {
  const apiUrl = "/api/v1/models/ticket-office/draws/polla/prizes/consult";
  const response = await axios.post(apiUrl, data);

  return response.data;
};

const rewardPollaPrize = async (data:{
  ticket_id: number
}): Promise<void> => {
  const apiUrl = "/api/v1/models/ticket-office/draws/polla/prizes/reward";
  await axios.post(apiUrl, data);
};


export const polla = {
  fetchAllPollaTickets,
  consultPollaTicketBySerial,
  registerNewPollaTicket,
  getPollaDrawTypes,
  getPublicJackpots,
  anullPollaTicket,
  getPublicResults,
  getPublicBets,
  payWeeklyJackpot,
  payDailyJackpot,
  getWeeklyJackpotsSummary,
  getDailyJackpotsSummary,
  getDailyJackpots,
  getWeeklyJackpots,
  getCurrentWeeklyJackpot,
  getCurrentDailyJackpot,
  rewardPollaPrize,
  consultPollaPrizes,
  getPollaPrizes
};
