"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { mockLocalUploads } from "@/services/fileUpload";
import type { FileInfo } from "../schemas/file";

export function useFileUploadMutation() {
  const [progress, setProgress] = useState<Record<number, number>>({});

  const mutation = useMutation<FileInfo[], Error, File[]>({
    mutationKey: ["upload", "files"],
    mutationFn: (files) =>
      mockLocalUploads(files, (i, pct) =>
        setProgress((s) => ({ ...s, [i]: pct })),
      ),
    onSettled: () => {
      // 필요하면 완료 후 progress 초기화
      // setProgress({});
    },
  });

  return { ...mutation, progress, resetProgress: () => setProgress({}) };
}
