// ---- 에러/공통 타입 그대로 ----
export type AppErrorKind = "network" | "http" | "api" | "unknown";

export class AppError extends Error {
  kind: AppErrorKind;
  status?: number;
  code?: string;
  details?: unknown;
  constructor(kind: AppErrorKind, msg: string, extra?: Partial<AppError>) {
    super(msg);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "AppError";
    this.kind = kind;
    Object.assign(this, extra);
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data?: T; // 필요 시 없는 응답도 허용
};

type ReqOpts<TReq = unknown> = Omit<RequestInit, "body"> & {
  params?: Record<string, string | number | boolean | null | undefined>;
  json?: TReq; // ← 요청(JSON) 타입 제네릭
  unwrap?: boolean; // true면 data만 반환
  body?: BodyInit | null; // 업로드(FormData 등)용
};

// ---- 내부 유틸 ----
function buildURL(path: string, params?: ReqOpts["params"]) {
  const url = new URL(
    path,
    BASE_URL ||
      (typeof window !== "undefined" ? location.origin : "http://localhost"),
  );
  if (params)
    for (const [k, v] of Object.entries(params))
      if (v != null) url.searchParams.append(k, String(v));
  return url.toString();
}

async function parseJson<T>(res: Response) {
  if (res.status === 204) return undefined as unknown as T;
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
}

// ---- apiFetch 오버로드 (unwrap에 따라 반환 타입 분기) ----
export function apiFetch<TRes, TReq = unknown>(
  path: string,
  opts?: Omit<ReqOpts<TReq>, "unwrap"> & { unwrap?: false },
): Promise<ApiResponse<TRes>>;
export function apiFetch<TRes, TReq = unknown>(
  path: string,
  opts: Omit<ReqOpts<TReq>, "unwrap"> & { unwrap: true },
): Promise<TRes>;
export async function apiFetch<TRes, TReq = unknown>(
  path: string,
  opts: ReqOpts<TReq> = {},
) {
  const { params, json, headers, unwrap, body: rawBody, ...init } = opts;

  const url = buildURL(path, params);
  const h = new Headers(headers);

  let body: BodyInit | undefined = rawBody ?? undefined;
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
    throw new AppError("network", "네트워크 오류", { details: e });
  }

  // HTTP 레벨
  if (!res.ok) {
    // API 포맷일 수도 있으니 시도
    try {
      const maybe = await parseJson<ApiResponse<unknown>>(res);
      if (maybe && typeof maybe === "object" && "success" in maybe) {
        throw new AppError("api", maybe.message || "API 오류", {
          status: res.status,
          code: maybe.code,
          details: maybe,
        });
      }
    } catch {
      /* ignore */
    }
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

  // unwrap에 따라 반환 형태 분기
  return (unwrap ? (payload.data as TRes) : payload) as any;
}

// ---- HTTP 메서드별 헬퍼 (오버로드 포함) ----
function apiGet<TRes>(
  path: string,
  opts?: Omit<ReqOpts, "method" | "json" | "body"> & { unwrap?: false },
): Promise<ApiResponse<TRes>>;
function apiGet<TRes>(
  path: string,
  opts: Omit<ReqOpts, "method" | "json" | "body"> & { unwrap: true },
): Promise<TRes>;
function apiGet<TRes>(
  path: string,
  opts?: Omit<ReqOpts, "method" | "json" | "body">,
) {
  return apiFetch<TRes>(path, { ...opts, method: "GET" } as any);
}

function apiPost<TRes, TReq>(
  path: string,
  json: TReq,
  opts?: Omit<ReqOpts<TReq>, "method" | "json"> & { unwrap?: false },
): Promise<ApiResponse<TRes>>;
function apiPost<TRes, TReq>(
  path: string,
  json: TReq,
  opts: Omit<ReqOpts<TReq>, "method" | "json"> & { unwrap: true },
): Promise<TRes>;
function apiPost<TRes, TReq>(
  path: string,
  json: TReq,
  opts?: Omit<ReqOpts<TReq>, "method" | "json">,
) {
  return apiFetch<TRes, TReq>(path, { ...opts, method: "POST", json } as any);
}

function apiPut<TRes, TReq>(
  path: string,
  json: TReq,
  opts?: Omit<ReqOpts<TReq>, "method" | "json"> & { unwrap?: false },
): Promise<ApiResponse<TRes>>;
function apiPut<TRes, TReq>(
  path: string,
  json: TReq,
  opts: Omit<ReqOpts<TReq>, "method" | "json"> & { unwrap: true },
): Promise<TRes>;
function apiPut<TRes, TReq>(
  path: string,
  json: TReq,
  opts?: Omit<ReqOpts<TReq>, "method" | "json">,
) {
  return apiFetch<TRes, TReq>(path, { ...opts, method: "PUT", json } as any);
}

function apiPatch<TRes, TReq>(
  path: string,
  json: TReq,
  opts?: Omit<ReqOpts<TReq>, "method" | "json"> & { unwrap?: false },
): Promise<ApiResponse<TRes>>;
function apiPatch<TRes, TReq>(
  path: string,
  json: TReq,
  opts: Omit<ReqOpts<TReq>, "method" | "json"> & { unwrap: true },
): Promise<TRes>;
function apiPatch<TRes, TReq>(
  path: string,
  json: TReq,
  opts?: Omit<ReqOpts<TReq>, "method" | "json">,
) {
  return apiFetch<TRes, TReq>(path, { ...opts, method: "PATCH", json } as any);
}

function apiDel<TRes>(
  path: string,
  opts?: Omit<ReqOpts, "method" | "json"> & { unwrap?: false },
): Promise<ApiResponse<TRes>>;
function apiDel<TRes>(
  path: string,
  opts: Omit<ReqOpts, "method" | "json"> & { unwrap: true },
): Promise<TRes>;
function apiDel<TRes>(path: string, opts?: Omit<ReqOpts, "method" | "json">) {
  return apiFetch<TRes>(path, { ...opts, method: "DELETE" } as any);
}

export const api = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  patch: apiPatch,
  del: apiDel,
};
