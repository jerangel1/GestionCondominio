import { LotteryStatusResponse } from "../../models/LotteryStatusResponse";
import { axiosPrivate } from "../axiosPrivate";

export const fetchLotteryStatus = async (): Promise<LotteryStatusResponse[]> => {
  const { data } = await axiosPrivate.get<LotteryStatusResponse[]>("/api/v1/models/lottery_status");
  return data;
};

export const fetchLotteryStatusById = async (uuid: string): Promise<LotteryStatusResponse> => {
  const { data } = await axiosPrivate.get<LotteryStatusResponse>(`/api/v1/models/lottery_status/${uuid}`);
  return data;
};

