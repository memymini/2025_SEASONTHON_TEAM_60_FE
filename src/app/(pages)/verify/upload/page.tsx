import Section from "@/components/common/Section";
import FileUploadZone from "@/components/upload/FileUploadZone";
import ConfirmIcon from "@public/assets/confirm-icon.svg";

export default function UploadPage() {
  return (
    <div className="flex h-fit w-full flex-col gap-10">
      <h1 className="headline-large">소득 증명서 업로드</h1>
      <Section className="flex-col">
        <p className="text-text-accent title-medium">
          업로드 전 꼭 확인해 주세요.
        </p>
        <div className="text-text-primary body-large flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <ConfirmIcon />
            <p>
              국세청 홈택스에서 발급한 <strong>‘소득금액증명원'</strong>만
              인정됩니다.
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ConfirmIcon />
            <p>
              주민등록번호 뒷자리는 <strong>반드시 가리고</strong> 업로드
              해주세요.
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ConfirmIcon />
            <p>
              제출된 서류는 인증 즉시 파기되며, 저희는 오직
              <strong>‘소득 구간'</strong>
              정보만을 저장합니다.
            </p>
          </div>
        </div>
      </Section>

      <FileUploadZone />
    </div>
  );
}
