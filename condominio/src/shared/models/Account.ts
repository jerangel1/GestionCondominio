import { AccountType } from "./AccountType";
import { Estatus } from "./Estatus";

export interface Account {
  nombre: string;
  id: number;
  asociado: Asociado;
  estatus: Estatus;
  descripcion: string;
  referencia: string;
  depende_de_lista: boolean;
  tipo_cuenta: AccountType;
  consolidado: boolean;
  owner?: string;
}

export interface Asociado {
  nombre: string;
  id: number;
  asociado: any;
  tipo_asociado: TipoAsociado;
  estatus: Estatus;
}

export interface TipoAsociado {
  codigo: string;
  nombre: string;
  id: number;
}
