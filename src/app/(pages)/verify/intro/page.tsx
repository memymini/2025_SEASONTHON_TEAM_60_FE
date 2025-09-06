import Section from "@/components/common/Section";
import DocsIcon from "@public/assets/docs-icon.svg";
import SecurityIcon from "@public/assets/security-icon.svg";
import BadgeIcon from "@public/assets/badge-icon.svg";
import ConfirmIcon from "@public/assets/confirm-icon.svg";
import ForbiddenIcon from "@public/assets/forbidden-icon.svg";
import Button from "@/components/common/Button";

type IconComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const steps: {
  id: number;
  icon: IconComp;
  title: string;
  description: string;
}[] = [
  {
    id: 1,
    icon: DocsIcon,
    title: "증명서류 업로드",
    description: "국세청 홈택스에서 발급한 소득금액증명 서류를 업로드합니다.",
  },
  {
    id: 2,
    icon: SecurityIcon,
    title: "정보 추출 및 영구 파기",
    description:
      "소득 구간 정보만 확인한 뒤 주민번호와 주소 등이 포함된 원본 파일은 즉시 복구 불가능하게 파기합니다.",
  },
  {
    id: 3,
    icon: BadgeIcon,
    title: "뱃지 발급 완료",
    description:
      "안전하게 당신의 프로필에 해당 소득 구간을 증명하는 뱃지가 발급됩니다.",
  },
];

export default function IntroPage() {
  return (
    <div className="ustify-center flex h-fit w-full max-w-300 flex-col gap-10">
      <h1 className="headline-large text-text-primary">
        베리뱃지의 소득증명이란?
      </h1>
      <Section className="bg-secondary flex-col border-0">
        <p className="text-text-primary title-medium">
          왜 소득을 증명해야 하나요?
        </p>
        <p className="text-text-secondary body-large">
          온라인에서 검증되지 않은 재정적 주장이 만연한 가운데, VeriBadge는
          사용자의 소득 범위를 세무서류를 통해 인증함으로써 신뢰할 수 있는 정보
          생태계를 조성하고 재정적 피해로부터 사용자를 보호하는 것을 목표로
          합니다.
        </p>
      </Section>

      <div
        id="intro"
        className="my-10 flex h-fit w-full items-start justify-around gap-5"
      >
        {steps.map(({ id, icon: IconComp, title, description }) => (
          <div
            key={id}
            className="flex max-w-80 flex-col items-center justify-center gap-4"
          >
            <div className="bg-primary flex h-13 w-13 items-center justify-center rounded-full">
              <IconComp
                width={24}
                height={24}
                className="text-text-inverse h-8 w-8"
              />
            </div>
            <p className="title-medium text-text-primary">{title}</p>
            <p className="body-large text-text-secondary text-center whitespace-pre-line">
              {description}
            </p>
          </div>
        ))}
      </div>

      <Section className="flex-col">
        <p className="text-text-primary title-medium">
          베리뱃지는 사용자의 프라이버시를 최우선으로 생각합니다.
        </p>
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <ConfirmIcon className="text-success size-6" />
              <p className="text-text-primary title-small">저장하는 정보</p>
            </div>
            <p className="text-text-secondary body-large">
              - 인증된 소득 구간 정보
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <ForbiddenIcon className="text-primary size-6" />
              <p className="text-text-primary title-small">
                저장하지 않는 정보
              </p>
            </div>
            <p className="text-text-secondary body-large">
              - 주민등록번호, 주소 등 모든 개인 식별 정보
            </p>
            <p className="text-text-secondary body-large">
              - 사용자의 정확한 소득 금액
            </p>
            <p className="text-text-secondary body-large">
              - 업로드한 서류 원본 파일
            </p>
          </div>
        </div>
      </Section>

      <Button href="/verify/upload" size="md">
        안심하고 소득 증명 시작하기
      </Button>
    </div>
  );
}
