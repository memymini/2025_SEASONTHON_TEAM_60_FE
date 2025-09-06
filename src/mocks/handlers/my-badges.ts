import { http, HttpResponse } from "msw";
import { ApiResponse } from "@/lib/types";
import { MyBadgesResponse } from "@/api/my-badges";

const data: ApiResponse<MyBadgesResponse> = {
  success: true,
  code: "MAIN 201",
  message: "메인페이지 불러오기 성공",
  data: {
    username: "김지원",
    status: "VERIFIED",
    badgeLevel: "GOLD",
    badgeDate: "2025-09-02",
    channelUrl: "Channel url 3",
    badgeTag: "@Veri-SILVER-dhlske",
  },
  //   success: true,
  //   code: "MAIN 201",
  //   message: "메인페이지 불러오기 성공",
  //   data: {
  //     username: "김지원",
  //     status: "APPROVED",
  //     badgeLevel: "SILVER",
  //     badgeDate: "2025-09-02",
  //     channelUrl: null,
  //     badgeTag: null,
  //   },
  //   success: true,
  //   code: "MAIN 201",
  //   message: "메인페이지 불러오기 성공",
  //   data: {
  //     username: "김지원",
  //     status: "SUBMITTED",
  //     badgeLevel: null,
  //     badgeDate: null,
  //     channelUrl: null,
  //     badgeTag: null,
  //   },
};

export const myBadgeHandlers = [
  http.get("/my-badge", () => HttpResponse.json(data)),
];
