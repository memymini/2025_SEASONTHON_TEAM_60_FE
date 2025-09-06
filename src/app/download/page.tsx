import Button from "@/components/common/Button";
import Section from "@/components/common/Section";
import TextSpan from "@/components/common/TextSpan";
import PlatformCard from "@/components/download/PlatformCard";
import NavBar from "@/components/home/NavBar";
import Image from "next/image";

export default function DownloadPage() {
  return (
    <div className="flex h-full w-full justify-center">
      <NavBar />
      <div className="mt-18 flex h-fit w-full max-w-300 flex-col items-center gap-25 p-18">
        {/* heading */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-5">
            <h1 className="headline-large text-text-primary">확장 프로그램</h1>
            <p className="title-medium text-text-secondary">
              온라인의 모든 주장에 신뢰 마크를 찍어보세요.
            </p>
          </div>
          <Section className="flex-col">
            <p className="text-text-primary title-medium">
              베리뱃지 확장 프로그램은 온라인 댓글에 숨겨진 진짜 전문가를 찾아
              보여줍니다.
            </p>
            <p className="text-text-secondary body-large">
              현재
              <TextSpan>
                <b>YouTube</b>
              </TextSpan>
              를 시작으로, 커뮤니티와 SNS 등 다양한 웹사이트에서 베리뱃지 고유
              태그를 감지하여 위조 불가능한 인터랙티브 뱃지로 시각화할
              예정입니다. 이제 진짜 전문가와 검증되 자격을 한눈에 구별할 수
              있습니다.
            </p>
          </Section>
        </div>

        {/* section2 */}
        <div className="flex w-full flex-col items-center gap-8">
          <h2 className="headline-small text-text-primary">
            베리뱃지를 만날 수 있는 곳
          </h2>
          <div className="flex w-full items-center justify-around gap-5 overflow-x-auto">
            <PlatformCard active={true} />
            <PlatformCard />
            <PlatformCard />
            <PlatformCard />
          </div>
        </div>

        {/* section3 */}
        <div className="flex w-full flex-col items-center gap-8">
          <h2 className="headline-small text-text-primary">
            사용중인 브라우저를 선택하세요.
          </h2>
          <div className="flex items-center gap-4">
            <Button size="md">Chrome 웹 스토어에서 추가하기</Button>
            <Button size="md">네이버 웨일 스토어에서 추가하기</Button>
          </div>
        </div>

        {/* section4 */}
        <div className="flex w-full flex-col items-center gap-8">
          <h2 className="headline-small text-text-primary">자주 묻는 질문</h2>
          <Section className="flex-col">
            <p className="text-text-primary title-medium">
              확장 프로그램을 설치하면 인터넷이 느려지나요?
            </p>
            <p className="text-text-secondary body-large">
              아니요, VeriBadge 확장 프로그램은 가볍게 설계되어 브라우징 속도에
              거의 영향을 미치지 않습니다. 페이지 로딩 시 최소한의 리소스만
              사용합니다.
            </p>
          </Section>
          <Section className="flex-col">
            <p className="text-text-primary title-medium">
              안전한 프로그램인가요?
            </p>
            <p className="text-text-secondary body-large">
              네, 안전합니다. 저희는 사용자의 개인정보 보호를 최우선으로
              생각합니다. VeriBadge는 불필요한 데이터를 수집하지 않으며, 각
              브라우저 스토어의 엄격한 보안 심사를 통과했습니다.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
