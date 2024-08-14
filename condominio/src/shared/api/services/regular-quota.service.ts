import { axiosPrivate } from "../axiosPrivate";

export const fetchRegularQuota = async ({ tipo_asociado_id }:{tipo_asociado_id: number}): Promise<any> => {
  const apiUrl = "/api/v1/models/admin/administrative/banking/regular-quota";
  const { data } = await axiosPrivate.get<any[]>(apiUrl, {
    params :{
      tipo_asociado_id
    }
  });
  
  const result = data.map((record) => ({
    id: record.id,
    asociado_id: record.asociado_id,
    asociado_nombre: record.asociado_nombre,
    nombre: record.nombre,
    loteria_id: undefined,
    sorteo_id: null,
    horario_id: null,
    tope_cupo_terminal: null,
    tope_cupo_triple: null,
    producto_id: null,
    tipo_producto_id: record.sorteos[0].tipo_sorteo_id,
    grupo_id: null,
    animalito: record.sorteos[0].animalito,
    monto_terminal: null,
    monto_triple: null,
    monto_extra_triple: null,
    monto_extra_terminal: null,
    sorteos: record.sorteos,
  }));

  return result;
};

export const saveRegularQuota = async ({ data }:{ data:any }): Promise<any> => {
  const apiUrl = "/api/v1/models/admin/administrative/banking/regular-quota";
  await axiosPrivate.post(apiUrl, data);

  return {};
};

export const regularQuota = {
  saveRegularQuota,
  fetchRegularQuota,
};
