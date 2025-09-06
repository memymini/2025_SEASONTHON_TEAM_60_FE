"use client";
import { errorMessage, shouldRetry } from "@/lib/errors";
import { ApiResponse } from "@/lib/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, err) => shouldRetry(count, err),
      refetchOnWindowFocus: false,
      throwOnError: false,
    },
    mutations: {
      retry: (count, err) => shouldRetry(count, err),
      onError: (err) => {
        // 실패 토스트 토스트
        toast.error(errorMessage(err));
      },
      onSuccess: (data: unknown) => {
        // 성공 토스트
        const res = data as ApiResponse<unknown>;
        if (res?.message) {
          toast.success(res.message);
        } else {
          toast.success("작업이 성공적으로 완료되었습니다.");
        }
      },
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      {children} <Toaster />
    </QueryClientProvider>
  );
}
