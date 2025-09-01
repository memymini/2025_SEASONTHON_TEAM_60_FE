"use client";
import { useEffect } from "react";
import Section from "../common/Section";
import FileUpload from "./FileUpload";
import { useFileUploadMutation } from "@/hooks/useFileUpload";
import UploadIcon from "@public/assets/upload-icon.svg";
export default function FileUploadZone() {
  const {
    mutateAsync,
    isPending, // 로딩
    error, // Error 객체
    data, // FileInfo[] 결과
    progress, // {0: 0~100, 1: ...}
    reset, // 뮤테이션 상태 초기화
    resetProgress, // 진행률 초기화(커스텀)
  } = useFileUploadMutation();

  // 미리보기 URL 정리
  useEffect(() => {
    return () => {
      data?.forEach((f) => f.url && URL.revokeObjectURL(f.url));
    };
  }, [data]);

  const handleSelect = async (files: File[]) => {
    await mutateAsync(files);
  };

  const handleClear = () => {
    reset();
    resetProgress();
  };
  const hasFiles = (data?.length ?? 0) > 0;
  return (
    <div>
      <Section className="bg-opacity-100 justify-center rounded-xl border-4 border-dashed py-40">
        {/* 1. 업로드 중(애니메이션 추가 예정) */}
        {isPending && (
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <UploadIcon className="h-13 w-13 animate-pulse" />
            <p className="title-large text-text-primary">업로드 중…</p>
          </div>
        )}

        {/* 2. 업로드 완료 */}
        {!isPending && hasFiles && (
          <div className="flex w-full max-w-[720px] flex-col items-center gap-4 px-6">
            <p className="title-large text-text-primary">선택된 파일</p>

            <ul className="w-full space-y-3">
              {data!.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex items-center gap-3">
                  {f.url ? (
                    <img
                      src={f.url}
                      alt={f.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    <div className="bg-surface-3 text-text-secondary grid h-12 w-12 place-items-center rounded text-xs">
                      {f.type.split("/")[1]?.toUpperCase() ?? "FILE"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-text-primary truncate">{f.name}</p>
                    <p className="text-text-secondary text-xs">
                      {(f.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    {/* 진행률(이미 완료면 100%) */}
                    <div className="bg-surface-3 mt-2 h-1.5 w-full rounded">
                      <div
                        className="bg-text-accent h-1.5 rounded transition-[width]"
                        style={{ width: `${progress[i] ?? 100}%` }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <button
                className="text-text-accent text-sm underline"
                onClick={() => {
                  // 메모리 정리(미리보기 URL 사용 시)
                  data!.forEach((f) => f.url && URL.revokeObjectURL(f.url));
                  handleClear(); // reset() + resetProgress() 내부에서 처리
                }}
              >
                목록 비우기
              </button>
            </div>
          </div>
        )}

        {/* 3. 업로드 전 */}
        {!isPending && !hasFiles && (
          <FileUpload onSelect={handleSelect} multiple={false} maxSizeMB={10}>
            <div className="flex h-fit w-fit flex-col items-center justify-center gap-3">
              <UploadIcon className="h-13 w-13" />
              <p className="title-large text-text-primary">
                여기에 파일을 끌어다 놓거나 클릭하여 업로드
              </p>
              <p className="body-large text-text-secondary">
                지원 파일 형식:PDF, JPG, PNG (최대 10MB)
              </p>
            </div>
          </FileUpload>
        )}
      </Section>
    </div>
  );
}
