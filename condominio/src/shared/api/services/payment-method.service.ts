import { Paginated } from "@/types/types";
import {
  DetailPaymentMethod,
  PaymentMethod,
  RegisterPaymentMethod,
  UpdatedData,
} from "../../models/PaymentMethod";
import { axiosPrivate } from "../axiosPrivate";

export const fetchAllPaymentMethods = async (): Promise<Paginated<any>> => {
  const { data } = await axiosPrivate.get<Paginated<PaymentMethod>>(
    "/api/v1/models/payment-methods?filter=all"
  );

  const page = data.page.map((d: PaymentMethod) => ({
    id: d.id,
    name: d.name,
    description: d.description,
    status: d.status,
  }));

  return { page, total: data.total };
};

export const fetchPaymentMethodsByPartnerId = async (
  id: number
): Promise<any[]> => {
  if (id === 0) {
    return [];
  }

  const { data } = await axiosPrivate.post<PaymentMethod[]>(
    "/api/v1/models/payment-method/partner",
    { associated_id: id }
  );

  return data.map((d: PaymentMethod) => ({
    id: d.id,
    name: d.name,
    description: d.description,
    status: d.status,
  }));
};

export const updatePaymentMethodStatus = async (id: number, status: number) => {
  const result = await axiosPrivate.put("/api/v1/models/payment-method", {
    id: id,
    status_id: status,
  });

  return result?.status === 200;
};

export const updateStatus = async (
  id: number,
  updatedData: UpdatedData,
  type_payment_method: string
): Promise<boolean> => {
  const detail_payment_method: DetailPaymentMethod = {};

  if (updatedData.banco) detail_payment_method.bank = updatedData.banco;
  if (updatedData.cedula) detail_payment_method.dni = updatedData.cedula;
  if (updatedData.Tipo_De_Nacionalidad)
    detail_payment_method.type_dni = updatedData.Tipo_De_Nacionalidad;
  if (updatedData.Email) detail_payment_method.email = updatedData.Email;
  if (updatedData.Telefono) detail_payment_method.phone = updatedData.Telefono;
  if (updatedData.Cuenta) detail_payment_method.account = updatedData.Cuenta;
  if (updatedData.Tipo_De_Cuenta)
    detail_payment_method.account_type = updatedData.Tipo_De_Cuenta;

  const paymentMethodMap: { [key: string]: number } = {
    "Cuenta Bancaria": 1,
    "Pago Movil": 2,
    "Zelle": 4,
  };

  detail_payment_method.type_payment_id = paymentMethodMap[type_payment_method];

  const dataToSend = {
    id: updatedData.id,
    status: updatedData.status,
    name: updatedData.name,
    description: updatedData.description,
    data: detail_payment_method,
  };

  const result = await axiosPrivate.put(
    "/api/v1/models/payment-method",
    dataToSend
  );

  return result?.status === 200;
};

export const updatePaymentMethod = async (body: any): Promise<boolean> => {
  const { data }: any = await axiosPrivate.post(
    "/api/v1/models/payment-method/detail",
    body
  );
  return data.status === 200;
};

export const getPaymentMethodDetails = async (id: number): Promise<any> => {
  const { data }: any = await axiosPrivate.post(
    "/api/v1/models/payment-method/detail",
    {
      id: id,
    }
  );

  if (data.status === 200) {
    return data.data;
  } else {
    return null;
  }
};

export const savePaymentMethod = async (
  body: RegisterPaymentMethod,
  paymentMethods: any[]
): Promise<boolean> => {
  const paymentMethod = paymentMethods.find(
    (method) => method.value === body.paymethod
  );
  const data: any = {
    type_payment_id: body.paymethod,
  };
  if (body.dni) data.dni = body.dni;
  if (body.type_dni) data.type_dni = body.type_dni;
  if (body.bank) data.bank = body.bank;
  if (body.email) data.email = body.email;
  if (body.phone) data.phone = body.phone;
  if (body.account) data.account = String(body.account);
  if (body.name) data.name = body.name;
  if (body.account_type) data.account_type = body.account_type;

  const payload = {
    payment_method: {
      name: body.alias,
      description: body.description,
      status_id: body.status_id ? 1 : 2,
    },
    data: data,
  };

  const response = await axiosPrivate.post(
    "/api/v1/models/payment-method",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.status === 200;
};

export const fetchListPaymentMethods = async (): Promise<string[]> => {
  const { data } = await axiosPrivate.get<string[]>(
    "/api/v1/models/payment-method/way-to-pay"
  );
  return data;
};

//!!Esta función en proxima actualización debe borrarse asi como el LegacyForm ya que no habrá métodos de pago sin detalles ni tipo.
export const updateLegacyPaymentMethod = async (updatedData: any) => {
  try {
      const result = await axiosPrivate.put("/api/v1/models/payment-method", updatedData);
      return result;
  } catch (error) {
      console.error(error);
      return null;
  }
}