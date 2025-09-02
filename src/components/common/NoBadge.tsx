"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Section from "./Section";
import BadgeIcon2 from "@public/assets/badge-icon2.svg";

export default function NoBadge() {
  const router = useRouter();
  return (
    <Section className="justify-between">
      <div className="flex h-full flex-1 flex-col gap-5">
        <h2 className="headline-small text-text-primary">
          아직 발급받은 뱃지가 없어요.
        </h2>
        <p className="text-text-primary body-large">
          첫번째 뱃지를 발급받고 당신의 신뢰도를 증명해보세요.
          <br />
          1차 해커톤에서는 소득 증명 뱃지를 발급받을 수 있습니다.
        </p>
        <Button
          size="md"
          type="button"
          onClick={() => router.push("/verify/upload")}
        >
          소득 증명 인증 시작하기
        </Button>
      </div>
      <div className="bg-surface-3 flex h-full w-40 items-center justify-center">
        <BadgeIcon2 className="h-20 w-20" />
      </div>
    </Section>
  );
}
