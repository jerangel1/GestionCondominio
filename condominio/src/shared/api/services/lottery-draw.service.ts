import { LotteryDrawResponse } from "../../models/LotteryDrawResponse";
import { RaffleRegistration } from "../../models/RaffleRegistration";
import { axiosPrivate } from "../axiosPrivate";

const formatDate = (d: Date) => {
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${ye}-${mo}-${da}`;
};
  

export const fetchRaffleDataReport = async ({
  productId,
  initDate,
  endDate,
  lotteryDraw,
}: any): Promise<any[]> => {
  const data = await axiosPrivate.get("/api/v1/models/lottery_draw");

  
  const dataFiltered = (data as unknown as LotteryDrawResponse[])
    .map((el: LotteryDrawResponse) => ({
      creationDate: new Date(el.draw_date),
      product: el.product_name,
      productId: el.product_uuid,
      productName: el.product_name,
      drawStatus: el.status_name,
      id: el.uuid,
    }))
    .filter((el) => el.productId === (productId || el.productId))
    .filter((el) => el.id === (lotteryDraw || el.id))
    .filter((el) =>
      initDate && endDate
        ? el.creationDate >= initDate && el.creationDate <= endDate
        : true
    );
  
  return dataFiltered;
};

export const saveRaffleRegistration = async (
  data: RaffleRegistration
): Promise<void> => {
  const lotteryDraw = {
    product_uuid: data.product,
    draw_date: formatDate(data.creationDate),
  };

  await axiosPrivate.post("/api/v1/models/lottery_draw", lotteryDraw);
};

export const deleteRaffle = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/api/v1/models/lottery_draw/${uuid}`);
};

export const updateRaffleRegistration = async (
  data: RaffleRegistration
): Promise<void> => {
  const lotteryDraw = {
    product_uuid: data.product,
    draw_date: formatDate(data.creationDate),
  };

  await axiosPrivate.put(`/api/v1/models/lottery_draw/${data.uuid}`, lotteryDraw);
};

export const fetchRaffleDataById = async (uuid: string): Promise<any> => {
  const { data: el } = await axiosPrivate.get<LotteryDrawResponse>(`/api/v1/models/lottery_draw/${uuid}`);

  return {
    creationDate: new Date(el.draw_date),
    product: el.product_name,
    productId: el.product_uuid,
    productName: el.product_name,
    drawStatus: el.status_name,
    id: el.uuid,
  };
};
