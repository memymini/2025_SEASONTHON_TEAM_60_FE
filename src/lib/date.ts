export type YMD = [year: number, month: number, day: number];

export function formatYmdKo([y, m, d]: YMD, opts?: { pad?: boolean }) {
  if (opts?.pad) {
    return `${y}년 ${String(m).padStart(2, "0")}월 ${String(d).padStart(2, "0")}일`;
  }
  return `${y}년 ${m}월 ${d}일`;
}
