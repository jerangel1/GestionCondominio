import { axiosPrivate } from "../axiosPrivate";
import { Paginated } from "@/types/types";
import { ExpensesDataTableTicketOfficeType } from "@/components/ticketOffice/tables/OutcomesTable.TicketOffice";
import {
  NewExpenseAdminSchemaType,
  NewExpenseSchemaBaseType,
} from "@/components/templates/cash-register-outflow/NewExpenseSchema";
import { ExpensesDataTableAdminTicketOfficeType } from "@/components/ticketOffice/tables/OutcomesAdminTable.TicketOffice";

const getPendingPaymentsByAward = async () => {
  const apiUrl = "/api/v1/models/expenditure/transaction/count";
  const result = await axiosPrivate.get(apiUrl);
  return result.data;
};
type ExpenseDetail = {
  name: string;
  cantidad: number;
  amount: number;
};

type OperatingExpense = {
  title: string;
  expense_detail: ExpenseDetail[];
};

type PaymentData = {
  bank: string;
  account: string;
  number_phone: string;
  email: string;
  identification: string;
};

type EgressTransaction = {
  amount: number;
  description: string;
  payment_data: PaymentData;
};

const saveExpenditureExpense = async (data: NewExpenseSchemaBaseType) => {
  const apiUrl = "/api/v1/models/expenditure/save-expense";
  const result = await axiosPrivate.post<ExpensesDataTableTicketOfficeType>(apiUrl, data);
  return result.data;
};

const saveExpenditureAgency = async (data: NewExpenseAdminSchemaType) => {
  const apiUrl = "/api/v1/models/agency/expenditure/save-expense";
  const result = await axiosPrivate.post<ExpensesDataTableAdminTicketOfficeType>(apiUrl, data);
  return result.data;
};

export type ExpenseType = {
  editable: boolean;
  nombre: string;
  codigo: string;
  id: number;
};

const getExpensesTypes = async () => {
  const apiUrl = "/api/v1/models/expenditures/types";
  const result = await axiosPrivate.post<ExpenseType[]>(apiUrl, {});
  return result.data;
};

export const getAllExpenditures = async (data: {
  status_id?: number;
  type_expense_id?: number;
  payment_method_id?: number;
  ticket_office_ids?: number[];
  date_start?: string;
  date_end?: string;
  page: number;
}) => {
  const apiUrl = "/api/v1/models/agency/expenditures";
  const result = await axiosPrivate.post<
    Paginated<ExpensesDataTableAdminTicketOfficeType>
  >(apiUrl, data);
  return result.data;
};

export const getAllExpendituresTicketOffice = async (data: {
  status_id?: number[];
  expense_type_id?: number;
  payment_method_id?: number[];
  to_date?: string;
  from_date?: string;
  page: number;
}) => {
  const apiUrl = "/api/v1/models/ticket-office/expenditures";
  const result = await axiosPrivate.post<
    Paginated<ExpensesDataTableTicketOfficeType>
  >(apiUrl, data);
  return result.data;
};

export type PaymentMethod = {
  id: number;
  name: string;
  abbreviation: string;
  currency: string[];
};

const getPaymentMethodsExpenditures = async () => {
  const apiUrl = "/api/v1/models/cash-register/payment-method/expenditure";
  const result = await axiosPrivate.get<PaymentMethod[]>(apiUrl);
  return result.data;
};

export type OperativeExpense = {
  egreso_caja_id: number;
  nombre: string;
  id: number;
  monto: number;
  cantidad: number;
};

export type ExpenditureDetailType = {
  agencia_nombre: string;
  prize_data?: {
    fecha_premio: string;
    numero_ticket: number;
    serie_ticket: string;
    sistema_venta_nombre: string;
  };
  fecha_creacion: string;
  id: number;
  payment_method: string;
  pagos: {
    monto: number;
    estatus: string;
    metodo_pago: string;
    confirmacion?: {
      bank: string;
      identification: string;
      number_phone: string;
      email: string;
    };
  }[];
  operative_expenses: OperativeExpense[];
  status: string;
  total_montos: number;
  monto_efectivo: number;
  monto_transaccion: number;
  monto_egreso: number;
  descripcion: string;
  total_cash: number;
  transaccion_estatus: string;
  transaccion_metodo_pago: "string";
  type_expenditure: string;
  imagenes?: string[];
  tipo_egreso_id: number;
};

const getExpenditureDetail = async (data: {
  id: number;
  expense_type_code: string;
}) => {
  const apiUrl = "/api/v1/models/expenditure-detail";
  const result = await axiosPrivate.post<ExpenditureDetailType>(apiUrl, data);
  return result.data;
};

const getExpenditureDetailAdmin = async (data: {
  id: number;
  expense_type_code: string;
}) => {
  const apiUrl = "/api/v1/models/admin/expenditure/detail";
  const result = await axiosPrivate.post<ExpenditureDetailType>(apiUrl, data);
  return result.data;
};

export type ExpenditureResponse = {
  description: string;
  id: number;
  reference: string;
};

const approveExpenditure = async (data: {
  id: number;
}): Promise<ExpenditureResponse> => {
  const apiUrl = "/api/v1/models/admin/expenditure/approved";
  const result = await axiosPrivate.put<ExpenditureResponse>(apiUrl, data);
  return result.data;
};

const refuseExpenditure = async (data: {
  id: number;
}): Promise<ExpenditureResponse> => {
  const apiUrl = "/api/v1/models/admin/expenditure/refuse";
  const result = await axiosPrivate.put<ExpenditureResponse>(apiUrl, data);
  return result.data;
};

const approveIncome = async (data: {
  id: number;
  status_id: number;
  description?: string;
}) => {
  const apiUrl = "/api/v1/models/admin/cash-receipts/status";
  const result = await axiosPrivate.put(apiUrl, data);
  return result.data;
};

export const getExpenditureTypes = async (data: { id: number }) => {
  const apiUrl = "/api/v1/models/expenditures-type";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

export const getCurrentCashFund = async () => {
  const apiUrl = "/api/v1/models/cash-fund/current";
  const result = await axiosPrivate.post(apiUrl, {});
  return result.data;
};

export const expenditure = {
  getPendingPaymentsByAward,
  saveExpenditureExpense,
  saveExpenditureAgency,
  getPaymentMethodsExpenditures,
  getAllExpendituresTicketOffice,
  getExpenditureDetailAdmin,
  getExpenditureDetail,
  getExpensesTypes,
  getExpenditureTypes,
  getAllExpenditures,
  approveExpenditure,
  refuseExpenditure,
  approveIncome,
  getCurrentCashFund,
};
