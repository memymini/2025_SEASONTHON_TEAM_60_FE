import { http, HttpResponse } from "msw";
import { ApiResponse } from "@/lib/types";
import { DashboardResponse } from "@/api/dashboard";

const data: ApiResponse<DashboardResponse> = {
  //   success: true,
  //   code: "MAIN 201",
  //   message: "메인페이지 불러오기 성공",
  //   data: {
  //     username: "김지원",
  //     role: "USER",
  //     status: "NOT_SUBMITTED",
  //     badgeLevel: null,
  //     badgeDate: null,
  //   },
  success: true,
  code: "MAIN 201",
  message: "메인페이지 불러오기 성공",
  data: {
    username: "김지원",
    role: "USER",
    status: "VERIFIED",
    badgeLevel: "SILVER",
    badgeDate: "2025-09-02",
  },
  //   success: true,
  //   code: "MAIN 201",
  //   message: "메인페이지 불러오기 성공",
  //   data: {
  //     username: "김지원",
  //     role: "USER",
  //     status: "PENDING",
  //     badgeLevel: null,
  //     badgeDate: null,
  //   },
  //   success: false,
  //   code: "MEMBER 404",
  //   message: "로그인한 사용자를 찾을 수 없습니다.",
};

export const dashboardHandlers = [
  http.get("/main", () => HttpResponse.json(data)),
];
