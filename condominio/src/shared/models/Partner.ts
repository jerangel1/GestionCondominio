import { Estatus } from "./Estatus";
import { PartnerType } from "./PartnerType";

export interface Partner {
  id: number;
  nombre: string;
  asociado: Partner;
  tipo_asociado: PartnerType;
  estatus: Estatus;
}
