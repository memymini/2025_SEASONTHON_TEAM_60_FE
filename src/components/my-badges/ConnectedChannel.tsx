import { MyBadgesDTO } from "@/app/(pages)/my-badges/page";
import Section from "@/components/common/Section";
import CopyIcon from "@public/assets/copy-icon.svg";
import LinkIcon from "@public/assets/link-icon.svg";
import Link from "next/link";

export default function ConnectedChannel({ data }: { data: MyBadgesDTO }) {
  return (
    <Section className="flex-col">
      <p className="headline-small text-text-primary">
        YouTube 채널에 연결하고 고유 태그 발급받기
      </p>
      <div className="flex max-w-full flex-col gap-2">
        <p className="body-small text-text-primary">연결된 채널</p>
        <div className="flex items-center gap-2">
          <div className="body-small text-text-secondary bg-surface-3 flex max-w-80 items-center justify-center rounded-lg px-4 py-3">
            <p className="truncate">{data.channelUrl}</p>
          </div>
          <Link href={data.channelUrl}>
            <LinkIcon className="text-text-secondary h-6 w-6" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="body-small text-text-primary">발급돈 고유 태그</p>
        <div className="flex items-center gap-2">
          <div className="body-small text-text-secondary bg-surface-3 flex w-fit items-center justify-center rounded-lg px-4 py-3">
            {data.badgeTag}
          </div>
          <CopyIcon className="text-text-secondary" />
        </div>
      </div>
    </Section>
  );
}
