"use client";
import Button from "@/components/common/Button";
import Section from "@/components/common/Section";
import { useRouter } from "next/navigation";
import BadgeIcon2 from "@public/assets/badge-icon2.svg";

export default function DashboardPage() {
  const router = useRouter();
  const data = {
    name: "Sophia-Lee",
    badge: "SILVER",
    status: "인증 완료",
    date: "2024년 10월 26일",
  };
  return (
    <div className="flex h-fit w-full flex-col gap-10">
      <h1 className="headline-large">{data.name}님, 안녕하세요!</h1>

      {/* 뱃지가 없는 경우 UI */}
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

      {/* 뱃지가 있는 경우 UI */}
      <Section>
        <div className="flex h-full flex-1 flex-col gap-5">
          <h2 className="headline-small text-text-primary">나의 뱃지 현황</h2>
          <div className="bg-surface-2 border-surface-3 flex h-fit justify-between rounded-xl border-1 p-7">
            <div className="flex">
              <p className="text-6xl">🍓</p>
              <div>
                <p className="label-large text-text-accent">{data.status}</p>
                <p className="headline-small text-text-primary">{data.badge}</p>
              </div>
            </div>

            <div className="flex h-full flex-col items-end justify-between">
              <p className="label-large text-text-secondary">인증일</p>
              <p className="title-medium text-text-primary">{data.date}</p>
            </div>
          </div>
          <Button
            size="md"
            type="button"
            onClick={() => router.push("/my-badges")}
          >
            내 뱃지 관리 및 고유 태그 확인하기
          </Button>
        </div>
      </Section>
    </div>
  );
}
