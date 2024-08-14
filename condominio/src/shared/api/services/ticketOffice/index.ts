import { ticketOfficeConn } from "./ticketOfficeConn.service";
import { cashRegister } from "./cashRegister.ticketOffice.service";
import { cashFund } from "./cash-fund.service";
import { incomes } from "./incomes.service";

export const ticketOffice = {
  ticketOfficeConn,
  cashRegister,
  cashFund,
  incomes
};