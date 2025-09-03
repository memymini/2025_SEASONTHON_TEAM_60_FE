import Section from "@/components/common/Section";
import Button from "@/components/common/Button";
import { DashboardResponse } from "@/api/dashboard";

export default function Badge({ data }: { data: DashboardResponse }) {
  return (
    <Section>
      <div className="flex h-full flex-1 flex-col gap-5">
        <h2 className="headline-small text-text-primary">나의 뱃지 현황</h2>
        <div className="bg-surface-2 border-surface-3 flex h-fit justify-between rounded-xl border-1 p-7">
          <div className="flex">
            <p className="text-6xl">🍓</p>
            <div>
              <p className="label-large text-text-accent">{data.status}</p>
              <p className="headline-small text-text-primary">
                {data.badgeLevel}
              </p>
            </div>
          </div>

          <div className="flex h-full flex-col items-end justify-between">
            <p className="label-large text-text-secondary">인증일</p>
            <p className="title-medium text-text-primary">{data.badgeDate}</p>
          </div>
        </div>
        <Button size="md" href="/my-badges">
          내 뱃지 관리 및 고유 태그 확인하기
        </Button>
      </div>
    </Section>
  );
}
