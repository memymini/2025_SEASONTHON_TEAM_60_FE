import { dashboardHandlers } from "./handlers/dashboard";
import { myBadgeHandlers } from "./handlers/my-badges";

export const handlers = [...dashboardHandlers, ...myBadgeHandlers];
