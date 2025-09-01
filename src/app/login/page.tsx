"use client";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import TextSpan from "@/components/common/TextSpan";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/schemas/login";
import Link from "next/link";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<loginSchema>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <div className="bg-surface-1 border-surface-3 flex h-fit w-fit flex-col items-center justify-start gap-6 rounded-xl border-1 px-12 py-15">
        <h1 className="headline-medium text-text-primary min-w-100 text-center">
          VeriBadge 로그인
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center gap-8"
        >
          <InputField
            label="이메일"
            placeholder="이메일을 입력해주세요."
            type="email"
            {...register("email", { required: true })}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <InputField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            {...register("password", { required: true })}
          />
          <Button
            size="lg"
            type="submit"
            disabled={!isValid}
            className="w-full"
          >
            로그인
          </Button>
        </form>
        <p className="body-large text-text-primary">비밀번호를 잊으셨나요?</p>
        <p className="body-large text-text-primary">
          아직 계정이 없으신가요?{" "}
          <TextSpan>
            <Link href="/signup">회원가입</Link>
          </TextSpan>
        </p>
      </div>
    </div>
  );
}
