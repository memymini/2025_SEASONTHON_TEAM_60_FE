"use client";
import { cva } from "class-variance-authority";
import CheckIcon from "@public/assets/check-icon.svg";
import TimerIcon from "@public/assets/timer-icon.svg";
import VerifiedIcon from "@public/assets/verified-icon.svg";
import RejectedIcon from "@public/assets/rejected-icon.svg";
import { cn } from "@/lib/cn";
import Section from "@/components/common/Section";
import { Status, IconComp } from "@/lib/types";
import { useStatusQuery } from "@/hooks/useStatus";
import { Skeleton } from "@/components/common/Skeleton";
import Error from "@/app/error";

const statusVariants = cva(
  "flex w-13 h-13 justify-center items-center rounded-full",
  {
    variants: {
      tone: {
        danger: "bg-primary text-text-inverse",
        muted: "bg-surface-3 text-text-inverse",
        success: "bg-success text-text-inverse",
      },
    },
    defaultVariants: { tone: "muted" },
  },
);

type Color = "danger" | "muted" | "success";
type Step = "step1" | "step2" | "step3";

const palette: Record<Status, Record<Step, Color>> = {
  NOT_SUBMITTED: {
    step1: "muted",
    step2: "muted",
    step3: "muted",
  },
  SUBMITTED: {
    step1: "success",
    step2: "danger",
    step3: "muted",
  },
  VERIFIED: {
    step1: "success",
    step2: "success",
    step3: "success",
  },
  REJECTED: {
    step1: "success",
    step2: "success",
    step3: "danger",
  },
} as const;

const STEPS: {
  key: Step;
  label: string;
  icon: IconComp;
  description?: string;
}[] = [
  {
    key: "step1",
    label: "접수 완료",
    icon: CheckIcon,
    description: "제출하신 서류가 정상적으로 접수되었습니다.",
  },
  {
    key: "step2",
    label: "검토 중",
    icon: TimerIcon,
    description:
      "관리자가 접수하신 서류를 확인하고 있습니다.(최대 24시간 소요)",
  },
  {
    key: "step3",
    label: "인증 완료",
    icon: VerifiedIcon,
    description: "인증이 완료되었습니다.",
  },
];

export function StatusStep() {
  const { data, isLoading, isError, error, refetch } = useStatusQuery();
  if (isLoading) return <Skeleton className="h-100 w-full" />;
  if (isError) return <Error error={error} reset={refetch} />;
  if (data) {
    const current = data.status;

    const steps = STEPS.map((s) =>
      current === "REJECTED" && s.key === "step3"
        ? {
            ...s,
            label: "승인 거절",
            description: "승인이 거절되었습니다.",
            icon: RejectedIcon,
          }
        : s,
    );

    return (
      <Section className="flex-col">
        {steps.map(({ key, label, icon: IconComp, description }) => {
          const tone = palette[current][key];

          return (
            <div key={key} className="flex gap-6">
              <div
                className={statusVariants({
                  tone: palette[current][key],
                })}
              >
                <IconComp className="size-6" />
              </div>
              <div className="flex flex-col gap-4 py-2.5">
                <p
                  className={cn(
                    "title-small",
                    tone === "muted"
                      ? "text-text-secondary"
                      : "text-text-primary",
                  )}
                >
                  {label}
                </p>
                <p
                  className={cn(
                    "body-small",
                    tone === "muted"
                      ? "text-text-disabled invisible"
                      : "text-text-primary",
                  )}
                >
                  {description}
                </p>
              </div>
            </div>
          );
        })}
        <p className="body-small text-text-secondary text-center">
          인증이 완료되면 이메일로 알려드립니다. 조금만 기다려주세요.
        </p>
      </Section>
    );
  }
}
