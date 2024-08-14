import { InputField } from "@/shared/models/InputField.interface";
import { useLotteryInputSelect } from "./useLotteryInputSelect";
import { useProductInputSelect } from "./useProductInputSelect";
import { useScheduleInputSelect } from "./useScheduleInputSelect";

export const useLoteryFilters = (): InputField[] => {
  const { data: lotteryInputSelect } = useLotteryInputSelect();
  const { data: productInputSelect } = useProductInputSelect();
  const { data: scheduleInputSelect } = useScheduleInputSelect();

  const data: InputField[] = [
    lotteryInputSelect,
    productInputSelect,
    scheduleInputSelect,
  ];

  return data;
};
