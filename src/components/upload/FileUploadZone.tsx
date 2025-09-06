"use client";

import { useEffect, useMemo, useState } from "react";
import Section from "../common/Section";
import FileUpload from "./FileUpload";
import { useUploadMutation } from "@/hooks/useFileUpload";
import UploadIcon from "@public/assets/upload-icon.svg";
import Button from "../common/Button";
import type { UploadRequest } from "@/api/upload";

export default function FileUploadZone() {
  // 로컬 선택 파일 & 미리보기
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutateAsync, isPending, reset } = useUploadMutation();

  // 파일 선택 시 미리보기 URL 생성/정리
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const hasFile = !!file;

  const handleSelect = async (files: File[]) => {
    const f = files?.[0];
    if (!f) return;
    setFile(f);
    reset();
  };

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFile(null);
    reset();
  };

  // 제출
  const handleSubmit = async () => {
    if (!file) return;

    const body: UploadRequest = {
      fileName: file.name,
      fileId: file.name, // ← 실제에선 업로드/프리사인 후 받은 id로 대체
    };

    try {
      await mutateAsync(body);
      setPreviewUrl(null);
      setFile(null);
      reset();
    } catch (e) {
      console.error(e);
    }
  };

  const fileSizeMB = useMemo(
    () => (file ? (file.size / (1024 * 1024)).toFixed(2) : "0.00"),
    [file],
  );

  return (
    <div className="flex flex-col gap-10">
      <Section className="bg-opacity-100 h-100 items-center justify-center rounded-xl border-4 border-dashed">
        {/* 1. 업로드 중 */}
        {isPending && (
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <UploadIcon className="h-13 w-13 animate-pulse" />
            <p className="title-large text-text-primary">업로드 중…</p>
          </div>
        )}

        {/* 2. 파일 선택됨 */}
        {!isPending && hasFile && (
          <div className="flex w-full max-w-180 flex-col items-center justify-center gap-4 px-6">
            <p className="title-large text-text-primary">선택된 파일</p>

            <ul className="w-full space-y-3">
              <li className="flex items-center justify-center gap-3">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt={file!.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                ) : (
                  <div className="bg-surface-3 text-text-secondary grid h-12 w-12 place-items-center rounded text-xs">
                    {file!.type.split("/")[1]?.toUpperCase() ?? "FILE"}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-text-primary truncate">{file!.name}</p>
                  <p className="text-text-secondary text-xs">{fileSizeMB} MB</p>
                </div>
              </li>
            </ul>

            <div className="mt-4">
              <button
                className="text-text-accent text-sm underline"
                onClick={handleClear}
              >
                목록 비우기
              </button>
            </div>
          </div>
        )}

        {/* 3. 업로드 전 */}
        {!isPending && !hasFile && (
          <FileUpload onSelect={handleSelect} multiple={false} maxSizeMB={10}>
            <div className="flex h-fit w-fit flex-col items-center justify-center gap-3">
              <UploadIcon className="h-13 w-13" />
              <p className="title-large text-text-primary">
                여기에 파일을 끌어다 놓거나 클릭하여 업로드
              </p>
              <p className="body-large text-text-secondary">
                지원 파일 형식: PDF, JPG, PNG (최대 10MB)
              </p>
            </div>
          </FileUpload>
        )}
      </Section>

      <Button onClick={handleSubmit} size="md" disabled={!hasFile || isPending}>
        제출하기
      </Button>
    </div>
  );
}
