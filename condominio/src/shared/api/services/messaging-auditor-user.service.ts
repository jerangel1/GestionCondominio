import { MessagingAuditorUser } from "@/shared/models/MessagingAuditorUser";
import { axiosPrivate } from "../axiosPrivate";

export const fetchMessagingAuditorUser = async (): Promise<
  MessagingAuditorUser[]
> => {
  const { data } = await axiosPrivate.get<MessagingAuditorUser[]>(
    "/api/v1/models/config/messaging-auditor-user"
  );
  return data;
};
