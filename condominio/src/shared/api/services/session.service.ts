import { User } from "@/hooks/useSession";
import { axiosPrivate } from "../axiosPrivate";

const getSession = async (): Promise<User | undefined> => {
  try {
    const { data } = await axiosPrivate.get<User>(
      "/api/v1/models/user/session"
    );

    return {
      nombre: data.nombre,
      role: data.role,
    };
  } catch {
    return undefined;
  }
};

export const session = {
  getSession,
};
