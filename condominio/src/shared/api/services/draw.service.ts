import { DrawType } from "@/schemas/drawSchema";
import { axiosPrivate } from "../axiosPrivate";
import { type Paginated } from "@/types/types";
import type { AwardDrawSchemaType, DeleteDrawResultSchemaType } from "@/components/tables/DrawResultsTable";

export const getDrawById = async ({
  drawId,
}: {
  drawId: number;
}): Promise<NonNullable<DrawType>> => {
  const apiUrl = "/api/v1/models/admin/draw/" + drawId;
  const { data } = await axiosPrivate.get<NonNullable<DrawType>>(apiUrl);

  return data;
};

export type DrawsResultsType = {
  numero: number | null;
  sorteo_id: number;
  simbolo_id: number | null;
  numero2: number | null;
  numero3: number | null;
  comodin: number | null;
  fecha: string;
  resultado_id: number | null;
  tipo_sorteo_id: number;
  comodines: boolean;
  animalito: boolean;
  id: number;
  nombre: string;
  simbolo: string | null;
};

type getDrawResultsFilters = {
  date: string | null;
  lottery_id: number | null;
  time_id: number | null;
  page: number;
};

const getDrawResults = async (data: getDrawResultsFilters) => {
  const apiUrl = "/api/v1/models/admin/draw/results";
  const results = await axiosPrivate.post<Paginated<DrawsResultsType>>(
    apiUrl,
    data
  );
  return results.data;
};

const awardDraw = async (data: {
  number: number;
  date: string;
  draw_id: number;
  symbol_id?: number;
  wildcard?: number;
} ) => {
  const apiUrl = "/api/v1/models/admin/draw/award";
  await axiosPrivate.post(apiUrl, data);
};

const deleteDrawResult = async (data: DeleteDrawResultSchemaType) => {
  const apiUrl = "/api/v1/models/admin/draw/result/delete";
  await axiosPrivate.post(apiUrl, data);
};

type SymbolType = {
  id: number;
  numero: number;
  nombre: string;
};

const getSymbolsByDrawTypeId = async (data: { draw_type_id: number }) => {
  const apiUrl = "/api/v1/models/inventory/symbols";
  const result = await axiosPrivate.post<SymbolType[]>(apiUrl, data);
  return result.data;
};

type DrawsList = {
  id: number;
  nombre: string;
};

export const getDrawsWithoutProduct = async () => {
  const apiUrl = "/api/v1/models/inventory/draw/no-product";
  const { data } = await axiosPrivate.post<DrawsList[]>(apiUrl, {});
  return data;
};

export const updateDraw = async ({
  drawId,
  data,
}: {
  drawId: number;
  data: Omit<DrawType, "id">;
}): Promise<void> => {
  await axiosPrivate.put("/api/v1/models/admin/draw/" + drawId, data);
};

export const drawService = {
  getDrawById,
  updateDraw,
  getDrawResults,
  getDrawsWithoutProduct,
  getSymbolsByDrawTypeId,
  awardDraw,
  deleteDrawResult,
};
