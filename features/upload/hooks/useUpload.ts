import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { useFile } from "@/features/upload/hooks/useFile";
import { useToggleDialog } from "@/features/upload/hooks/useToggleDialog";
import { uploadFile, type UploadResponse } from "@/lib/api";
import type { APIError } from "@/lib/api-client";
import { handleApiError } from "@/lib/error-handler";

export const useUpload = () => {
  const { setFileId, removeFile } = useFile();
  const { setOpen } = useToggleDialog();
  return useMutation<UploadResponse, APIError, File>({
    mutationFn: async (file) => {
      try {
        return await uploadFile(file);
      } catch (error) {
        return handleApiError(error);
      }
    },
    onError: (error) => {
      toast.error(error.detail);
    },
    onSuccess: (data, file) => {
      setOpen(false);
      removeFile();
      setFileId(data.file_id);
      toast.success(`${file.name} uploaded successfully.`);
    },
  });
};
