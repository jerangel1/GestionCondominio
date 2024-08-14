import { type Paginated } from "@/types/types";
import { axiosPrivate } from "../axiosPrivate";
import { AgencyConfigSchemaType } from "@/pages/ticket-office/admin/config";

export const fetchAgencyOffices = async (data: {
  partner_id?: number | string;
}) => {
  const apiUrl = "/api/v1/models/agency-of-associate";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

type AgencyListType = {
  id: number;
  value: string;
  nombre: string;
};

export type AgencyDatatableType = {
  id: number;
  name: string;
  status_name: string;
  ticket_offices_amount: number;
  code: string;
  father_name: string;
  group_id: number;
};

const getAllAgencyDatatable = async (data: {
  page: number;
  page_size: number;
}) => {
  const apiUrl = "/api/v1/models/agency";
  const result = await axiosPrivate.post<Paginated<AgencyDatatableType>>(
    apiUrl,
    data
  );
  return result.data;
};

export const fetchAgencyList = async (data: {
  padre_id?: number | null;
  page_size?: number;
  cursor?: number;
  search?: string | null;
}): Promise<Paginated<AgencyListType>> => {
  const result = await axiosPrivate.post<Paginated<AgencyListType>>(
    "/api/v1/models/agency/list",
    data
  );
  return result.data;
};

type FathersListType = {
  id: number;
  value: string;
  nombre: string;
};

const fetchAgencyFathers = async () => {
  const apiUrl = "/api/v1/models/agency/fathers";
  const result = await axiosPrivate.post<FathersListType[]>(apiUrl, {});
  return result.data;
};

const getConfig = async () => {
  const apiUrl = "/api/v1/models/agency/config";
  const result = await axiosPrivate.post<AgencyConfigSchemaType>(apiUrl, {});
  return result.data;
};

const saveConfig = async (data: { id: number; asociado_pagos_id: number }) => {
  const apiUrl = "/api/v1/models/agency/config/save";
  const result = await axiosPrivate.post(apiUrl, data);
  return result.data;
};

export const agencies = {
  fetchAgencyList,
  fetchAgencyFathers,
  getConfig,
  saveConfig,
  getAllAgencyDatatable,
};
