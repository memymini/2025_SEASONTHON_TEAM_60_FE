import { ApiResponse, AppError } from "./types";
// ---------- errors / common ----------

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type ReqOpts<TReq = unknown> = Omit<RequestInit, "body"> & {
  params?: Record<string, string | number | boolean | null | undefined>;
  json?: TReq; // 요청 JSON 바디
  body?: BodyInit | null; // FormData 등 비-JSON 바디
};

// ---------- utils ----------
function buildURL(path: string, params?: ReqOpts["params"]) {
  const url = new URL(
    path,
    BASE_URL ||
      (typeof window !== "undefined" ? location.origin : "http://localhost"),
  );
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v != null) url.searchParams.append(k, String(v));
    }
  }
  return url.toString();
}

async function parseJson<T>(res: Response) {
  if (res.status === 204) return undefined as unknown as T;
  const text = await res.text();
  try {
    return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
  } catch {
    // JSON이 아닐 경우
    return null as unknown as T;
  }
}

// ---------- core fetcher ----------
export async function apiFetch<TRes, TReq = unknown>(
  path: string,
  opts: ReqOpts<TReq> = {},
): Promise<ApiResponse<TRes>> {
  const { params, json, headers, body: rawBody, ...init } = opts;

  const url = buildURL(path, params);
  const h = new Headers(headers);

  //localStorage에서 토큰 읽어서 Authorization 헤더 추가
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      h.set("Authorization", `Bearer ${token}`);
    }
  }

  // JSON 자동 직렬화 (FormData 등은 body 그대로)
  let body: BodyInit | null | undefined = rawBody ?? null;
  if (json !== undefined) {
    if (!h.has("Content-Type")) h.set("Content-Type", "application/json");
    body = JSON.stringify(json);
  }

  let res: Response;
  try {
    res = await fetch(url, {
      credentials: "include",
      ...init,
      headers: h,
      body,
    });
  } catch (e) {
    console.log(e);
    throw new AppError("network", "네트워크 오류", { details: e });
  }

  // HTTP 에러 처리
  if (!res.ok) {
    const maybe = await parseJson<ApiResponse<unknown>>(res).catch(() => null);

    // API 포맷 응답이면서 4xx인 경우 → throw 하지 않고 payload로 반환
    if (maybe && typeof maybe === "object" && "success" in maybe) {
      const appErr = new AppError("api", maybe.message || "API 오류", {
        status: res.status,
        code: maybe.code,
        details: maybe,
      });

      if (res.status >= 400 && res.status < 500) {
        return {
          success: false,
          code: maybe.code ?? "CLIENT_ERROR",
          message: maybe.message ?? "요청 오류",
          data: undefined as unknown as TRes,
        };
      }

      // 5xx 이상 -> throw
      throw appErr;
    }

    // API 포맷이 아니거나 파싱 실패 -> throw
    throw new AppError("http", `HTTP ${res.status}`, { status: res.status });
  }

  const payload = await parseJson<ApiResponse<TRes>>(res);
  if (!payload || typeof payload !== "object" || !("success" in payload)) {
    throw new AppError("unknown", "응답 스키마가 올바르지 않습니다.", {
      details: payload,
    });
  }
  if (!payload.success) {
    throw new AppError("api", payload.message || "API 오류", {
      status: res.status,
      code: payload.code,
      details: payload,
    });
  }

  return payload;
}

// ---------- method helpers ----------
export function apiGet<TRes>(
  path: string,
  opts?: Omit<ReqOpts<unknown>, "method" | "json" | "body">,
): Promise<ApiResponse<TRes>> {
  return apiFetch<TRes>(path, { ...opts, method: "GET" });
}

export function apiPost<TRes, TReq>(
  path: string,
  json?: TReq,
  body?: BodyInit | null,
  opts?: Omit<ReqOpts<TReq>, "method" | "json">,
): Promise<ApiResponse<TRes>> {
  return apiFetch<TRes, TReq>(path, { ...opts, method: "POST", json, body });
}

export function apiPut<TRes, TReq>(
  path: string,
  json: TReq,
  opts?: Omit<ReqOpts<TReq>, "method" | "json">,
): Promise<ApiResponse<TRes>> {
  return apiFetch<TRes, TReq>(path, { ...opts, method: "PUT", json });
}

export function apiPatch<TRes, TReq>(
  path: string,
  json: TReq,
  opts?: Omit<ReqOpts<TReq>, "method" | "json">,
): Promise<ApiResponse<TRes>> {
  return apiFetch<TRes, TReq>(path, { ...opts, method: "PATCH", json });
}

export function apiDel<TRes>(
  path: string,
  opts?: Omit<ReqOpts<unknown>, "method" | "json">,
): Promise<ApiResponse<TRes>> {
  return apiFetch<TRes>(path, { ...opts, method: "DELETE" });
}

export const api = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  patch: apiPatch,
  del: apiDel,
};
