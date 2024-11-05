import { apiClient } from "@/lib/api-client";

export interface UploadResponse {
  file_id: number;
  message: string;
}

export interface ErrorResponse {
  detail: string;
  code: string;
}

export const uploadApi = {
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    return apiClient
      .post("upload", {
        body: formData,
        timeout: 30000,
      })
      .json();
  },
};
