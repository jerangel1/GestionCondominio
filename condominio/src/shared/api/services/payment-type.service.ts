// import { PaymentAcceptedAndRejected } from "@/shared/models/PaymentAcceptedAndRejected";
import { axiosPrivate } from "../axiosPrivate";
import * as z from "zod";

const paymentTypeValidator = z.object({
  nombre: z.string(),
  id: z.number(),
});

type PaymentTypeModel = z.infer<typeof paymentTypeValidator>;

const fetchAllPaymentTypes = async () => {
  const { data } = await axiosPrivate.get<PaymentTypeModel[]>(
    "/api/v1/models/payment/types"
  );

  return data;
};

export const paymentTypesService = {
  fetchAllPaymentTypes,
};
