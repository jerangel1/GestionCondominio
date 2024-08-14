import { axiosPrivate } from "../axiosPrivate";
import * as z from "zod";

const betTypeValidator = z.object({
  nombre: z.string(),
  id: z.number(),
});

type BetTypeModel = z.infer<typeof betTypeValidator>;

const fetchAllBetTypes = async () => {
  const { data } = await axiosPrivate.get<BetTypeModel[]>(
    "/api/v1/models/admin/administrative/banking/bet-types"
  );

  return data;
};

export const betTypesService = {
  fetchAllBetTypes,
};
