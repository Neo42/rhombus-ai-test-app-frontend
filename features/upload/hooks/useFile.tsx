import { create } from "zustand";

interface FileStore {
  file: File | null;
  setFile: (file: File) => void;
  removeFile: () => void;
}

export const useFile = create<FileStore>((set) => ({
  file: null,
  removeFile: () => set({ file: null }),
  setFile: (file: File) => set({ file: file }),
}));
