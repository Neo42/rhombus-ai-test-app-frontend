import { create, useStore } from "zustand";

interface ToggleDialogStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const toggleDialogStore = create<ToggleDialogStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export const useToggleDialog = () => useStore(toggleDialogStore);
