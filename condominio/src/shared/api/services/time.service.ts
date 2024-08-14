// import { axiosPrivate } from "../axiosPrivate";
import * as z from "zod";

const timeValidator = z.object({
  nombre: z.string(),
  id: z.number(),
});

type TimeModel = z.infer<typeof timeValidator>;

export const fetchTime = async (): Promise<TimeModel[]> => {
  //const { data } = await axiosPrivate.get<Profile[]>("/api/v1/models/utils/time");

  const data = [
    { id: 1, nombre: "Mañana" },
    { id: 2, nombre: "Tarde" },
    { id: 3, nombre: "Noche" },
  ];

  return data;
};

export const timeService = {
  fetchTime,
};
