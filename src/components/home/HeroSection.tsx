import Button from "@/components/common/Button";

export default function HeroSection() {
  return (
    <section className="bg-surface-1 flex h-screen flex-col items-center justify-center gap-36">
      <p className="headline-large text-text-primary text-center">
        온라인 발언에 실명보다 강력한
        <br />
        <span className="text-text-accent">신뢰</span>를 더하다
      </p>
      <div className="flex gap-6">
        <Button size="lg" href="/login">
          지금 신뢰 얻기
        </Button>
        <Button
          href="/download"
          size="lg"
          className="bg-surface-3 text-text-secondary hover:bg-surface-3 hover:opacity-70"
        >
          확장 프로그램 다운로드
        </Button>
      </div>
    </section>
  );
}
