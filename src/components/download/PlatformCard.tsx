import { cva } from "class-variance-authority";
import Image from "next/image";
import Label from "../common/Label";

type Active = "active" | "not_active";

export default function PlatformCard({ active = false }: { active?: boolean }) {
  if (active) {
    return (
      <div>
        <div className="bg-surface-1 border-primary flex flex-col items-center justify-center gap-5 rounded-lg border-1 p-5">
          <div className="bg-secondary flex h-40 w-40 items-center justify-center rounded-lg">
            <Image
              src="/images/youtube-logo.png"
              alt="youtube-logo"
              width={77}
              height={55}
            />
          </div>
          <Label type="primary">지금 사용 가능</Label>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="bg-surface-1 border-surface-3 flex flex-col items-center justify-center gap-5 rounded-lg border-1 p-5">
          <div className="bg-surface-3 flex h-40 w-40 items-center justify-center rounded-lg">
            <Image
              src="/images/youtube-logo.png"
              alt="youtube-logo"
              width={77}
              height={55}
            />
          </div>
          <Label type="disabled">개발 중</Label>
        </div>
      </div>
    );
  }
}
