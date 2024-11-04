import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UploadStore {
  uploadedFile: UploadedFile | null;

  setUploadedFile: (file: UploadedFile) => void;
}

export interface UploadedFile {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  type: string;
  size: number;
  webkitRelativePath: string;
}

export const useUploadedFile = create(
  persist<UploadStore>(
    (set) => ({
      uploadedFile: null,

      setUploadedFile: (file: UploadedFile) => {
        set({
          uploadedFile: {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            lastModifiedDate: new Date(file.lastModified),
            webkitRelativePath: file.name,
          },
        });
      },
    }),
    {
      name: "uploadStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
