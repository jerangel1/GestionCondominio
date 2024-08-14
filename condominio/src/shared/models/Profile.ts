export interface Profile {
  tipo_asociado: TipoAsociado;
  nombre: string;
  id: number;
}

export interface TipoAsociado {
  codigo: string;
  nombre: string;
  id: number;
}
