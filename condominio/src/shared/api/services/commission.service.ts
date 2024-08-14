import { axiosPrivate } from "../axiosPrivate";

export type Commission = {
  asociado_nombre: string;
  tipo_apuesta_nombre: string;
  grupo_id: number;
  tipo_apuesta_id: number;
  tipo_participacion_id: number | null;
  porcentaje_extra: number | null;
  tipo_comision_id: number | null;
  asociado_id: number;
	comision_maxima: number | null;
  participacion: number | null;
  porcentaje: number | null;
};

export const getCommissions = async ({
  tipo_asociado_id,
}: {
  tipo_asociado_id: number;
}): Promise<Commission[]> => {
  const apiUrl = "/api/v1/models/admin/administrative/commissions";
  const { data } = await axiosPrivate.get<Commission[]>(apiUrl, {
    params: {
      tipo_asociado_id,
    },
  });

  return data;
};

export const saveCommissions = async ({
  data,
}: {
  data: any;
}): Promise<any> => {
  const apiUrl = "/api/v1/models/admin/administrative/commissions";
  await axiosPrivate.post(apiUrl, data);

  return {};
};

type CommissionType = {
  nombre: string;
  id: number;
};

export const getCommissionsType = async (): Promise<CommissionType[]> => {
  const apiUrl = "/api/v1/models/admin/administrative/commissions";
  const { data } = await axiosPrivate.get<CommissionType[]>(apiUrl);

  return data;
};

export const commissions = {
  getCommissionsType,
  saveCommissions,
  getCommissions,
};
