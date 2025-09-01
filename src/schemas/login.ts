import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력하세요."),
  password: z.string().min(1, { message: "" }),
});

export type loginSchema = z.infer<typeof LoginSchema>;
