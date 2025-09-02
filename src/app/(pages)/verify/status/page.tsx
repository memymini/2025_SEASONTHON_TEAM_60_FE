import { StatusStep } from "@/components/status/StatusStep";

export default function StatusPage() {
  return (
    <div className="flex h-fit w-full flex-col gap-10">
      <div>
        <h1 className="headline-large">인증 처리 현황</h1>
        <p className="text-text-secondary body-large">
          제출하신 서류의 처리 과정을 확인하세요.
        </p>
      </div>
      <StatusStep />
    </div>
  );
}
