export interface ProductsWithDraws {
  id:               number;
  loteria_id:       number;
  nombre:           string;
  sorteos:          Sorteo[];
  tipo_producto_id: number;
  url_image:        null | string;
}

export interface Sorteo {
  abreviatura:               string;
  dias:                      boolean[];
  estatus_id:                number;
  fecha_ultima_notificacion: Date | null;
  fuerte:                    boolean;
  grupo_horario_sorteo_id:   number;
  hora_cierre:               number;
  hora_venta:                number;
  horario_id:                number;
  id:                        number;
  loteria_id:                number;
  loteria_operador:          null | string;
  loteria:                   number;
  nombre:                    string;
  orden:                     number;
  producto_id:               number;
  productos:                 number;
  sorteo_operador:           null | string;
  tipo_premiacion:           number;
  tipo_sorteo_id:            number;
  tope_cupo_terminal:        number;
  tope_cupo_triple:          number;
  ultimo_dia:                boolean;
}
