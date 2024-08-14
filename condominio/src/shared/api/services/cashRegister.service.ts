import { axiosPrivate } from "../axiosPrivate";
import type {
  PayMethod,
  PayMethodCashRegister,
} from "../../models/CashRegister";
import { CashRegisterSchemaType } from "@/pages/ticket-office/cash-register/[uuid]";

export const getPayMethodCashRegister = async () => {
  const apiUrl = "/api/v1/models/cash-register/payment-method/cash-register";
  const response = await axiosPrivate.get<PayMethodCashRegister[]>(apiUrl);
  return response.data;
};

const getPaymentMethodExpenditure = async (): Promise<PayMethod[]> => {
  const apiUrl = "/api/v1/models/cash-register/payment-method/expenditure";
  const { data } = await axiosPrivate.get(apiUrl);
  return data;
};

const getExpedituresTotalExpenses = async (data: {
  ticket_office_id: number;
  currency: string;
}) => {
  const apiUrl = "/api/v1/models/expenditure/expenses";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

const resetCashRegister = async (data: { uuid: string }) => {
  const apiUrl = "/api/v1/models/cash-register/reset";
  await axiosPrivate.post(apiUrl, data);
};

const updateCashRegister = async (
  data: CashRegisterSchemaType & { id: number }
) => {
  const apiUrl = "/api/v1/models/cash-register/update";
  await axiosPrivate.post(apiUrl, data);
};

export type CashRegisterType = 
 CashRegisterSchemaType & {
  id: number,
  taquilla_id: number,
  flujo_estatus_nombre: string,
  flujo_estatus_codigo: string,
  fecha_creacion: string
 };

const getCashRegister = async (data: { uuid: string }) => {
  const apiUrl = "/api/v1/models/cash-register";
  const result = await axiosPrivate.post<CashRegisterType>(apiUrl, data);
  return result.data;
};

export const general = {
  resetCashRegister,
  updateCashRegister,
  getCashRegister,
};

export const cashRegister = {
  getExpedituresTotalExpenses,
  getPayMethodCashRegister,
  getPaymentMethodExpenditure,
  getCashRegister,
  general,
};
