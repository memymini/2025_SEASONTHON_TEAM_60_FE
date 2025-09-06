export const DASHBOARD_QUERY_KEY = {
  root: () => ["dashboard"] as const,
};

export const USER_QUERY_KEY = {
  root: () => ["user"] as const,
  badges: () => ["dashboard", "badges"] as const,
};
