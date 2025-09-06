import { MyBadgesResponse } from "@/api/my-badges";
import Section from "@/components/common/Section";
import Image from "next/image";

export default function MyBadge({ data }: { data: MyBadgesResponse }) {
  return (
    <Section>
      <Image src="/images/gold.png" alt="gold" width={200} height={40} />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2.5">
          <p className="text-text-accent body-large">🍓_{data.badgeLevel}</p>
          <p className="text-text-primary headline-small">
            {data.badgeLevel} 등급 소득 인증
          </p>
          <p className="text-text-accent body-large">연 소득 1억원 이상 구간</p>
        </div>
        <p className="text-text-secondary label-small">
          인증일:{data.badgeDate}
        </p>
      </div>
    </Section>
  );
}
