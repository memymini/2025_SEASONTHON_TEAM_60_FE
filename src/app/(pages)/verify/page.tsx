import IncomeIcon from "@public/assets/income-icon.svg";
import CompanyIcon from "@public/assets/company-icon.svg";
import ProfessionIcon from "@public/assets/profession-icon.svg";
import GameIcon from "@public/assets/game-icon.svg";
import CategoryCard, { Category } from "@/components/verify/CategoryCard";

const categories: Category[] = [
  {
    name: "소득 인증",
    description:
      "금융, 투자, 재테크 커뮤니티에서 당신의 발언에 경제적 신뢰도를 더하세요. 국세청 서류로 안전하게 증명합니다.",
    info: "베리뱃지의 소득 증명이란?",
    icon: IncomeIcon,
    active: true,
  },
  {
    name: "기업 재직 인증",
    description:
      "직장인 커뮤니티나 채용 관련 정보 공유시, 당신의 경력과 소속에 대한 신뢰를 확보할 수 있습니다.",
    icon: CompanyIcon,
    active: false,
  },
  {
    name: "전문직 인증",
    description:
      "의료, 법률 등 전문 지식이 필요한 분야에서 당신의 의견이 가장 신뢰받는 정보가 되도록 자격을 증명하세요.",
    icon: ProfessionIcon,
    active: false,
  },
  {
    name: "LoL 티어 인증",
    description:
      "게임 공략, 선수 평가 등 모든 토론에서 더 이상 말로만 싸우지 마세요. 당신의 실제 티어로 실력을 증명합니다.",
    icon: GameIcon,
    active: false,
  },
];

export default function VerifyPage() {
  return (
    <div className="flex h-fit w-full max-w-300 flex-col gap-10">
      <div>
        <h1 className="headline-large text-text-primary">인증 센터</h1>
        <p className="text-text-secondary body-large">
          당신의 온라인 영향력을 증명할 자격을 선택하세요. 베리뱃지는 당신의
          전문성과 자격에 신뢰를 더합니다.
        </p>
      </div>
      <section className="flex w-full flex-wrap gap-5">
        {categories.map((item, idx) => (
          <CategoryCard key={idx} data={item} />
        ))}
      </section>
    </div>
  );
}
