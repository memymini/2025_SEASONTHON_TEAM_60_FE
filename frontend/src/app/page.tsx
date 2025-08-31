import Button from "@/components/common/Button";
import TopBar from "@/components/home/NavBar";
import Image from "next/image";
import DocsIcon from "@public/assets/docs-icon.svg?url";
import LinkIcon from "@public/assets/link-icon.svg?url";
import VerifyIcon from "@public/assets/verify-icon.svg?url";
import Footer from "@/components/home/Footer";

const steps = [
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

export default function HomePage() {
  return (
    <main>
      <TopBar />

      <section className="bg-surface-1 flex h-screen flex-col items-center justify-center gap-36">
        <p className="headline-large text-text-primary text-center">
          온라인 발언에 실명보다 강력한
          <br />
          <span className="text-text-accent">신뢰</span>를 더하다
        </p>
        <div className="flex gap-6">
          <Button size="lg">지금 신뢰 얻기</Button>
          <Button size="lg" className="bg-surface-3 text-text-secondary">
            확장 프로그램 다운로드
          </Button>
        </div>
      </section>

      <section className="bg-surface-2 flex h-fit w-full flex-col items-center justify-center gap-16 px-32 py-36">
        <p className="headline-large text-text-primary text-center">
          단 3단계로 당신의 전문성을 증명하세요.
        </p>
        <div className="flex h-fit w-fit items-start gap-28">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex max-w-336 flex-col items-center justify-center gap-6"
            >
              <div className="bg-primary flex h-18 w-18 items-center justify-center rounded-full">
                <Image src={step.icon} alt="icon" className="h-8 w-8" />
              </div>
              <p className="headline-small text-text-primary">{step.title}</p>
              <p className="title-medium text-text-secondary text-center whitespace-pre-line">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-1 flex h-screen w-full flex-col items-center justify-center gap-16 px-32 py-36">
        <p className="headline-large text-text-primary text-center">
          YouTube 댓글에서 이렇게 보여집니다.
        </p>
        <div className="bg-surface-3 h-full w-full max-w-4xl"></div>
      </section>

      <section className="bg-surface-2 flex h-fit w-full flex-col items-center justify-center gap-16 px-32 py-36">
        <p className="headline-large text-text-primary text-center">
          지금 바로 당신의 의견에 신뢰를 더하세요.
        </p>
        <Button size="lg">VeriBadge 시작하기</Button>
      </section>

      <Footer />
    </main>
  );
}
