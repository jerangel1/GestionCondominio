import { FilterCashReceipt } from "@/shared/models/CashReceipt";
import { axiosPrivate } from "../axiosPrivate";
import { PaymentMethod } from "./expenditure.service";
import {
  NewIncomeSchemaType,
  NewIncomeSchemaAgencyType,
} from "@/components/templates/cash-management/newIncomeSchema";

export type PostListCashReceipt = {
  id: number;
  transaction_date: string;
  total: number | null;
  currency: string;
  pay_mode: string;
  status: string;
  description: string;
  agency: string;
  username: string;
};

export const getListCashReceiptResumen = async (
  body: PostListCashReceipt[]
) => {
  try {
    const { data } = await axiosPrivate.post(
      "/api/v1/models/cash-receipts",
      body
    );
    return data;
  } catch (error) {
    return [];
  }
};

export const saveCashReceiptRegister = async (body: NewIncomeSchemaType) => {
  const apiUrl = "/api/v1/models/cash-receipts/save";
  const { data } = await axiosPrivate.post(apiUrl, {
    ...body,
  });

  return data;
};

export const saveCashReceiptRegisterAgency = async (
  body: NewIncomeSchemaAgencyType
) => {
  const apiUrl = "/api/v1/models/agency/cash-receipts/save";
  const { data } = await axiosPrivate.post<PostListCashReceipt>(apiUrl, body);
  return data;
};

export const verifyNumberReference = async (reference: string) => {
  try {
    const body = { reference };
    const { data } = await axiosPrivate.post(
      "/api/v1/models/cash-receipts/verify",
      body
    );
    return data;
  } catch (error) {
    return false;
  }
};

export const filterCashReceipt = async (data: FilterCashReceipt) => {
  const apiUrl = "/api/v1/models/ticket-office/cash-receipts";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

export const getListCashReceiptPayment = async () => {
  const apiUrl = "/api/v1/models/cash-register/payment-method/income";
  const result = await axiosPrivate.get<PaymentMethod[]>(apiUrl);
  return result.data;
};

export const getListCashReceiptPaymentUncorfirmed = async () => {
  try {
    const { data } = await axiosPrivate.get(
      "/api/v1/models/cash-receipts/income/unconfirmed-list"
    );
    return data;
  } catch (error) {
    return [];
  }
};

type cashIncome = {
  id: number;
  monto: number;
  fecha_transaccion: string;
  data_confirmacion: {
    dni?: string;
    phone_number?: string;
    transaction_origin?: string;
  };
  origen_transaccion: string;
  data_intercambio: {
    cantidad?: number,
    tasa?: number
  },
  estatus: string;
  taquilla_id: number;
  referencia?: string;
  metodo_pago: string;
  descripcion: string;
  nombre_agencia: string;
  imagenes: string[];
};

type CashIncomeAdmin = {
  id: number;
  monto: number;
  fecha_transaccion: string;
  data_confirmacion: {
    dni?: string;
    phone_number?: string;
    transaction_origin?: string;
  };
  data_intercambio: {
    cantidad?: number,
    tasa?: number
  },
  origen_transaccion: string;
  estatus: string;
  taquilla_id: number;
  referencia?: string;
  metodo_pago: string;
  descripcion: string;
  nombre_agencia: string;
  imagenes: string[];
};

export const getCashReceiptDetail = async (data: { id: number }) => {
  const result = await axiosPrivate.post<cashIncome>(
    "/api/v1/models/cash-receipts/detail",
    data
  );
  return result.data;
};

export const getCashReceiptDetailAdmin = async (data: { id: number }) => {
  const apiUrl = "/api/v1/models/admin/cash-receipts/detail";
  const result = await axiosPrivate.post<CashIncomeAdmin>(apiUrl, data);
  return result.data;
};

export type RejectedTransaction = {
  transaction_date: string;
  agency: string;
  type: string;
  description: string;
  status: string;
  currency: string;
  total: number;
  ticket_office_id: number;
  agency_id: number;
  associate_id: number;
  status_id: number;
  date_start: string;
  date_end: string;
  payment_method_id: number;
};
export const fetchCashReceiptPaymentRejected = async (params: {
  payment_method_id: number | undefined;
  date_start: string | undefined;
  date_end: string | undefined;
  status_id: number | undefined;
  associate_id: number | undefined;
  agency_id: number | undefined;
  ticket_office_id: number | undefined;
}): Promise<RejectedTransaction[]> => {
  try {
    const { data } = await axiosPrivate.post<[]>(
      "/api/v1/models/cash-register/transaction",
      params
    );
    return data;
  } catch (error) {
    return [];
  }
};

export const getListCashReceiptPaymentRejected = async () => {
  try {
    const { data } = await axiosPrivate.get(
      "/api/v1/models/cash-receipts/income/refused"
    );
    return data;
  } catch (error) {
    return [];
  }
};

export const getListCashReceiptPaymentRejectedDetailt = async () => {
  try {
    const { data } = await axiosPrivate.get(
      "/api/v1/models/cash-receipts/income/refused"
    );
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchCashReceipt = async ({
  id,
  description,
}: {
  id: number;
  description: string;
}) => {
  const body = { id, description };
  const { data } = await axiosPrivate.put(
    "/api/v1/models/cash-receipts/status",
    body
  );
  return data;
};

export const fetchActionReceipt = async (uuid: string) => {
  try {
    const config = { data: { uuid } };
    const { data } = await axiosPrivate.delete(
      "/api/v1/models/cash-receipts/status",
      config
    );
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchActionPayMobileToBeConfirm = async (
  uuid: string,
  status: string,
  reference: string,
  description: string
) => {
  try {
    const body = { uuid, status, reference, description };
    const { data } = await axiosPrivate.put(
      "/api/v1/models/expenditure/transaction/status",
      body
    );
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchCashReceiptPayment = async () => {
  try {
    const { data } = await axiosPrivate.get(
      "/api/v1/models/cash-register/transaction"
    );
    return data;
  } catch (error) {
    return [];
  }
};
