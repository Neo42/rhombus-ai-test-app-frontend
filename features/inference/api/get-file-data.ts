import { apiClient } from "@/lib/api-client";

export interface FileDataResponse {
  id: number;
  original_filename: string;
  uploaded_at: string;
  processing_status:
    | "IDLE"
    | "UPLOADING"
    | "INFERRING"
    | "INFERRED"
    | "INFERENCE_FAILED";
  processing_time: number;
  error_message: string;
  inferred_types: Record<string, string>;
  overridden_types: Record<string, string>;
  effective_types: Record<string, string>;
  row_count: number;
  column_count: number;
  sample_data: Array<Record<string, string>>;
}

export const getFileData = async (
  fileId: number,
): Promise<FileDataResponse> => {
  return apiClient
    .get(`files/${fileId}`, {
      timeout: 10000,
    })
    .json();
};
