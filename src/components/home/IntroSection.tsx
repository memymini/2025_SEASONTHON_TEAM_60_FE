import DocsIcon from "@public/assets/docs-icon.svg";
import LinkIcon from "@public/assets/link-icon.svg";
import VerifyIcon from "@public/assets/verify-icon.svg";

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
    title: "1. 자격 인증",
    description:
      "소득금액증명원 등 신뢰할 수 있는\n서류로 당신의 자격을 간편하게 인증하세요.",
  },
  {
    id: 2,
    icon: LinkIcon,
    title: "2. 플랫폼 연동",
    description: "자주 활동하는 플랫폼을\n연결하고 고유 태그를 발급받으세요.",
  },
  {
    id: 3,
    icon: VerifyIcon,
    title: "3. 자격 증명",
    description:
      "고유 태그를 사용해 모두에게\n검증된 당신의 자격을 보여주세요.",
  },
];

export default function IntroSection() {
  return (
    <section
      id="intro"
      className="bg-surface-2 flex h-fit w-full flex-col items-center justify-center gap-16 px-10 py-36"
    >
      <p className="headline-large text-text-primary text-center">
        단 3단계로 당신의 전문성을 증명하세요.
      </p>
      <div className="flex h-fit w-fit items-start gap-28">
        {steps.map(({ id, icon: IconComp, title, description }) => (
          <div
            key={id}
            className="flex max-w-336 flex-col items-center justify-center gap-6"
          >
            <div className="bg-primary flex h-18 w-18 items-center justify-center rounded-full">
              <IconComp
                width={32}
                height={32}
                className="text-text-inverse h-8 w-8"
              />
            </div>
            <p className="headline-small text-text-primary">{title}</p>
            <p className="title-medium text-text-secondary text-center whitespace-pre-line">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
