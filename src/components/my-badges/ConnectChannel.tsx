import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import Section from "@/components/common/Section";

export default function ConnectChannel() {
  return (
    <Section className="flex-col">
      <p className="headline-small text-text-primary">
        YouTube 채널에 연결하고 고유 태그 발급받기
      </p>
      <div className="flex h-fit w-full items-end justify-between gap-4">
        <div className="min-w-0 flex-1">
          <InputField
            label="YouTube 채널 주소 입력"
            placeholder="https://youtube.com/veriBadge"
          />
        </div>
        <Button size="lg">채널 연동 및 태그 생성하기</Button>
      </div>
    </Section>
  );
}
