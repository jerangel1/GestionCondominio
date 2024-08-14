import { ModalProps } from "@/components/ui";
import { createStore } from "zustand/vanilla";

export type ItemCategories = "EXPENSE" | "INCOME";

export type ModalState = {
  size: ModalProps["size"];
  title: string;
  onClose: () => void;
  currentStep?: string;
};

export type ModalActions = {
  setCurrentStep: (step: string) => void;
};

export type ModalStore = ModalState & ModalActions;

export const initModalStore = (): ModalState => {
  return {
    size: "medium",
    onClose: () => {
      return;
    },
    title: "",
    currentStep: undefined
  };
};

export const defaultInitState: ModalState = {
  size: "medium",
  title: "",
  onClose: () => {
    return;
  },
  currentStep: undefined
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    setCurrentStep: (step: string) =>
      set(() => ({
        currentStep: step,
      })),
  }));
};
