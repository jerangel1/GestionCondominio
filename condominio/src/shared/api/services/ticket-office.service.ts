import { type Paginated } from "@/types/types";
import { axiosPrivate } from "../axiosPrivate";
import { type newTicketOfficesSchemaType } from "@/components/NewTicketOffices.modal";

export const fetchTicketOffice = async (): Promise<any[]> => {
  const { data } = await axiosPrivate.get<any[]>(
    "/api/v1/models/ticket-office"
  );
  return data.map((ticketOffice) => ({
    id: ticketOffice.id,
    name: `Taquilla ${ticketOffice.id}`,
  }));
};

const saveTicketOffices = async (
  data: newTicketOfficesSchemaType
): Promise<void> => {
  const apiUrl = "/api/v1/models/ticket-offices/new";
  const result = await axiosPrivate.post<any>(apiUrl, data);

  return result.data;
};

export type TicketOfficeTableDataType = {
  agencia_nombre: string;
  id: number;
  server_addr: string | null;
  ultima_conexion: string | null;
  ultima_desconexion: string | null;
  usuario_nombre: string | null;
  vendedor_polla: boolean;
  version_software: number | null;
};

const getTicketOffices = async (data: {
  cursor: number;
  page_size?: number;
  padre_id?: number;
  is_polla?: boolean;
  ticket_office_id?: number;
  agency_search?: string;
}) => {
  const apiUrl = "/api/v1/models/ticket-offices/all";
  const result = await axiosPrivate.post<Paginated<TicketOfficeTableDataType>>(
    apiUrl,
    data
  );

  return result.data;
};

export const ticketOffices = {
  saveTicketOffices,
  getTicketOffices,
};
