import { axiosPrivate } from "./axiosPrivate";
import dayjs from "dayjs";

import {
  ticketDetailTable,
  ticketTable,
} from "../../../data/setup/create-local-db";
import { Amounts, Expense } from "../models/Expense";
import { Lottery } from "../models/Lottery";
import distributorReportData from "../../../data/balanceReport.json";
import assingTicketsData from "../../../data/assingTickets.json";
import { guid } from "../../utils";
import { LotteryResponse } from "../models/LotteryResponse";


//Data for Balance Report
export const fetchBalanceReportData = async ({
  distribuitorId,
  init,
  end,
}: any): Promise<any[]> => {
  const data = distributorReportData
    .map((distribuitorReportItem) => {
      return {
        id: guid(),
        ...distribuitorReportItem,
        date: distribuitorReportItem.date
          ? new Date(distribuitorReportItem.date)
          : undefined,
      };
    })
    .filter(
      (distributorFiltered) =>
        distributorFiltered.distributorId === distribuitorId &&
        distributorFiltered.date &&
        distributorFiltered.date >= init &&
        distributorFiltered.date <= end
    );

  return data;
};


export const fetchLotteryData = async (): Promise<Lottery[]> => {
  const { data } = await axiosPrivate.get<LotteryResponse[]>(
    "/api/v1/models/lottery"
  );

  const lotteries = data.map(
    (d: LotteryResponse) =>
      ({
        name: d.nombre,
        id: d.id,
      } as Lottery)
  );

  return lotteries;
};

export const saveRegisterTicket = async (data: any): Promise<void> => {
  const { items, ...ticket } = data;

  const ticketResponse = await ticketTable.add(ticket);

  const ticketItems = items.map((i: any) => ({
    ...i,
    ticketId: ticketResponse,
  }));

  ticketDetailTable.bulkAdd(ticketItems);
};

export const fetchSerialRangeByLoteryDraw = async (
  lotteryDraw: string
): Promise<any[]> => {
  const ticket = await ticketTable.get({ lotteryDraw: lotteryDraw });

  if (!ticket) return [];

  const ticketDetails = await ticketDetailTable
    .where("ticketId")
    .equals(ticket.id)
    .toArray();

  return ticketDetails.map((td) => ({
    serialFrom: td.serialFrom,
    serialTo: td.serialTo,
  }));
};

export const createSerialRangeSeries = async (lotteryDraw: string) => {
  const serialRange = await fetchSerialRangeByLoteryDraw(lotteryDraw);

  const serialRangeSeries = [] as any[];

  for (let index = 0; index < serialRange.length; index++) {
    const serialRangeItem = serialRange[index];

    const serialFrom = Number(serialRangeItem.serialFrom);
    const serialTo = Number(serialRangeItem.serialTo);

    for (
      let currentSerial = serialFrom;
      currentSerial <= serialTo;
      currentSerial++
    ) {
      serialRangeSeries.push(currentSerial);
    }
  }

  return serialRangeSeries;
};


export const fetchAssingTicketsData = async ({
  distribuitor,
}: any): Promise<any[]> => {
  const data = assingTicketsData
    .map((assingTicket) => {
      return {
        id: guid(),
        ...assingTicket,
      };
    })
    .filter((el) =>
      distribuitor ? el.distribuitor.includes(distribuitor) : true
    );

  return data;
};
