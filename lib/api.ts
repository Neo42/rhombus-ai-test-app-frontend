import { apiClient } from "@/lib/api-client";

export interface UploadResponse {
  file_id: number;
  message: string;
}

export interface FileDataResponse {
  id: number;
  original_filename: string;
  uploaded_at: string;
  processing_status: string;
  processing_time: number;
  error_message: string;
  inferred_types: Record<string, string>;
  overridden_types: Record<string, string>;
  effective_types: Record<string, string>;
  row_count: number;
  column_count: number;
  sample_data: Array<Record<string, string>>;
}

export interface DataTypeOverrideResponse {
  file_id: number;
  column_name: string;
  custom_type: string;
  message: string;
}

export interface ErrorResponse {
  detail: string;
  code: string;
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient
    .post("upload", {
      body: formData,
      timeout: 30000,
    })
    .json();
};

export const getFileData = async (
  fileId: number,
): Promise<FileDataResponse> => {
  return apiClient
    .get(`files/${fileId}`, {
      timeout: 10000,
    })
    .json();
};

export const updateColumnType = async ({
  fileId,
  columnName,
  customType,
}: {
  fileId: number;
  columnName: string;
  customType: string;
}): Promise<DataTypeOverrideResponse> => {
  return apiClient
    .patch(`files/${fileId}/columns/${columnName}`, {
      json: { custom_type: customType },
      timeout: 10000,
    })
    .json();
};
