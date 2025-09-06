import { http, HttpResponse } from "msw";
import { ApiResponse } from "@/lib/types";
import { AccountResponse } from "@/api/account";

const data: ApiResponse<AccountResponse> = {
  success: true,
  code: "200",
  message: "",
  data: {
    username: "김지원",
    channelUrl: "channelurl",
  },
};

export const accountHandlers = [
  http.get("/users/me", () => HttpResponse.json(data)),
];
