import { axiosPrivate } from "../axiosPrivate";

type Product = {
  nombre: string;
  id: number;
};

export const fetchProductList = async (): Promise<Product[]> => {
  const apiUrl = "/api/v1/models/product/list";
  const { data } = await axiosPrivate.get<Product[]>(apiUrl);
  return data;
};

export const productService = {
  fetchProductList,
  // fetchProductsWithDraws,
  // getProductsList,
  // saveProduct,
  // getProductById,
  // updateProduct
};
