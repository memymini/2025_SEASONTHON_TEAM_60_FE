import { dashboardHandlers } from "./handlers/dashboard";
import { myBadgeHandlers } from "./handlers/my-badges";
import { uploadHandlers } from "./handlers/upload";

export const handlers = [
  ...dashboardHandlers,
  ...myBadgeHandlers,
  ...uploadHandlers,
];
