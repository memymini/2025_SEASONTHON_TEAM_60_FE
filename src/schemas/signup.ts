import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z.string(),
    email: z.string().email("올바른 이메일 형식을 입력하세요."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "영문,숫자,특수문자를 포함해야 합니다.",
      ),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type signupSchema = z.infer<typeof SignupSchema>;
