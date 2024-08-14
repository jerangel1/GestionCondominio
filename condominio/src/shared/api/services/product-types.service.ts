import { axiosPrivate } from "../axiosPrivate";

import { ProductType } from "@/shared/models/ProductType";
import { OptionInterface } from "@/shared/models/Option.interface";

export const fetchProductTypes = async (): Promise<OptionInterface[]> => {
  try {
    const { data } = await axiosPrivate.get<ProductType[]>(
      "/api/v1/models/product/types"
    );

    return data
      .map((productType) => {
        return {
          text: productType.nombre,
          value: productType.id,
        };
      })
      .sort((a, b) => a.text.localeCompare(b.text));
  } catch (error) {
    return [];
  }
};
