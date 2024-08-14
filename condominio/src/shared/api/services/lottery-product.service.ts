import { LotteryProductResponse } from "../../models/LotteryProductResponse";
import { ProductRegistration } from "../../models/ProductRegistration";
import { axiosPrivate } from "../axiosPrivate";

export const fetchProductsReportData = async ({
  lotteryId,
  name,
}: any): Promise<ProductRegistration[]> => {
  const { data } = await axiosPrivate.get<LotteryProductResponse[]>(
    "/api/v1/models/lottery_product"
  );

  const lotteryProducts = data.map((r: LotteryProductResponse) => ({
    name: r.name,
    id: r.uuid,
    comission: r.fee,
    lotteryId: r.lottery_id,
    lotteryName: r.lottery_name,
    prePrinted: r.pre_printed,
    price: r.price,
    status: r.status_name,
  })) as ProductRegistration[];

  return lotteryProducts.filter(
    (r) =>
      (lotteryId !== 0 ? r.lotteryId === lotteryId : true) &&
      (name !== "" ? r.name.includes(name) : true)
  );
};

export const fetchProductsData = async (): Promise<ProductRegistration[]> => {
  const { data } = await axiosPrivate.get<any[]>("/api/v1/models/lottery_product");

  const lotteryProducts = data.map(
    (r: LotteryProductResponse) =>
      ({
        name: r.name,
        id: r.uuid,
        comission: r.fee,
        lotteryId: r.lottery_id,
        lotteryName: r.lottery_name,
        price: r.price,
        prePrinted: r.pre_printed,
      } as ProductRegistration)
  );

  return lotteryProducts;
};

export const fetchProductsDataById = async (
  uuid: string
): Promise<ProductRegistration> => {
  const { data: r } = await axiosPrivate.get<any>(`/api/v1/models/lottery_product/${uuid}`);

  const lotteryProduct = {
    name: r.name,
    id: r.uuid,
    comission: r.fee,
    lotteryId: r.lottery_id,
    lotteryName: r.lottery_name,
    price: r.price,
    prePrinted: r.pre_printed,
  } as ProductRegistration;

  return lotteryProduct;
};

export const saveProductRegistration = async (
  data: ProductRegistration
): Promise<void> => {
  await axiosPrivate.post("/api/v1/models/lottery_product", {
    name: data.name,
    fee: data.comission, // between 0 and 1,
    lottery_id: data.lotteryId,
    price: data.price,
    pre_printed: data.prePrinted,
  });
};

export const deleteLotteryProduct = async (uuid: string): Promise<void> => {
  await axiosPrivate.delete(`/api/v1/models/lottery_product/${uuid}`);
};

export const updateProductRegistration = async (data: ProductRegistration) => {
  const uuid = data.id;
  await axiosPrivate.put(`/api/v1/models/lottery_product/${uuid}`, {
    name: data.name,
    price: data.price,
    pre_printed: data.prePrinted,
  });
};
