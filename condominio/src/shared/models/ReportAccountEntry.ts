import { Account } from "./Account";
import { Partner } from "./Partner";

//!! LEGACY TYPE
export interface ReportAccountEntry {
  id: number
  observacion: string
  cuenta: Account
  version: number
  fecha_asiento: string
  tipo: number
  asiento_automatico: any
  fecha_registro: string
  monto: number
  asociado: Partner
}


// ** New type MovementReport
export type MovementReport = {
  id: number;
  partner_id: number;
  associate: string;
  date: string;
  amount: number;
  balance: number;
  contribuidor: string;
  payment_method: string;
  concept: string;
  account_name: string;
};

