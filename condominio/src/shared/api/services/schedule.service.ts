import { Schedule } from "@/shared/models/Schedule";

export const fetchSchedule = async (): Promise<Schedule[]> => {
  try {
    const { data } = await Promise.resolve<{ data: Schedule[] }>({
      data: [
        { id: 1, nombre: "Mañana" },
        { id: 2, nombre: "Tarde" },
        { id: 3, nombre: "Noche" },
      ],
    });

    return data;
  } catch (error) {
    return [];
  }
};
