import { axiosPrivate } from "../axiosPrivate";

type Group = {
  id: number;
  descripcion: string;
  comision_maxima: number;
  tipo_pago_configuraciones: {
    tipo_apuesta_id: number;
    tipo_pago_id: number;
    proporcion: number;
  }[];
};
const fetchGroupById = async ({
  groupId,
}: {
  groupId: number;
}): Promise<Group> => {
  const apiUrl = `/api/v1/models/admin/administrative/group/${groupId}`;
  const { data } = await axiosPrivate.get<Group>(apiUrl);
  return data;
};

const fetchGroupList = async (): Promise<{ id: number; nombre: string }[]> => {
  const apiUrl = "/api/v1/models/admin/administrative/group";
  const { data } = await axiosPrivate.get<{ id: number; nombre: string }[]>(
    apiUrl
  );
  return data;
};

const updateGroup = async (data: Group): Promise<void> => {
  const { id, ...updatedFields } = data;
  const apiUrl = `/api/v1/models/admin/administrative/group/${id}`;
  await axiosPrivate.put(apiUrl, updatedFields);
};

const saveGroup = async (data: any): Promise<void> => {
  await axiosPrivate.post("/api/v1/models/account", {
    nombre: data.name,
    referencia: data.reference,
    descripcion: data.description,
    estatus_id: 1,
    depende_de_lista: data.dependsOnList,
    consolidado: data.consolidated,
  });
};

export const groupService = {
  fetchGroupById,
  fetchGroupList,
  saveGroup,
  updateGroup,
};
