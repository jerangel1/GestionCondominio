export type PaymentMethod = {
  map: (arg0: (paymentMethod: { id: number; }) => { id: number; } | { status: number; id: number; }) => unknown;
  nombre: string;
  id: number;
  description: string;
  name: string;
  status: number;
  type_payment_method: string;
};

export interface ListPaymentsMethods {
  way_to_pay: string[];
}

export interface RegisterPaymentMethod {
  type_payment_id: number | string;
  alias?: string;
  description: string;
  name: string;
  status_id: number;
  paymethod: string;
  bank?: string;
  account_type?: string;
  type_dni?: string;
  dni?: string;
  account?: string;
  codePhone?: string;
  phone?: string;
  email?: string;
  typeBankAccount?: string;
  estatus?: number;
}

export type UpdatedData = {
  banco?: string;
  cedula?: string;
  Tipo_De_Nacionalidad?: string;
  Email?: string;
  Telefono?: string;
  Cuenta?: string;
  Tipo_De_Cuenta?: string;
  id: number;
  status: number;
  name?: string;
  description?: string;
};

export type DetailPaymentMethod = {
  bank?: string;
  dni?: string;
  type_dni?: string;
  email?: string;
  phone?: string;
  account?: string;
  account_type?: string;
  type_payment_id?: number;
};