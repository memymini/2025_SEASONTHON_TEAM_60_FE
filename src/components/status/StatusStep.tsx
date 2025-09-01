import { cva } from "class-variance-authority";
import CheckIcon from "@public/assets/check-icon.svg";
import TimerIcon from "@public/assets/timer-icon.svg";
import VerifiedIcon from "@public/assets/verified-icon.svg";
import RejectedIcon from "@public/assets/rejected-icon.svg";
import { cn } from "@/lib/cn";
import Section from "../common/Section";

type StatusType = "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED";
type ColorType = "danger" | "muted" | "success";
type IconComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const statusVariants = cva(
  "flex w-13 h-13 justify-center items-center rounded-full",
  {
    variants: {
      tone: {
        danger: "bg-primary text-text-inverse",
        muted: "bg-surface-3 text-text-inverse",
        success: "bg-success text-text-inverse",
      },
      active: { true: "font-medium", false: "" },
    },
    defaultVariants: { active: false },
  },
);

const palette: Record<StatusType, Record<StatusType, ColorType>> = {
  PENDING: {
    PENDING: "success",
    IN_REVIEW: "muted",
    APPROVED: "muted",
    REJECTED: "muted",
  },
  IN_REVIEW: {
    PENDING: "success",
    IN_REVIEW: "danger",
    APPROVED: "muted",
    REJECTED: "muted",
  },
  APPROVED: {
    PENDING: "success",
    IN_REVIEW: "success",
    APPROVED: "success",
    REJECTED: "muted",
  },
  REJECTED: {
    PENDING: "success",
    IN_REVIEW: "success",
    APPROVED: "muted",
    REJECTED: "danger",
  },
} as const;

const STEPS: {
  key: StatusType;
  label: string;
  icon: IconComp;
  description?: string;
}[] = [
  {
    key: "PENDING",
    label: "접수 완료",
    icon: CheckIcon,
    description: "제출하신 서류가 정상적으로 접수되었습니다.",
  },
  {
    key: "IN_REVIEW",
    label: "검토 중",
    icon: TimerIcon,
    description:
      "관리자가 접수하신 서류를 확인하고 있습니다.(최대 24시간 소요)",
  },
  {
    key: "APPROVED",
    label: "인증 완료",
    icon: VerifiedIcon,
    description: "인증이 완료되었습니다.",
  },
  {
    key: "REJECTED",
    label: "승인 거절",
    icon: RejectedIcon,
    description: "승인이 거절되었습니다.",
  },
];

export function StatusStep({ current }: { current: StatusType }) {
  const steps = (() => {
    switch (current) {
      case "APPROVED":
        return STEPS.filter((s) => s.key !== "REJECTED");
      case "REJECTED":
        return STEPS.filter((s) => s.key !== "APPROVED");
      default:
        return STEPS.filter((s) => s.key !== "REJECTED");
    }
  })();

  return (
    <Section className="flex-col">
      {steps.map(({ key, label, icon: IconComp, description }) => {
        const tone = palette[current][key];
        const isActive = current === key;
        return (
          <div key={key} className="flex gap-6">
            <div
              className={statusVariants({
                tone: palette[current][key],
                active: current === key,
              })}
              aria-current={current === key ? "true" : undefined}
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
