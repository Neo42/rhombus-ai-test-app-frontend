import * as React from "react";

import { useQuery } from "@tanstack/react-query";

import { toast } from "sonner";

import { useFile } from "@/features/upload/hooks/useFile";
import { getFileData, type FileDataResponse } from "@/lib/api";
import type { APIError } from "@/lib/api-client";
import { handleApiError } from "@/lib/error-handler";

export const useFileData = () => {
  const [hasNotified, setHasNotified] = React.useState(false);
  const [prevFileId, setPrevFileId] = React.useState<number | null>(null);
  const { fileId } = useFile();

  return useQuery<FileDataResponse, APIError>({
    queryKey: ["file", fileId],
    queryFn: async () => {
      if (!fileId) throw new Error("No file ID provided");
      try {
        return await getFileData(fileId);
      } catch (error) {
        return handleApiError(error);
      }
    },
    enabled: !!fileId,
    refetchInterval: ({ state: { data } }) => {
      if (!data) return false;
      switch (data.processing_status) {
        case "INFERRING":
          return 1000;
        case "UPLOADING":
          return 1000;
        case "INFERRED":
          if (!hasNotified || prevFileId !== fileId) {
            toast.success("File processing completed!");
            setHasNotified(true);
            setPrevFileId(fileId);
          }
          return false;
        case "FAILED":
          if (!hasNotified || prevFileId !== fileId) {
            toast.error(`Processing failed: ${data.error_message}`);
            setHasNotified(true);
            setPrevFileId(fileId);
          }
          return false;
        default:
          return false;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
    retryDelay: 1000,
  });
};
