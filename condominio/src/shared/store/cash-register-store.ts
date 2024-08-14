import { createStore } from "zustand/vanilla";

export type ItemCategories = "EXPENSE" | "INCOME";

export type CashRegisterState = {
  isOpenMenu: boolean;
  isOpenTransfer: boolean;
  itemId?: number;
  itemCategory?: ItemCategories;
  itemCode?: string;
  level: number;
  title: string;
  editableByUser: boolean;
};

export type CashRegisterActions = {
  setItemCategory: (category: ItemCategories) => void;
  setItemCode: (code: string) => void;
  setIsOpenMenu: (isOpen: boolean) => void;
  setItemId: (id: number | undefined) => void;
  setLevel: (level: number) => void;
  setTitle: (title: string) => void;
  setEditableByUser: (editable: boolean) => void;
  setIsOpenTransfer: (isOpen: boolean) => void;
};

export type CashRegisterStore = CashRegisterState & CashRegisterActions;

export const initCashRegisterStore = (): CashRegisterState => {
  return {
    isOpenMenu: false,
    itemId: undefined,
    itemCategory: undefined,
    itemCode: undefined,
    level: 1,
    title: "",
    editableByUser: false,
    isOpenTransfer: false
  };
};

export const defaultInitState: CashRegisterState = {
  isOpenMenu: false,
  isOpenTransfer: false,
  itemId: undefined,
  itemCategory: undefined,
  itemCode: undefined,
  level: 1,
  title: "",
  editableByUser: false
};

export const createCashRegisterStore = (
  initState: CashRegisterState = defaultInitState
) => {
  return createStore<CashRegisterStore>()((set) => ({
    ...initState,
    setItemId: (id: number | undefined) => set(() => ({itemId: id})),
    setIsOpenMenu: (isOpen: boolean) => set(() => ({ isOpenMenu: isOpen })),
    setItemCategory: (category: ItemCategories) =>
      set(() => ({ itemCategory: category })),
    setItemCode: (code: string) => set(() => ({ itemCode: code })),
    setLevel: (level: number) => set(() => ({ level })),
    setTitle: (title: string) => set(() => ({title })),
    setEditableByUser: (editable: boolean) => set(() => ({
      editableByUser: editable
    })),
    setIsOpenTransfer: (isOpen: boolean) => set(() => ({ 
      isOpenTransfer: isOpen
    }))
  }));
};
