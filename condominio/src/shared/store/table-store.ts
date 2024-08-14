import { createStore } from "zustand/vanilla";

type dataType = { [key: string]: number | string | boolean | undefined | dataType }

export type TableState = {
  isOpenModal: boolean;
  modalItemId?: number;
  modalCategory?: string;
  modalTitle?: string;
  filters?: { [key: string]: unknown };
  data?: dataType;
};

export type TableActions = {
  setOpenedModal: () => void;
  setClosedModal: () => void;
  setModalCategory: (category: string) => void;
  setModalItemId: (id: number | undefined) => void;
  setModalTitle: (title: string) => void;
  setFilters: (filters: {
    [key: string]: unknown;
  }) => void;
  setData: (data: dataType) => void;
};

export type TableStore = TableState & TableActions;

export const initTableStore = (): TableState => {
  return {
    isOpenModal: false,
    modalItemId: undefined,
    modalCategory: undefined,
    modalTitle: undefined,
    filters: undefined,
  };
};

export const defaultInitState: TableState = {
  isOpenModal: false,
  modalItemId: undefined,
  modalCategory: undefined,
  modalTitle: undefined,
};

export const createTableStore = (initState: TableState = defaultInitState) => {
  return createStore<TableStore>()((set) => ({
    ...initState,
    setModalItemId: (id: number | undefined) =>
      set(() => ({ modalItemId: id })),
    setOpenedModal: () => set(() => ({ isOpenModal: true })),
    setClosedModal: () =>
      set(() => ({
        isOpenModal: false,
        modalCategory: undefined,
      })),
    setModalTitle: (title: string) =>
      set(() => ({
        modalTitle: title,
      })),
    setModalCategory: (category: string) =>
      set(() => ({ modalCategory: category })),
    setFilters: (filters: {
      [key: string]: unknown;
    }) =>
      set(() => ({
        filters: filters,
      })),
    setData: (data: dataType) =>
      set(() => ({
        data: data,
      })),
  }));
};
