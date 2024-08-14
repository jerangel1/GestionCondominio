import { PartnerResponse } from "../../models/PartnerResponse";
import { PartnerView } from "../../models/PartnerView";
import { axiosPrivate } from "../axiosPrivate";
import { DistribuitorModel, Distributor } from "@/schemas/distribuitorSchema";
import { type Paginated } from "@/types/types";

type ApiResponse = {
  map(
    arg0: (a: import("../../models/Distribuitor").Distribuitor) => {
      value: string;
      id: string | number;
    }
  ): any;
  metadata: {
    cursor: number;
    next_cursor: number;
    prev_cursor: number;
    total: number;
    page_size: number;
  };
  page: Distributor[];
};
export const saveDistribuitor = async (
  data: DistribuitorModel
): Promise<void> => {
  await axiosPrivate.post("api/v1/models/partner", data);
};

export type DistributorTableData = {
  id: number;
  name: string;
  father_name: string;
  status_name: string;
  code: string;
  phone: string;
  agencies: number;
};

export const getDistribuitorsTableData = async (data:{
  cursor: number,
  page_size: number,
}) => {
  const apiUrl =  "api/v1/models/partner";
  const result = await axiosPrivate.post<Paginated<DistributorTableData>>(apiUrl,
    data
  );
  return result.data;
};

//Old service
export const fetchDistribuitorData = async (): Promise<PartnerView[]> => {
  try {
    const { data } = await axiosPrivate.get<PartnerResponse[]>(
      "api/v1/models/partner/for-associate"
    );
    const distribuitors = data.map((d: PartnerResponse) => ({
      name: d.nombre,
      code: d.asociado_id,
      id: d.id,
      estatus: d.estatus,
    }));

    return distribuitors;
  } catch (error: any) {
    console.error(
      "Error al obtener los datos del distribuidor:",
      error.message
    );
    throw error;
  }
};


export const fetchChildrenPartners = async (filters:{
  cursor?: number;
  page_size?: number;
  search?: string | null;
}) => {
  const result = await axiosPrivate.post<Paginated<{ 
    nombre: string, 
    id: number
  }>>(
    "api/v1/models/partner/children", filters
  );
  return result.data;
};

export const fetchAssociates = async (data: {
  cursor?: number;
  page_size?: number;
  search?: string;
}): Promise<ApiResponse> => {
  const apiUrl = "api/v1/models/partner/distributor";
  const response = await axiosPrivate.post<ApiResponse>(apiUrl, data);
  return response.data;
};

export const fetchDistribuitorDataByTaq = async () => {
  const apiUrl = "api/v1/models/agency/for-associate";
  const response = await axiosPrivate.get<PartnerResponse[]>(apiUrl);
  return response.data;
};

export const fetchDistribuitorById = async (
  id: string
): Promise<PartnerView> => {
  try {
    const { data } = await axiosPrivate.get<PartnerResponse>(
      `api/v1/models/partner/${id}`
    );

    const distribuitors = {
      name: data.nombre,
      code: data.asociado_id,
      id: data.id,
      estatus: data.estatus,
    } as PartnerView;

    return distribuitors;
  } catch (error: any) {
    console.error(
      "Error al obtener los datos del distribuidor por ID:",
      error.message
    );
    throw error;
  }
};

export const getFecthExpeditures = async (): Promise<any> => {
  const { data } = await axiosPrivate.get<any>(
    "api/v1/models/expenditure/associate"
  );
  return data;
};

export const filterFecthExpeditures = async (data: {
  associate_id: number;
  agency_id: number;
  ticket_office_id: number;
  type: number;
  pay_mode: number;
  currency_code: number;
  date_start: string;
  date_end: string;
}) => {
  const apiUrl = "api/v1/models/expenditure/filter-expense";
  const response = await axiosPrivate.post<any>(apiUrl, data);
  return response.data;
};

export const getFecthExpedituresDetails = async (id: any): Promise<any> => {
  try {
    if (!id) {
      return [];
    }
    const { data } = await axiosPrivate.post<any>(
      "api/v1/models/expenditure/detail",
      { expenditure_id: id }
    );
    return data;
  } catch (error: any) {
    console.error("Error al obtener los detalles del gasto:", error.message);
    throw error;
  }
};

type PartnerListType = {
  value: string;
  nombre: string;
  tipo_asociado_id: number;
  id: string;
};
//!! Partners sin agencias
const getPartnersList = async (data: {
  search?: string | null;
  page_size: number;
  with_agency?: boolean;
  cursor: number;
}): Promise<Paginated<PartnerListType>> => {
  const result = await axiosPrivate.post<Paginated<PartnerListType>>(
    "api/v1/models/partner/list",
    data
  );
  return result.data;
};
//!! Partners con agencias directas
type PartnersAndAgencyList = {
  value: string;
  nombre: string;
  tipo_asociado_id: number;
  id: string;
};
const getPartnersAndAgencyList = async (data: {
  search?: string | null;
  page_size: number;
  with_agency?: boolean;
  cursor: number;
}): Promise<Paginated<PartnerListType>> => {
  const result = await axiosPrivate.post<Paginated<PartnersAndAgencyList>>(
    "/api/v1/models/admin/reports/sales-by-draw-x-associated",
    data
  );
  return result.data;
};

export const partner = {
  saveDistribuitor,
  getDistribuitorsTableData,
  getPartnersList,
  getPartnersAndAgencyList
};

//**Registro de pagos en banca
export const BancaDistribuitorData = async (): Promise<PartnerView[]> => {
  const { data } = await axiosPrivate.post<Paginated<PartnerResponse>>(
    "api/v1/models/partner/associates",
    {}
  );

  const distribuitors = data.page.map((d: PartnerResponse) => ({
    name: d.nombre,
    code: d.asociado_id,
    id: d.id,
    estatus: d.estatus,
  }));

  return distribuitors;
};