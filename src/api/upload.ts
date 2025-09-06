import { api } from "@/lib/fetcher";

export const postUpload = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post<void, void>(
    "/certificates/income/upload",
    undefined,
    formData,
  );
};
