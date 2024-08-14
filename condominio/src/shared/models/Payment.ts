import { Account } from "./Account";

export interface Payment {
  cuenta: Account;
  fecha_registro: string;
  observacion_rechazo: string;
  aportante_asociado: AportanteAsociado;
  documento_numero: string;
  monto: number;
  id: number;
  rechazado: boolean;
  fecha_pago: string;
  observacion: string;
  beneficiario_asociado: BeneficiarioAsociado;
  medio_pago: MedioPago;
  owner: boolean;
}

export interface AportanteAsociado {
  nombre: string;
  id: number;
}

export interface BeneficiarioAsociado {
  nombre: string;
  id: number;
}

export interface MedioPago {
  id: number
  nombre: string
  descripcion: string
}
