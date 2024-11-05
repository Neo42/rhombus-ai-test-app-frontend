import { create } from "zustand";

interface ToggleDialogStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useToggleDialog = create<ToggleDialogStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => {
    set({ open });
  },
}));
