import { axiosPrivate } from "../axiosPrivate";
import { ProductsWithDraws } from "@/shared/models/ProductsWithDraws";
import { NewProductSchemaType } from "@/components/templates/newProducts/CreateProductModal";
import { UpdateProductSchemaType } from "@/components/templates/newProducts/productForm";

type Product = {
  nombre: string;
  id: number;
};

export const fetchProductList = async (): Promise<Product[]> => {
  const apiUrl = "/api/v1/models/product/list";
  const { data } = await axiosPrivate.get<Product[]>(apiUrl);
  return data;
};

type ProductType = {
  "id": number,
  "name": string,
  "description": string,
  "status_id": number,
  "lottery_id": number,
  "category_id": number,
  "url_img": string,
  "draws": {
    "name": string,
    "id": number
  }[]
}

export const getProductById = async (payload:{ product_id: number}) => {
  const apiUrl = "/api/v1/models/inventory/product";
  const result = await axiosPrivate.post<ProductType>(apiUrl, payload);
  return result.data;
};

export type ProductListType = {
  "id": number,
  "nombre": string,
  "description": string,
  "status_id": number,
}

export const getProductsList = async () => {
  const apiUrl = "/api/v1/models/inventory/products/list";
  const { data } = await axiosPrivate.post<ProductListType[]>(apiUrl, {});
  return data;
};

export const saveProduct = async (data:NewProductSchemaType) => {
  const apiUrl = "/api/v1/models/inventory/product/create";
  await axiosPrivate.post(apiUrl, data);
};

export const updateProduct = async (data:UpdateProductSchemaType) => {
  const apiUrl = "/api/v1/models/inventory/product/create";
  await axiosPrivate.post(apiUrl, data);
};

export const fetchProductsWithDraws = async (): Promise<
  ProductsWithDraws[]
> => {
  const urlPath = "/api/v1/models/product";
  const { data } = await axiosPrivate.get<ProductsWithDraws[]>(urlPath);
  return data;
};

export const productService = {
  fetchProductList,
  fetchProductsWithDraws,
  getProductsList,
  saveProduct,
  getProductById,
  updateProduct
};
