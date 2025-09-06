import { AppError } from "@/lib/types";

export const isNotFound = (e: unknown) =>
  e instanceof AppError && (e.status === 404 || e.code === "NOT_FOUND");

export const isUnauthorized = (e: unknown) =>
  e instanceof AppError && e.status === 401;

export const shouldRetry = (count: number, e: unknown) => {
  if (!(e instanceof AppError)) return count < 1;
  if (e.kind === "network") return count < 2;
  if (e.status && e.status >= 500) return count < 2;
  return false; // 4xx는 재시도 X
};

export const errorMessage = (e: unknown) => {
  if (e instanceof AppError) {
    if (e.status === 401) return "로그인이 필요한 페이지입니다.";
    if (e.status === 403) return "접근 권한이 없습니다.";
    if (e.status === 404) return "페이지를 찾을 수 없습니다.";
    if (e.kind === "network") return "네트워크 오류입니다.";
    return e.message || "요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.";
  }
  return "알 수 없는 오류가 발생했습니다.";
};
