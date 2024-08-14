// https://api.betsol.la/api/v1/models/payment-method

import { Payment } from "../../models/Payment";
import { PaymentAcceptedAndRejected } from "../../models/PaymentAcceptedAndRejected";
import { axiosPrivate } from "../axiosPrivate";

export const fetchPayments = async (): Promise<any> => {
  const { data } = await axiosPrivate.get<PaymentAcceptedAndRejected>(
    "/api/v1/models/payment"
  );

  const mapperToPayments = (payments: Payment[]): any[] => {

    const owner = payments.some(r => r.owner);

    return payments.map((d: Payment) => ({
      id: d.id,
      paymentDate: d.fecha_pago,
      associated: owner ? d.beneficiario_asociado?.nombre: d.aportante_asociado?.nombre,
      amount: d.monto,
      observation: d.rechazado ? d.observacion_rechazo : d.observacion,
      rejected: d.rechazado,
      paymentMethod: d.medio_pago?.nombre,
      accountType: d.cuenta?.tipo_cuenta?.nombre,
      owner: d.owner,
    }));
  };

  const dataMappped = {
    pending: mapperToPayments(data.pending),
    rejected: mapperToPayments(data.rejected),
  };

  return dataMappped;
};

export const savePayments = async (data: any): Promise<boolean> => {
  try {
    const result = await axiosPrivate.post("/api/v1/models/payment", {
      beneficiario_asociado_id: data.beneficiaryId,
      medio_pago_id: data.paymentMethodId,
      fecha_pago: data.drawDay,
      monto: data.amount,
      observacion: data.observation,
      documento_numero: data.document,
      cuenta_id: data.accountId,
    });

    if(result){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const rejectPayment = async (data: any): Promise<boolean> => {
  try {
    const result = await axiosPrivate.put(`/api/v1/models/payment/${data.id}`, {
      rechazado: data.rejected,
      observacion: data.description,
    });
    if(result){
      return true;
    }else{
      return false;
    } 
  } catch (error) {
    return false;
  }  
};

export const deletePayment = async (id: number): Promise<boolean> => {
  try {
    const result = await axiosPrivate.delete(`/api/v1/models/payment/${id}`);
    if(result){
      return true;
    }else{
      return false;
    } 
  } catch (error) {
    return false;
  }
};