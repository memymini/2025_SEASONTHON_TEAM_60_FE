import { api } from "@/lib/fetcher";

export type UploadRequest = {
  fileName: string;
  fileId: string;
};

export const postUpload = (body: UploadRequest) =>
  api.post<void, UploadRequest>("/certificates/income/upload", body);
