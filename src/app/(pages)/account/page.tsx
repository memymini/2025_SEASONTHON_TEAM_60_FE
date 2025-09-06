import Button from "@/components/common/Button";
import Section from "@/components/common/Section";
import Image from "next/image";

export default function AccountPage() {
  return (
    <div className="flex h-fit w-full max-w-300 flex-col gap-10">
      <h1 className="headline-large text-text-primary">계정관리</h1>
      <Section className="flex-col">
        <h2 className="text-text-primary headline-small">기본 프로필</h2>
        <p className="text-text-primary body-large">
          김지원
          <br />
          jiwon@example.com
        </p>
        <p className="text-text-secondary body-small">
          안내: 이메일은 회원 식별을 위한 고유 정보이므로 변경할 수 없습니다.
        </p>
      </Section>
      <Section className="flex-col">
        <h2 className="text-text-primary headline-small">계정 보안 강화</h2>
        <p className="text-text-secondary body-small">
          2단계 인증을 설정하여 계정 보안을 강화하세요. 2단계 인증은 비밀번호
          외에 추가 인증 단계를 거쳐 계정을 더욱 안전하게 보호합니다.
        </p>
        <Button size="sm">인증서 등록하기</Button>
      </Section>
      <Section className="flex-col">
        <h2 className="text-text-primary headline-small">연동된 플랫폼 관리</h2>
        <p className="text-text-secondary body-small">
          안내: 이메일은 회원 식별을 위한 고유 정보이므로 변경할 수 없습니다.
        </p>
        <div className="border-surface-3 bg-surface-1 flex items-center justify-between rounded-lg border-1 p-4">
          <div className="flex w-full min-w-0 items-center gap-2">
            <Image
              src="/images/youtube-logo.png"
              alt="youtube-icon"
              width={27}
              height={20}
            />
            <p className="text-text-primary label-large">Youtube</p>
            <p className="text-text-secondary body-small truncate">
              https://youtube.com/veribadge-ehseg29sa39gsa3l2222llaeigafeas
            </p>
          </div>
          <p className="text-text-accent label-small hover:text-hover whitespace-nowrap underline hover:font-bold">
            연동 해제
          </p>
        </div>
      </Section>
      <Section className="border-primary flex-col">
        <h2 className="text-text-accent headline-small">회원 탈퇴</h2>
        <p className="text-text-secondary body-small">
          회원 탈퇴시 모든 개인정보 및 서비스 이용 기록이 영구적으로 삭제되며,
          복구할 수 없습니다.
        </p>
        <Button size="sm">회원 탈퇴하기</Button>
      </Section>
    </div>
  );
}
