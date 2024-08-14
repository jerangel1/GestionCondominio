import { NewFundSchemaType } from "@/components/templates/cash-management/CashFund";
import { axiosPrivate } from "@/shared/api/axiosPrivate";

export type CashHistoryItem = {
  id: number;
  fecha_creacion: string;
  saldo: number;
  saldo_inicio: number;
  abierto: boolean;
};

const cashFundHistory = async () => {
  const apiUrl = "/api/v1/models/cash-fund/ticket-office/history";
  const result = await axiosPrivate.post<CashHistoryItem[]>(apiUrl, {});
  return result.data;
};

export type CashFundHistoryDetail = {
  fondo_ingreso: number;
  fondo_egreso: number;
  fecha_creacion: string;
};

const cashFundHistoryDetail = async (data: { id: number }) => {
  const apiUrl = "/api/v1/models/cash-fund/ticket-office/detail";
  const result = await axiosPrivate.post<CashFundHistoryDetail[]>(apiUrl, data);
  return result.data;
};

const createCashFund = async (data: NewFundSchemaType) => {
  const apiUrl = "/api/v1/models/cash-fund";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

const createCashFundById = async (data: { id: number, amount: number}) => {
  const apiUrl = "/api/v1/models/cash-fund/add_by_id";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

export const cashFund = {
  cashFundHistory,
  cashFundHistoryDetail,
  createCashFund,
  createCashFundById
};
