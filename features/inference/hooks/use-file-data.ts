import { useQuery } from "@tanstack/react-query";

import {
  FileDataResponse,
  getFileData,
} from "@/features/inference/api/get-file-data";
import { useFile } from "@/features/inference/hooks/use-file";
import type { APIError } from "@/lib/api-client";
import { handleApiError } from "@/lib/error-handler";

export const useFileData = () => {
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
      return ["UPLOADING", "INFERRING"].includes(data.processing_status)
        ? 1000
        : false;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
