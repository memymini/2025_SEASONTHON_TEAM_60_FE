"use client";

import { useMutation } from "@tanstack/react-query";
import { postUpload } from "@/api/upload";
import type { UploadRequest } from "@/api/upload";
import type { ApiResponse, AppError } from "@/lib/types";

export function useUploadMutation() {
  const mutation = useMutation<ApiResponse<void>, AppError, UploadRequest>({
    mutationKey: ["upload", "files"],
    mutationFn: (body) => postUpload(body),
    // async (body) => {
    //   const res = await postUpload(body);
    //   return res;
    // },
  });

  return {
    ...mutation,
  };
}
