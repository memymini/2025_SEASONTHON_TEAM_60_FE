import { http, HttpResponse } from "msw";
import { ApiResponse } from "@/lib/types";
import { UploadRequest } from "@/api/upload";

const data: UploadRequest = {
  fileName: "income_certificate_2025.pdf",
  fileId: "file_1a2b3c4d5e",
};

export const uploadHandlers = [
  http.post("/certificates/income/upload", async ({ request }) => {
    const body = (await request.json()) as UploadRequest;

    // 성공 응답
    return HttpResponse.json<ApiResponse<null>>(
      {
        success: true,
        code: "200",
        message: "파일이 성공적으로 업로드되었습니다.",
      },
      { status: 200 },
    );
  }),
];
