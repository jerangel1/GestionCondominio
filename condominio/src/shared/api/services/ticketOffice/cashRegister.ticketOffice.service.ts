import { axiosPrivate } from "@/shared/api/axiosPrivate";
import { type Paginated } from "@/types/types";
import { type CashRegisterAdminTicketOfficeTableDataType } from "@/components/ticketOffice/tables/CashRegisterAdminTable.TicketOffice";
import { type CashRegisterTicketOfficeTableDataType } from "@/components/ticketOffice/tables/CashRegisterTable.TicketOffice";
import { TransferResorceIncomeSchemaType } from "@/components/templates/cash-register/TransferIncomeResourceTicketOffice";
import { TransferResourceExpenseSchemaType } from "@/components/templates/cash-register/TransferExpenseResourceTicketOfficer";

const getCashRegisterAdminDatatable = async (data: {
  to_date?: string;
  from_date?: string;
  status_flow_id?: number;
  ticket_office_id?: number;
}) => {
  const apiUrl = "/api/v1/models/agency/cash-register";
  const result = await axiosPrivate.post<
    Paginated<CashRegisterAdminTicketOfficeTableDataType>
  >(apiUrl, data);
  return result.data;
};

const getCashRegisterDatatable = async (data: {
  to_date?: string;
  from_date?: string;
  status_flow_id?: number;
}) => {
  const apiUrl = "/api/v1/models/ticket-office/cash-register/datatable";
  const result = await axiosPrivate.post<
    Paginated<CashRegisterTicketOfficeTableDataType>
  >(apiUrl, data);
  return result.data;
};

const createCashRegisterAgency = async (data: { ticket_office_id: number }) => {
  const apiUrl = "/api/v1/models/agency/cash-register/create";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

const createCashRegister = async (data: { date: Date }) => {
  const apiUrl = "/api/v1/models/ticket-office/cash-register/create";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

const sendCashRegister = async (data: { uuid: string }) => {
  const apiUrl = "/api/v1/models/ticket-office/cash-register/send";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

const getTicketOfficesOfAgency = async () => {
  const apiUrl = "/api/v1/models/agency/cash-register/ticket-offices";
  const result = await axiosPrivate.get<{ id: number }[]>(apiUrl);
  return result.data;
};

const resetCashRegister = async (data: { uuid: string }) => {
  const apiUrl = "/api/v1/models/cash-register/reset";
  const result = await axiosPrivate.post<{ uuid: string }>(apiUrl, data);
  return result.data;
};

const approveCashRegister = async (data: { uuid: string }) => {
  const apiUrl = "/api/v1/models/agency/cash-register/approve";
  const result = await axiosPrivate.post<{ uuid: string }>(apiUrl, data);
  return result.data;
};

const transferIncomeBetweenCashRegistersTicketOfficer = async (
  data: TransferResorceIncomeSchemaType
) => {
  const apiUrl = "/api/v1/models/ticket-office/cash-register/transfer-income";
  const result = await axiosPrivate.post<{ uuid: string }>(apiUrl, data);
  return result.data;
};

const transferExpenseBetweenCashRegistersTicketOfficer = async (
  data: TransferResourceExpenseSchemaType
) => {
  const apiUrl = "/api/v1/models/ticket-office/cash-register/transfer-expense";
  const result = await axiosPrivate.post<{ uuid: string }>(apiUrl, data);
  return result.data;
};

type CashRegisterExpensesType = {
  id: number;
  metodo_pago_id: number;
  moneda_simbolo: string;
  taquilla_id: number;
  total_efectivo: number;
  imagenes: null;
  fecha_creacion: string;
  descripcion: string;
  tipo_egreso_id: number;
  total_montos: number;
  flujo_estatus_id: number;
  arqueo_caja_id: null;
};

const getCashRegisterExpenses = async (data: {
  cash_register_id: number;
  egress_type_code?: string;
}) => {
  const apiUrl = "/api/v1/models/ticket-office/cash-register/expenses";
  const result = await axiosPrivate.post<CashRegisterExpensesType[]>(
    apiUrl,
    data
  );
  return result.data;
};

type CashRegisterIncomesType = {
  id: number;
  fecha_creacion: string;
  descripcion: string;
  monto: number;
  moneda_simbolo: string;
  metodo_pago_nombre: string;
};

const getCashRegisterIncomes = async (data: {
  cash_register_id: number;
  payment_method_code?: string;
}) => {
  const apiUrl = "/api/v1/models/ticket-office/cash-register/incomes";
  const result = await axiosPrivate.post<CashRegisterIncomesType[]>(
    apiUrl,
    data
  );
  return result.data;
};

type DrawedCashRegisters = {
  id: number;
  fecha_creacion: string;
};

const getDrawedCashRegisters = async (data: { cash_register_id: number }) => {
  const apiUrl = "/api/v1/models/ticket-office/cash-register/drawed";
  const result = await axiosPrivate.post<DrawedCashRegisters[]>(apiUrl, data);
  return result.data;
};

type PendingCashRegisters = {
  id: number;
  fecha_creacion: string;
  taquilla_id: number;
  nombre: string;
};

const getPendingCashRegisters = async (data: {
  cash_register_id: number;
  ticket_office_id: number;
  cash_register_status: string;
}) => {
  const apiUrl = "/api/v1/models/agency/cash-register/pending";
  const result = await axiosPrivate.post<PendingCashRegisters[]>(apiUrl, data);
  return result.data;
};

const transferIncomeBetweenCashRegistersAgency = async (
  data: TransferResorceIncomeSchemaType
) => {
  const apiUrl = "/api/v1/models/agency/cash-register/transfer-income";
  const result = await axiosPrivate.post<{ uuid: string }>(apiUrl, data);
  return result.data;
};

const transferExpenseBetweenCashRegistersAgency = async (
  data: TransferResourceExpenseSchemaType
) => {
  const apiUrl = "/api/v1/models/agency/cash-register/transfer-expense";
  const result = await axiosPrivate.post<{ uuid: string }>(apiUrl, data);
  return result.data;
};

export const cashRegister = {
  getCashRegisterDatatable,
  createCashRegisterAgency,
  createCashRegister,
  sendCashRegister,
  getTicketOfficesOfAgency,
  getCashRegisterAdminDatatable,
  resetCashRegister,
  approveCashRegister,
  getCashRegisterExpenses,
  getCashRegisterIncomes,
  transferIncomeBetweenCashRegistersTicketOfficer,
  transferExpenseBetweenCashRegistersTicketOfficer,
  transferIncomeBetweenCashRegistersAgency,
  transferExpenseBetweenCashRegistersAgency,
  getDrawedCashRegisters,
  getPendingCashRegisters,
};
