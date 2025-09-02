"use client";
import { useModalStore } from "@/stores/modal";
import Button from "../common/Button";

export default function UploadModal() {
  const close = useModalStore((s) => s.close);
  return (
    <div className="bg-surface-1 flex h-fit w-fit flex-col items-end gap-18 rounded-xl">
      <div className="flex w-full flex-col items-start gap-4">
        <p className="title-large text-text-primary">제출 완료</p>
        <p className="text-text-secondary body-large">
          서류가 접수되었습니다.
          <br />
          인증 결과는 인증 처리 현황에서 확인하실 수 있습니다.
        </p>
      </div>
      <Button size="md" onClick={close}>
        확인
      </Button>
    </div>
  );
}
