import Button from "@/components/common/Button";

export default function CTASection() {
  return (
    <section className="bg-surface-2 flex h-fit w-full flex-col items-center justify-center gap-16 px-10 py-36">
      <p className="headline-large text-text-primary text-center">
        지금 바로 당신의 의견에 신뢰를 더하세요.
      </p>
      <Button href="/login" size="lg">
        VeriBadge 시작하기
      </Button>
    </section>
  );
}
