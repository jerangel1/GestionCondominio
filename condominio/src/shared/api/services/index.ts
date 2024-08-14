import {
  fetchPaymentMethodsByPartnerId,
  updatePaymentMethod,
} from "./payment-method.service";
import { fetchDistribuitorData } from "./partner.service";
import { savePayments } from "./payment.service";
import {
  fetchAccountsData,
  updateAccount,
  deleteAccount,
  saveAccount,
} from "./account.service";
import { fetchReportAccountEntries } from "./account-entry.service";
import {
  fetchAccountEntries,
  saveAccountEntries,
} from "./account-entry.service";
import { fetchDenominationCurrency } from "./denomination-currency.service";
import { rate } from "./rate.service";
import { externalSystems } from "./externalSystems.service";
import { fetchCurrencies } from "./currency.service";
import { fetchTicketOffice } from "./ticket-office.service";
import { admin } from "./admin";
import { ticketOffice } from "./ticketOffice"; 
import { groupService } from "./group.service";
import { paymentTypesService } from "./payment-type.service";
import { betTypesService } from "./bet-types.service";
import { pairsPlaysAndBetsService } from "./pairs-bet-x-play";
import { loteriaService } from "./loteria.service";
import { productService } from "./product.service";
import { timeService } from "./time.service";
import { regularQuota } from "./regular-quota.service";
import { drawService } from "./draw.service";
import { session } from "./session.service";
import { partner } from "./partner.service";
import { commissions } from "./commission.service";
import { clients } from "./client.service";
import { ticketOffices } from "./ticket-office.service";
import { polla } from "./polla.service";
import { agencies } from "./agency.service";
import { users } from "./user.service";
import { profile } from "./profile.service";
import { cashRegister } from "./cashRegister.service";
import { expenditure } from "./expenditure.service";
import { transactions } from "./transaction-validation.service";

export {
  fetchPaymentMethodsByPartnerId,
  fetchDistribuitorData,
  savePayments,
  saveAccount,
  fetchAccountsData,
  updateAccount,
  deleteAccount,
  fetchReportAccountEntries,
  fetchAccountEntries,
  fetchDenominationCurrency,
  fetchCurrencies,
  fetchTicketOffice,
  saveAccountEntries,
  updatePaymentMethod,
  groupService,
};

export const api = {
  admin,
  ticketOffice,
  paymentTypesService,
  betTypesService,
  groupService,
  pairsPlaysAndBetsService,
  loteriaService,
  productService,
  timeService,
  regularQuota,
  drawService,
  session,
  partner,
  commissions,
  clients,
  polla,
  ticketOffices,
  agencies,
  users,
  profile,
  cashRegister,
  externalSystems,
  rate,
  expenditure,
  transactions
};
