import { Paginated } from "@/types/types";
import { MovementReport } from "../../models/ReportAccountEntry";
import { axiosPrivate } from "../axiosPrivate";

type AccountEntry = {
  total_saldo: number;
  monto: number;
  aportante_asociado_id: number;
  observacion: string;
  aportante_asociado_nombre: string;
  monto_previo: number;
  cuentas: number;
  beneficiario_asociado_nombre: string;
  beneficiario_asociado_id: number;
  es_banca: boolean;
};

export const fetchAccountEntries = async (data: {
  accountId?: null | number;
  date?: null | string;
  balance?: null | string;
  search?: null | string;
  cursor?: number;
  page_size?: number;
}) => {
  const response = await axiosPrivate.post<Paginated<AccountEntry>>(
    "/api/v1/models/accounting-entries/filter",
    data
  );

  const accountEntryStrucuture = {
    page: response.data.page.map((accountEntry) => ({
      id: accountEntry.beneficiario_asociado_id,
      beneficiaryPartnerId: accountEntry.beneficiario_asociado_id,
      beneficiaryPartnerName: accountEntry.beneficiario_asociado_nombre,
      accountId: accountEntry.cuentas,
      previousAmount: accountEntry.monto_previo,
      amount: accountEntry.monto,
      observation: accountEntry.observacion || "",
      balance: 0,
      totalBalance: accountEntry.total_saldo,
    })),
    total: response.data.total,
  };

  return accountEntryStrucuture;
};
export interface Filters {
  associate_id?: number | null;
  account_id?: number | null;
  date_start?: string | null;
  date_end?: string | null;
  cursor: number;
  page_size: number;
}

export const fetchReportAccountEntries = async (
  data: Filters
): Promise<Paginated<MovementReport>> => {
  const apiUrl = "/api/v1/models/admin/movement-report";
  const response = await axiosPrivate.post<Paginated<MovementReport>>(
    apiUrl,
    data
  );
  return response.data;
};



export const saveAccountEntries = async (data: any): Promise<boolean> => {
  const result = await axiosPrivate.post(
    "/api/v1/models/accounting-entries",
    data
  );
  return !!result;
};




