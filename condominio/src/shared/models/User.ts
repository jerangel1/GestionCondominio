export interface User {
  asociado: Asociado;
  id: number;
  estatus: Estatus;
  perfil: Perfil;
  login: string;
  nombre: string;
  monitor_apuestas: boolean;
}

export interface Asociado {
  tipo_asociado: TipoAsociado;
  nombre: string;
  asociado: Asociado;
  id: number;
  estatus: Estatus;
}

export interface TipoAsociado {
  id: number;
  nombre: string;
  codigo: string;
}

export interface Estatus {
  id: number;
  nombre: string;
}

export interface Perfil {
  tipo_asociado: TipoAsociado;
  id: number;
  nombre: string;
}
