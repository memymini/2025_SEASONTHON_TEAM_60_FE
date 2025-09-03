"use client";

import Button from "@/components/common/Button";
import NoBadge from "@/components/common/NoBadge";
import ConnectChannel from "@/components/my-badges/ConnectChannel";
import ConnectedChannel from "@/components/my-badges/ConnectedChannel";
import MyBadge from "@/components/my-badges/MyBadge";
import { useMyBadgesQuery } from "@/hooks/useMyBadges";

type StatusType = "SUBMITTED";
type BadgeLevelType = "SILVER";

export interface MyBadgesDTO {
  username: string;
  email: string;
  status: StatusType;
  badgeLevel: BadgeLevelType;
  badgeDate: [number, number, number];
  channelUrl: string;
  badgeTag: string;
}

export default function MyBadgesPage() {
  const { data, isLoading, isError } = useMyBadgesQuery();

  if (isLoading) return <div>isLoading</div>;
  if (isError) return <div>error</div>;
  if (!data) return <div>데이터 없음</div>;

  return (
    <div className="flex h-fit w-full flex-col gap-10">
      <h1 className="headline-large">나의 뱃지 및 고유 태그</h1>
      {/* 조건부 랜더링 구현 예정 */}
      {/* 뱃지 있는 경우 UI */}
      {data.badgeLevel && <MyBadge data={data} />}

      {/* 뱃지 없는 경우 UI */}
      {!data.badgeLevel && <NoBadge />}

      {/* 채널 연결 전 UI */}
      {!data.channelUrl && <ConnectChannel />}

      {/* 채널 연결 후 UI */}
      {data.channelUrl && (
        <div className="flex flex-col gap-10">
          <ConnectedChannel data={data} />
          <Button href="/download" size="md">
            확장 프로그램 다운로드
          </Button>
        </div>
      )}
    </div>
  );
}
