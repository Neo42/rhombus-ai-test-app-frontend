import { create, useStore } from "zustand";

interface FileStore {
  file: File | null;
  setFile: (file: File) => void;
  removeFile: () => void;
}

const fileStore = create<FileStore>((set) => ({
  file: null,
  removeFile: () => set({ file: null }),
  setFile: (file: File) => set({ file: file }),
}));

export const useFile = () => useStore(fileStore);
