// user role type
export type Role = "USER" | "ADMIN";

// badge level type
export type BadgeLevel = "SILVER" | "GOLD";

// status type
export type Status = "NOT_SUBMITTED" | "SUBMITTED" | "VERIFIED" | "REJECTED";

// icon component type
export type IconComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// error type
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

// api response type
export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data?: T;
};
