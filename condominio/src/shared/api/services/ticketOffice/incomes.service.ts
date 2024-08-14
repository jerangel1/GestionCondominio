import { Paginated } from "@/types/types";
import { axiosPrivate } from "../../axiosPrivate";
import { PostListCashReceipt } from "../cash-receipt.service";

type FiltersCashIncomesAgency = {
  payment_method_id?: number
  // reference?: string,
  ticket_office_ids?: number[],
  from_date?: string,
  to_date?: string,
  page: number
};

export const getCashIncomesAgency = async (data: FiltersCashIncomesAgency) => {
  const apiUrl = "/api/v1/models/agency/cash-receipts";
  const result = await axiosPrivate.post<Paginated<PostListCashReceipt>>(apiUrl, data);
  return result.data;
};

export const incomes = {
    getCashIncomesAgency
};
