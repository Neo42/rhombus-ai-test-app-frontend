import { apiClient } from "@/lib/api-client";

export interface UploadResponse {
  file_id: number;
  message: string;
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
