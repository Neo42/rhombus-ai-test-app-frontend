import { create, useStore } from "zustand";

interface FileStore {
  file: File | null;
  fileId: number | null;
  setFile: (file: File) => void;
  setFileId: (fileId: number) => void;
  removeFile: () => void;
}

const fileStore = create<FileStore>((set) => ({
  file: null,
  fileId: null,
  removeFile: () => set({ file: null, fileId: null }),
  setFile: (file: File) => set({ file: file }),
  setFileId: (fileId: number) => set({ fileId: fileId }),
}));

export const useFile = () => useStore(fileStore);
