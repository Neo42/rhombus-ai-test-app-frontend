import { apiClient } from "@/lib/api-client";

export interface DataTypeOverrideRequest {
  fileId: number;
  columnName: string;
  customType: string;
}

export interface DataTypeOverrideResponse {
  file_id: number;
  column_name: string;
  custom_type: string;
  message: string;
}

export const updateColumnType = async ({
  fileId,
  columnName,
  customType,
}: DataTypeOverrideRequest): Promise<DataTypeOverrideResponse> => {
  return apiClient
    .patch(`files/${fileId}/columns/${columnName}`, {
      json: { custom_type: customType },
      timeout: 10000,
    })
    .json();
};
