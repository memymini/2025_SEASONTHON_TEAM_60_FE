// ---------- errors / common ----------
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
  data: T | null;
};

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

async function parseJson<T>(res: Response): Promise<T> {
  if (res.status === 204) return undefined as unknown as T; // no content
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
}

// ---------- core fetcher ----------
export async function apiFetch<TRes, TReq = unknown>(
  path: string,
  opts: ReqOpts<TReq> = {},
): Promise<ApiResponse<TRes>> {
  const { params, json, headers, body: rawBody, ...init } = opts;

  const url = buildURL(path, params);
  const h = new Headers(headers);

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
    throw new AppError("network", "네트워크 오류", { details: e });
  }

  // HTTP 에러
  if (!res.ok) {
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
  json: TReq,
  opts?: Omit<ReqOpts<TReq>, "method" | "json">,
): Promise<ApiResponse<TRes>> {
  return apiFetch<TRes, TReq>(path, { ...opts, method: "POST", json });
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
