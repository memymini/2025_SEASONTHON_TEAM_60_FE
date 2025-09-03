// user role type
export type Role = "USER" | "ADMIN";

// badge level type ** 추가 예정 **
export type BadgeLevel = "SILVER" | "GOLD";

// status type
export type Status =
  | "NOT_SUBMITTED"
  | "PENDING"
  | "IN_REVIEW"
  | "APPROVED"
  | "REJECTED";

// date type
export type Date = [number, number, number] | null;

// icon component type
export type IconComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
