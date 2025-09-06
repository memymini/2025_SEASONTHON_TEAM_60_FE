import Button from "@/components/common/Button";
import Section from "@/components/common/Section";

export default function ConnectChannel() {
  return (
    <Section className="flex-col">
      <p className="headline-small text-text-primary">
        YouTube 채널에 연결하고 고유 태그 발급받기
      </p>
      <Button size="md">채널 연동 및 태그 생성하기</Button>
    </Section>
  );
}
