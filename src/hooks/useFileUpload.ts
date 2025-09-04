"use client";

import { useMutation } from "@tanstack/react-query";
import { postUpload } from "@/api/upload";
import type { UploadRequest } from "@/api/upload";
import type { ApiResponse, AppError } from "@/lib/fetcher";

export function useUploadMutation() {
  const mutation = useMutation<ApiResponse<void>, AppError, UploadRequest>({
    mutationKey: ["upload", "files"],
    mutationFn: async (body) => {
      const res = await postUpload(body);
      return res;
    },
    onError: () => {
      // 실패 시 진행률 초기화하고 싶으면 열기
      // 실패시 에러처리 필요
    },
    onSettled: () => {},
  });

  return {
    ...mutation,
  };
}
