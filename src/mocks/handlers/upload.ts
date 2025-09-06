import { http, HttpResponse } from "msw";
import { ApiResponse } from "@/lib/types";

export const uploadHandlers = [
  http.post("/certificates/income/upload", async ({ request }) => {
    try {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return HttpResponse.json(
          { success: false, message: "파일이 없습니다." },
          { status: 400 },
        );
      }

      return HttpResponse.json(
        {
          success: true,
          code: "201",
          message: "파일 업로드 성공",
        },
        { status: 201 },
      );
    } catch (e) {
      return HttpResponse.json(
        { success: false, message: "업로드 중 오류 발생" },
        { status: 500 },
      );
    }
  }),
];
