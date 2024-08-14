import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "@/shared/api/services/products.service";
import { InputField } from "@/shared/models/InputField.interface";
import { OptionInterface } from "@/shared/models/Option.interface";

export const useProductInputSelect = (): { data: InputField } => {
  const { data: products } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: async (): Promise<OptionInterface[]> => {
      const data = await fetchProducts();
      return data.map((product) => ({
        text: product.nombre,
        value: product.id,
      }));
    },
    retry: false,
  });

  const productInputSelect = {
    key: "product",
    label: "Producto",
    value: "",
    data: products ?? [],
  } as InputField;

  return { data: productInputSelect };
};
