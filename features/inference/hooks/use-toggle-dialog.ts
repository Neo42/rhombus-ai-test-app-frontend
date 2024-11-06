import { create, useStore } from "zustand";

interface ToggleDialogStore {
  isUploadDialogOpen: boolean;
  setIsUploadDialogOpen: (isOpen: boolean) => void;
  isCustomTypeDialogOpen: boolean;
  setIsCustomTypeDialogOpen: (isOpen: boolean) => void;
}

const toggleDialogStore = create<ToggleDialogStore>((set) => ({
  isUploadDialogOpen: false,
  setIsUploadDialogOpen: (isOpen: boolean) =>
    set({ isUploadDialogOpen: isOpen }),
  isCustomTypeDialogOpen: false,
  setIsCustomTypeDialogOpen: (isOpen: boolean) =>
    set({ isCustomTypeDialogOpen: isOpen }),
}));

export const useToggleDialog = () => useStore(toggleDialogStore);
