import { useQuery } from "@tanstack/react-query";

import { fetchSchedule } from "@/shared/api/services/schedule.service";
import { InputField } from "@/shared/models/InputField.interface";
import { OptionInterface } from "@/shared/models/Option.interface";

export const useScheduleInputSelect = (): { data: InputField } => {
  const { data: schedules } = useQuery({
    queryKey: ["fetchSchedule"],
    queryFn: async (): Promise<OptionInterface[]> => {
      const data = await fetchSchedule();
      return data.map((schedule) => ({
        text: schedule.nombre,
        value: schedule.id,
      }));
    },
    retry: false,
  });

  const scheduleInputSelect = {
    key: "schedule",
    label: "Horario",
    value: "",
    data: schedules ?? [],
  } as InputField;

  return { data: scheduleInputSelect };
};
