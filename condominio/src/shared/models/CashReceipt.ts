export interface CashReceiptReport {
  id: number;
  uuid: string;
  transaction_date: string;
  pay_mode: string;
  description: string;
  currency: string;
  total: number;
  reference?: string;
  status?: string;
  type?: string;
  agency?: string;
  username?: string;
}
export interface ConfirmationData {
  name?: string;
  last_name?: string;
  email?: string;
  dni?: string;
  phone_number?: string;
  account?: string;
  transaction_origin?: string;
  reference?: string;
  description?: string;
}

export type CashReceiptRegister = {
  currency_id: number;
  amount: number;
  description: string;
  payment_method_id: number;
  transaction_date: string;
  urls?: string[];
  confirmation_data: ConfirmationData;
}

export type FilterCashReceipt = {
  associate_id?: number;
  agencyId?: number;
  ticketOfficeId?: number;
  payment_method_id?: number;
  reference?: number;
  from_date?: string;
  to_date?: string;
  page: number;
}

export interface CashReceiptPayment {
  id: number;
  name: string;
  description: string;
  abbreviation: string;
  currency: string[];
}

export interface CashReceiptPaymentSelect {
  id: number;
  name: string;
  value: string;
  currency: string[];
  description: string;
  abbreviation: string;
}

export interface CashReceiptUnconfirmedDetails {
  name_agency: string;
  reference: string;
  date: string;
  number_phone: string;
  bank_transamitter: string;
  bank_receiving: string;
  amount: number;
  status: string;
  description: string;
  pay_mode: string;
  dns: string;
  email: string;
  capture: string[];
}

export interface CashReceiptDetails {
  id: number;
  title: string;
  value: string;
}
