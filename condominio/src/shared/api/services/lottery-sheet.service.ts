import { LotterySheet } from "../../models/lotterySheet";
import { axiosPrivate } from "../axiosPrivate";

export const fetchLotterySheet = async (): Promise<LotterySheet[]> => {
  const { data } = await axiosPrivate.get<LotterySheet[]>(
    "/api/v1/models/lottery_sheet"
  );
  return data;
};
