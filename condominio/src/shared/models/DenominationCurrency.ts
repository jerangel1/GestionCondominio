import { Currency } from "./Currency";
import { CurrencyDenominationType } from "./CurrencyDenominationType";

export interface DenominationCurrency {
  id: number;
  moneda: Currency;
  valor: number;
  tipo_denominacion_moneda: CurrencyDenominationType;
  nombre: string;
  uuid: string;
}
