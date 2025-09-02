import { MyBadgesDTO } from "@/app/(pages)/my-badges/page";
import Section from "@/components/common/Section";
import { formatYmdKo } from "@/lib/date";

export default function MyBadge({ data }: { data: MyBadgesDTO }) {
  const date = formatYmdKo(data.badgeDate);
  return (
    <Section>
      <div className="bg-surface-3 h-full w-40"></div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2.5">
          <p className="text-text-accent body-large">🍓_{data.badgeLevel}</p>
          <p className="text-text-primary headline-small">
            {data.badgeLevel} 등급 소득 인증
          </p>
          <p className="text-text-accent body-large">연 소득 1억원 이상 구간</p>
        </div>
        <p className="text-text-secondary label-small">인증일:{date}</p>
      </div>
    </Section>
  );
}
