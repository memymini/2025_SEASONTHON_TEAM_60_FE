export const DASHBOARD_QUERY_KEY = {
  root: () => ["dashboard"] as const,
};

export const MY_BADGES_QUERY_KEY = {
  root: () => ["my-badges"] as const,
  // stats: (range: string) => ["dashboard", "stats", range] as const,
};
