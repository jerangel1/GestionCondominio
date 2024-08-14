import { useQuery } from "@tanstack/react-query";

import { fetchLottery } from "@/shared/api/services/lottery.service";
import { InputField } from "@/shared/models/InputField.interface";
import { OptionInterface } from "@/shared/models/Option.interface";

export const useLotteryInputSelect = (): { data: InputField } => {
  const { data: lotteries } = useQuery({
    queryKey: ["fetchLottery"],
    queryFn: async (): Promise<OptionInterface[]> => {
      const data = await fetchLottery();
      return data.map((lottery) => ({
        text: lottery.nombre,
        value: lottery.id,
      }));
    },
    retry: false,
  });

  const productInputSelect = {
    key: "lottery",
    label: "Lotería",
    value: "",
    data: lotteries ?? [],
  } as InputField;

  return { data: productInputSelect };
};
