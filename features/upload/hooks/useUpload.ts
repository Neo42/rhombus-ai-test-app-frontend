import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { uploadApi } from "@/features/upload/api/upload";
import type { UploadResponse } from "@/features/upload/api/upload";
import { useFile } from "@/features/upload/hooks/useFile";
import { useToggleDialog } from "@/features/upload/hooks/useToggleDialog";
import type { APIError } from "@/lib/api-client";
import { handleApiError } from "@/lib/error-handler";

export const useUpload = () => {
  const { setOpen } = useToggleDialog();
  const { removeFile } = useFile();
  return useMutation<UploadResponse, APIError, File>({
    mutationFn: async (file) => {
      try {
        return await uploadApi.uploadFile(file);
      } catch (error) {
        return handleApiError(error);
      }
    },
    onError: (error) => {
      toast.error(error.detail);
    },
    onSuccess: (_data, file) => {
      toast.success(`${file.name} uploaded successfully.`);
      setOpen(false);
      removeFile();
    },
  });
};
