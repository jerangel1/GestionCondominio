import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type CashRegisterStore,
  createCashRegisterStore,
} from "@/shared/store/cash-register-store";

export type CashRegisterStoreApi = ReturnType<typeof createCashRegisterStore>;

export const CashRegisterStoreContext = createContext<
  CashRegisterStoreApi | undefined
>(undefined);

export interface CashRegisterStoreProviderProps {
  children: ReactNode;
}

export const CashRegisterStoreProvider = ({
  children,
}: CashRegisterStoreProviderProps) => {
  const storeRef = useRef<CashRegisterStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCashRegisterStore();
  }

  return (
    <CashRegisterStoreContext.Provider value={storeRef.current}>
      {children}
    </CashRegisterStoreContext.Provider>
  );
};

export const useCashRegisterStore = <T,>(
  selector: (store: CashRegisterStore) => T
): T => {
  const cashRegisterStoreContext = useContext(CashRegisterStoreContext);

  if (!cashRegisterStoreContext) {
    throw new Error(
      "useCashRegisterStore must be used within CashRegisterStoreProvider"
    );
  }

  return useStore(cashRegisterStoreContext, selector);
};
