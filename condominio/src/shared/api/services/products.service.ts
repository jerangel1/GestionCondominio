import { axiosPrivate } from "../axiosPrivate";

import { Product } from "@/shared/models/Product";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await axiosPrivate.get<Product[]>(
      "/api/v1/models/product"
    );

    return data;
  } catch (error) {
    return [];
  }
};
