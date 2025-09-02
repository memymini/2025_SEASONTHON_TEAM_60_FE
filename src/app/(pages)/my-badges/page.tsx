import NoBadge from "@/components/common/NoBadge";
import ConnectChannel from "@/components/my-badges/ConnectChannel";
import ConnectedChannel from "@/components/my-badges/ConnectedChannel";
import MyBadge from "@/components/my-badges/MyBadge";

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
  const data: MyBadgesDTO = {
    username: "박지수",
    email: "jisu@example.com",
    status: "SUBMITTED",
    badgeLevel: "SILVER",
    badgeDate: [2025, 1, 9],
    channelUrl: "https://youtube.com/veribadge",
    badgeTag: "@veri-silver-ao8slk",
  };

  return (
    <div className="flex h-fit w-full flex-col gap-10">
      <h1 className="headline-large">나의 뱃지 및 고유 태그</h1>
      {/* 조건부 랜더링 구현 예정 */}

      {/* 뱃지 있는 경우 UI */}
      <MyBadge data={data} />

      {/* 뱃지 없는 경우 UI */}
      <NoBadge />

      {/* 채널 연결 전 UI */}
      <ConnectChannel />

      {/* 채널 연결 후 UI */}
      <ConnectedChannel data={data} />
    </div>
  );
}
