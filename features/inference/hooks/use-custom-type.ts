import { create, useStore } from "zustand";

interface CustomTypeStore {
  customType: string;
  setCustomType: (customType: string) => void;
  columnName: string;
  setColumnName: (columnName: string) => void;
}

const customTypeStore = create<CustomTypeStore>((set) => ({
  customType: "",
  setCustomType: (customType: string) => set({ customType }),
  columnName: "",
  setColumnName: (columnName: string) => set({ columnName }),
}));

export const useCustomType = () => useStore(customTypeStore);
