export interface LotterySheet {
  uuid: string;
  status_uuid: string;
  status_name: string;
  ticket_sheets: TicketSheet[];
}

export interface TicketSheet {
  uuid: string;
  reference: string;
  from_number: number;
  to_number: number;
  status_uuid: string;
  status_name: string;
}
