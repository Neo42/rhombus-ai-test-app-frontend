import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  uploadFile,
  UploadResponse,
} from "@/features/inference/api/upload-file";
import { useFile } from "@/features/inference/hooks/use-file";
import { useToggleDialog } from "@/features/inference/hooks/use-toggle-dialog";
import type { APIError } from "@/lib/api-client";
import { handleApiError } from "@/lib/error-handler";

export const useUpload = () => {
  const { setFileId, removeFile } = useFile();
  const { setIsUploadDialogOpen } = useToggleDialog();
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
      setIsUploadDialogOpen(false);
      removeFile();
      setFileId(data.file_id);
      toast.success(`${file.name} uploaded successfully.`);
    },
  });
};
