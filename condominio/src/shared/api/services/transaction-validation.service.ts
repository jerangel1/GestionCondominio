import { axiosPrivate } from "../axiosPrivate";

export type TransactionFilters = {
  payment_method_id?: number | null;
  from_date?: string | null;
  to_date?: string | null;
  partner_id?: number | null;
  agency_id?: number | null;
  category?: string | null;
  page?: number
};

export const fetchAllTransactions = async (data: TransactionFilters) => {
  const apiUrl = "/api/v1/models/cash-register/transaction-earring";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

const fetchAllTransactionsHistory = async (data: TransactionFilters) => {
  const apiUrl = "/api/v1/models/cash-register/transactions/history";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
}

type PaymentMethodsTransactions = {
  id: number,
  nombre: string
}

export const fetchTransactionsPaymentMethods = async () => {
  const apiUrl = "/api/v1/models/cash-register/payment-method/transactions";
  const result = await axiosPrivate.post<PaymentMethodsTransactions[]>(apiUrl, {});
  return result.data;
};

export const transactions = {
  fetchAllTransactions,
  fetchTransactionsPaymentMethods,
  fetchAllTransactionsHistory
};
