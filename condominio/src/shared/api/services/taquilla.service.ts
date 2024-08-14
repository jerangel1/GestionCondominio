import { axiosPrivate } from "../axiosPrivate";

export const fetchTaquilla = async (id:string): Promise<any[]> => { 
  try {

    const { data } = await axiosPrivate.post<any[]>(
      "/api/v1/models/ticket-office",
      { 
        "agency_id" : parseFloat(id)
      }    
    );

    return data.map((taq:any) => ({
      id: taq.id,
      name: taq.nombre,
    }));
  } catch (error) {
    return [];
  }
};

export const fetchTaqs = async (data:{ partner_id?: number}) => { 
  const apiUrl = "/api/v1/models/ticket-offices?cursor=0";
  const result = await axiosPrivate.post<{page: {
    id: number,
    name: string
  }[], total: number}>(apiUrl, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return result.data.page.map((taq) => ({
    id: taq.id,
    name: taq.name,
  }));
};