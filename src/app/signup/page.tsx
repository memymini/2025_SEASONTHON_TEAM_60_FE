"use client";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import TextSpan from "@/components/common/TextSpan";
import { cn } from "@/lib/cn";
import { signupSchema, SignupSchema } from "@/schemas/signup";
import CheckboxIcon from "@public/assets/checkbox-icon.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export default function SignupPage() {
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<signupSchema>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {};

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <div className="bg-surface-1 border-surface-3 flex h-fit w-fit flex-col items-center justify-start gap-6 rounded-xl border-1 px-12 py-15">
        <h1 className="headline-medium text-text-primary text-center">
          VeriBadge 가입하기
        </h1>
        <p className="body-large text-text-secondary">
          당신의 전문성을 증명할 첫걸음입니다.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center gap-8"
        >
          <InputField
            label="이름"
            placeholder="이름을 입력해주세요."
            type="text"
            {...register("name", { required: true })}
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <InputField
            label="이메일"
            placeholder="이메일을 입력해주세요."
            type="text"
            {...register("email", { required: true })}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <InputField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            {...register("password", { required: true })}
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <InputField
            label="비밀번호 확인"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            {...register("confirmPassword", { required: true })}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />

          <div className="flex justify-start">
            <CheckboxIcon
              onClick={() => setIsChecked(!isChecked)}
              className={cn(
                isChecked ? "text-text-accent" : "text-text-secondary",
              )}
            />
            <p className="body-large text-text-primary">
              [필수]<TextSpan>서비스 이용약관</TextSpan>및
              <TextSpan>개인정보처리방침</TextSpan>에 동의합니다.
            </p>
          </div>
          <Button
            size="lg"
            type="submit"
            disabled={!isChecked || !isValid}
            className="w-full"
          >
            회원가입
          </Button>
        </form>

        <p className="body-large text-text-primary">
          이미 계정이 있으신가요?
          <TextSpan>
            <Link href="/login">로그인</Link>
          </TextSpan>
        </p>
      </div>
    </div>
  );
}
