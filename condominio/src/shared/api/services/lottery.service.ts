import { axiosPrivate } from "../axiosPrivate";

import { Lottery } from "@/shared/models/Lottery";

export const fetchLottery = async (): Promise<Lottery[]> => {
  try {
    const { data } = await axiosPrivate.get<Lottery[]>(
      "/api/v1/models/loteria"
    );

    return data;
  } catch (error) {
    return [];
  }
};
