import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type ModalStore,
  createModalStore,
  defaultInitState,
} from "@/shared/store/modal-store";
import { ModalProps } from "@/components/ui/Modal";

export type ModalStoreApi = ReturnType<typeof createModalStore>;

export const ModalStoreContext = createContext<
  ModalStoreApi | undefined
>(undefined);

export type ModalStoreProviderProps = {
  children: ReactNode;
  initialStep?: string;
} & ModalProps;

export const ModalStoreProvider = ({
  children,
  initialStep,
  ...props
}: ModalStoreProviderProps) => {
  const storeRef = useRef<ModalStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createModalStore({
      ...defaultInitState,
      size: props.size,
      title: props.title || "",
      onClose: props.onClose,
      currentStep: initialStep
    });
  }


  return (
    <ModalStoreContext.Provider value={storeRef.current}>
      {children}
    </ModalStoreContext.Provider>
  );
};

export const useModalStore = <T,>(
  selector: (store: ModalStore) => T
): T => {
  const cashRegisterStoreContext = useContext(ModalStoreContext);

  if (!cashRegisterStoreContext) {
    throw new Error(
      "useModalStore must be used within ModalStoreProvider"
    );
  }

  return useStore(cashRegisterStoreContext, selector);
};
